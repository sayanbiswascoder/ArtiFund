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
/**
 * Sign in a user with provided information.
 * 
 * @param {Object} options - Object containing user, account, profile, email, and credentials.
 * @returns {Promise<boolean|string>} - Returns true if sign-in is successful, otherwise returns a string with error information.
 */


/**
 * Handles user sign-in by checking if the user exists in the database and verifying the provider.
 * If the user does not exist, it creates a new user record.
 *
 * @param {Object} params - The parameters for the sign-in function.
 * @param {Object} params.user - The user object containing user details.
 * @param {Object} params.account - The account object containing account details.
 * @param {Object} params.profile - The profile object containing profile details.
 * @param {Object} params.email - The email object containing email details.
 * @param {Object} params.credentials - The credentials object containing credentials details.
 * @returns {Promise<boolean|string>} - Returns true if sign-in is successful, otherwise returns a URL string for redirection.
 */
async signIn({ user, account, profile, email, credentials }) {
  // console.log(client)
  await connectDB();
  const userFromDb = await UserModel.findOne({ email: user.email });
  console.log(userFromDb);
  if (userFromDb) {
    if (userFromDb.Provider == account.provider) {
      return true;
    } else {
      return `/auth/login?err=acountexist&provider=${userFromDb.Provider}`;
    }
  } else {
    console.log(await genereteId(user.email));
    const userDoc = new UserModel({
      userid: await genereteId(user.email),
      name: user.name.replace("_", " "),
      email: user.email,
      Avatar: user.image,
      UserType: account.provider,
      Provider: account.provider,
    });
    await userDoc.save();
    return true;
  }
},
/**
 * Handles the session callback.
 * This function is called whenever a session is checked.
 * It can be used to add properties to the session object.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.session - The session object.
 * @param {Object} params.token - The token object.
 * @param {Object} params.user - The user object.
 * @returns {Object} The modified session object.
 */
async session({ session, token, user }) {
  // Send properties to the client, like an access_token from a provider.
  const userFromDb = await UserModel.findOne({ email: session.user.email });
  session.user.userid = userFromDb.userid;
  return session;
}
  },
  async authorize({ credentials }) {
    console.log("credentials",credentials)
  },
/**
 * Handles the JWT token processing.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.token - The current token object.
 * @param {Object} params.account - The account object containing OAuth details.
 * @returns {Promise<Object>} The updated token object.
 */
async jwt({ token, account }) {
  console.log(account);
  // Persist the OAuth access_token to the token right after signin
  if (account) {
    token.accessToken = account.access_token;
  }
  return token;
},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }