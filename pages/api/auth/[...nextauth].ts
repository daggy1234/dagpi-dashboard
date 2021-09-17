/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar } from '@chakra-ui/react';
import { url } from 'inspector';
import NextAuth from 'next-auth';
import Providers, { ProviderType } from 'next-auth/providers';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const provider: ProviderType = 'oauth';

const options = {
    // https://next-auth.js.org/configuration/providers
    providers: [
        {
            id: 'discord',
            name: 'Discord',
            version: '2.0',
            type: provider,
            scope: 'identify email',
            params: { grant_type: 'authorization_code' },
            accessTokenUrl: 'https://discord.com/api/oauth2/token',
            authorizationUrl:
                'https://discord.com/api/oauth2/authorize?response_type=code&prompt=none',
            profileUrl: 'https://discord.com/api/users/@me',
            async profile(profile, tokens) {
                if (profile.avatar === null) {
                    const default_avatar_num = parseInt(profile.discriminator) % 5;
                    profile.image_url = `https://cdn.discordapp.com/embed/avatars/${default_avatar_num}.png`;
                } else {
                    const format = profile.avatar.startsWith('a_') === 2 ? 'gif' : 'png';
                    profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
                }
                return {
                    id: profile.id,
                    user_id: profile.id,
                    bot: profile.bot,
                    name: profile.username,
                    image: profile.image_url,
                    email: profile.email
                };
            },
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }
    ],
    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,

    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },

    jwt: {},

    pages: {
        // signIn: '/api/auth/signin',  // Displays signin buttons
        // signOut: '/api/auth/signout', // Displays form with sign out button
        // error: '/api/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/api/auth/verify-request', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // signIn: async (user, account, profile) => {
        // },
        // redirect: async (url, baseUrl) => { return Promise.resolve(baseUrl) },
        // session: async (session, user, sessionToken) => {
        //     console.log(sessionToken);
        //     session.bar = 'HILL';
        //     return Promise.resolve(session);
        // },
        session: async (session, user) => {
            session.user.name = `${user.name}#${user.profile.discriminator}`;
            session.user.id = user.profile.id;
            session.joined_dagpi = user.joined_dagpi;
            session.refreshToken = user.account.refreshToken;
            session.accessToken = user.account.accessToken;
            session.client_id = user.client_id;
            return Promise.resolve(session);
        },
        jwt: async (token, user, account, profile, isNewUser) => {
            if (profile) {
                const r = await fetch(`${process.env.NEXTAUTH_URL}/api/routes/user-create`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user: profile.id,
                        name: `${user.name}#${profile.discriminator}`,
                        email: profile.email
                    })
                });
                const js = await r.json();
                if (js.status) {
                    token.client_id = js.data.client_id;
                    token.joined_dagpi = js.data.created_at;
                    token.profile = profile;
                    token.account = account;
                    return Promise.resolve(token);
                } else {
                    return Promise.resolve(false);
                }
            }

            return Promise.resolve(token);
        }
    }

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    // events: {
    //     signIn: async (message) => {
    //         console.log(message);
    //     }
    // }

    // Enable debug messages in the console if you are having problems
};

export default (req, res) => NextAuth(req, res, options);
