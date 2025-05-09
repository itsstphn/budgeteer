import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./mongodb";

import type { NextAuthOptions, Profile } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ profile }: { profile?: Profile }) {
      const client = await clientPromise;
      const db = client.db("budgeteer-dev");
      const users = db.collection("users");
      console.log("signIn", profile);

      const existingUser = await users.findOne({ userId: profile?.sub });

      if (!existingUser) {
        await users.insertOne({
          userId: profile?.sub, // unique ID
          name: profile?.name,
          email: profile?.email,
          createdAt: new Date(),
        });
      }

      return true; // Allow sign-in
    },

    async jwt({
      token,
      profile,
    }: {
      token: JWT;
      account?: any;
      profile?: any;
    }) {
      // Add the Google ID to token for later use
      if (profile) token.id = profile.sub;
      return token;
    },
  },
};
