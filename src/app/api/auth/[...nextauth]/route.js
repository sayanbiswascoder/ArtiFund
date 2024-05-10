import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import DiscordProvider from "next-auth/providers/discord";

import genereteId from './useridGeneretor'

import UserModel from "../../../db/models/User";
import mongoose from "mongoose";
import connectDB from "@/app/db/conectDb";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // const client = await mongoose.connect(`mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@artifund.bg8boua.mongodb.net/ArtiFund?retryWrites=true&w=majority&appName=ArtiFund`)
      // console.log(client)
      await connectDB()
      const userFromDb = await UserModel.findOne({ email: user.email });
      console.log(userFromDb)
      if (userFromDb) {
        if(userFromDb.Provider == account.provider){
          return true
        }else{
          return `/auth/login?err=acountexist&provider=${userFromDb.Provider}`
        }
      } else {
        console.log(await genereteId(user.email))
        const userDoc = new UserModel({
          userid: await genereteId(user.email),
          name: user.name.replace("_", " "),
          email: user.email,
          Avatar: user.image,
          UserType: account.provider,
          Provider: account.provider,
        })
        await userDoc.save();
        return true;
      }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      const userFromDb = await UserModel.findOne({ email: session.user.email });
      session.user.userid = userFromDb.userid
      return session
    }
  },
  async authorize({ credentials }) {
    console.log("credentials",credentials)
  },
  async jwt({ token, account }) {
    console.log(account)
    // Persist the OAuth access_token to the token right after signin
    if (account) {
      token.accessToken = account.access_token
    }
    return token
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }