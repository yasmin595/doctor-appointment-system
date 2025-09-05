import { loginUser } from "@/app/actions/auth/loginUser";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import dbConnect, { collectionsNameObj } from "@/database/dbConnect";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials)
                // Add logic here to look up the user from the credentials supplied
                const user = await loginUser(credentials)
                console.log(user)
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        


    ],
    pages: {
        signIn: "/login"
    },
  callbacks: {
  async signIn({ user, account }) {
    if (account) {
      const userCollection = await dbConnect(collectionsNameObj.userCollection);
      const isExisted = await userCollection.findOne({ providerAccountId: account.providerAccountId });

      if (!isExisted) {
        await userCollection.insertOne({
          providerAccountId: account.providerAccountId,
          provider: account.provider,
          email: user.email,
          name: user.name,
          image: user.image,
        });
      }
    }
    return true;
  }
}

}