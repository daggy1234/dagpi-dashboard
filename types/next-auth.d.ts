declare module 'next-auth' {
    interface Session {
        user: {
            /** The user's postal address. */
            name: string;
            email: string;
            image: string;
            id: string;
        };
        expires: string;
        joined_dagpi: string;
        refreshToken: string;
        accessToken: string;
        client_id: string;
    }

    interface Profile {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: string;
        flags: string;
        locale: string;
        mfa_enabled: boolean;
        email: string;
        verified: boolean;
        image_url: string;
    }
    interface Token {
        profile_id: string;
        joined_dagpi: string;
        client_id: string;
        profile: Profile;
    }

    interface Account {
        provider: string;
        type: string;
        id: string;
        accessToken: string;
        accessTokenExpires: string;
        refreshToken: string;
        access_token: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
        token_type: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        name: string;
        email: string;
        picture: string;
        sub: string;
        client_id: string;
        joined_dagpi: string;
        profile: Profile;
        account: Account;
        iat: number;
        exp: number;
    }
}
