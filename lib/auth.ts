import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find user with NORMAL auth
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            auths: {
              where: {
                provider: "NORMAL",
              },
            },
          },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check if user has NORMAL provider auth
        const normalAuth = user.auths.find(
          (auth) => auth.provider === "NORMAL"
        );
        if (!normalAuth || !normalAuth.password) {
          throw new Error(
            "This account uses a different sign-in method. Please use Google to sign in."
          );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          normalAuth.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Check if user exists
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { auths: true },
        });

        if (!existingUser) {
          // Create new user with Google auth
          existingUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              emailVerified: new Date(),
              auths: {
                create: {
                  provider: "GOOGLE",
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                },
              },
            },
            include: { auths: true },
          });
        } else {
          // Check if Google auth already exists
          const googleAuth = existingUser.auths.find(
            (auth) => auth.provider === "GOOGLE"
          );

          if (!googleAuth) {
            // Add Google auth to existing user
            await prisma.auth.create({
              data: {
                userId: existingUser.id,
                provider: "GOOGLE",
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          } else {
            // Update existing Google auth tokens
            await prisma.auth.update({
              where: { id: googleAuth.id },
              data: {
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
