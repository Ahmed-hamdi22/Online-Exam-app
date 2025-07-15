import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import AppError from "./lib/utils/app-error";
import { cookies } from "next/headers";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req): Promise<User | null> => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        if (
          payload.message === "success" &&
          "token" in payload &&
          "user" in payload
        ) {
          cookies().set("token", payload.token, {
            httpOnly: true,
          });

          return {
            id: payload.user._id, // ← هذا المطلوب من NextAuth
            token: payload.token,
            username: payload.user.username,
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
            email: payload.user.email,
            phone: payload.user.phone,
            role: payload.user.role,
            _id: payload.user._id,
          } as unknown as User;
        }

        throw new AppError(
          payload.message,
          "code" in payload ? payload.code : 500
        );
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.token = user.token;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.phone = user.phone;
        token.role = user.role;
        token._id = user._id;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.username = token.username;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.email = token.email;
      session.phone = token.phone;
      session.role = token.role;
      session._id = token._id;

      return session;
    },
  },
};
