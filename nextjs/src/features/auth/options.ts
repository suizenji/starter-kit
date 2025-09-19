import CredentialsProvider from 'next-auth/providers/credentials';
import KeycloakProvider from 'next-auth/providers/keycloak';
import type { NextAuthOptions } from 'next-auth';
import type { User } from './types';
const KC_META_URI =
  'http://localhost:8080/realms/xxx/.well-known/openid-configuration';

// https://next-auth.js.org/configuration/options#options
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  //  pages: {
  //    signIn: '/login',
  //    signOut: '/logout',
  //    error: '/login',
  //  },
  providers: [
    // https://next-auth.js.org/configuration/providers/credentials
    CredentialsProvider({
      id: 'idpw',
      credentials: {
        id: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const user: User = { id: credentials?.id ?? '', role: 'guest' };
        return user;
      },
    }),
    KeycloakProvider({
      clientId: 'xxx',
      clientSecret: '',
      wellKnown: KC_META_URI,
      checks: ['pkce', 'state', 'nonce'],
      authorization: { params: { scope: 'openid offline_access' } },
      profile(profile, tokens) {
        return {
          id: profile.sub,
          profile,
          tokens,
          metaUri: KC_META_URI,
        };
      },
    }),
  ],
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks
    async signIn({ user, credentials }) {
      const password = String(credentials?.password ?? '');
      if (user.id === 'admin' && password === 'admin') return true;
      if (user.id === 'guest' && password === 'guest') return true;
      return false;
    },
    // Cookie「next-auth.session-token」に暗号化されて格納される。
    jwt: async ({ token, user, session, trigger }) => {
      const _user: User = user ?? session?.user ?? token.user;
      _user.role = _user.id === 'admin' ? 'admin' : 'guest';
      return { ...token, user: _user };
    },
    // session取得APIで公開するパラメータを指定する。
    session: ({ session, token }) => {
      // const { role: _, ..._user } = { ...token.user };
      // return { ...session, user: _user };
      return { ...session, user: token.user };
    },
  },
};
