/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar } from '@chakra-ui/react';
import { url } from 'inspector';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Session, Token, Profile, Account } from 'next-auth';
import NextAuth from 'next-auth';

import type { JWT } from 'next-auth/jwt';
import DiscordProvider from 'next-auth/providers/discord';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const provider = 'oauth';

const options = {
    // https://next-auth.js.org/configuration/providers
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID || 'ERROR',
            clientSecret: process.env.DISCORD_CLIENT_SECRET || 'ERROR'
        })
    ],
    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30 days
    },

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
        async session({ session, token, user }: { session: Session; token: Token; user: any }) {
            // session.user = {};
            // session.user.name = `${session.name}`;
            session.user.id = token.profile.id;
            session.joined_dagpi = token.joined_dagpi;
            // session.refreshToken = session.account.refresh_token;
            // session.accessToken = session.account.access_token;
            session.client_id = token.client_id;
            return session;
        },
        async jwt({
            token,
            user,
            account,
            profile,
            isNewUser
        }: {
            isNewUser: boolean;
            token: JWT;
            user: any;
            account: Account;
            profile: Profile;
        }): Promise<JWT | boolean> {
            if (profile) {
                const r = await fetch(
                    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/routes/user-create`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            user: profile.id,
                            name: `${user.name}`,
                            email: profile.email
                        })
                    }
                );
                const js = await r.json();
                if (js.status) {
                    token.client_id = js.data.client_id;
                    token.joined_dagpi = js.data.created_at;
                    token.profile = profile;
                    token.account = account;
                    return token;
                }
                return false;
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

export { options as authOptions };

// @ts-ignore
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth({ req, res, options });
