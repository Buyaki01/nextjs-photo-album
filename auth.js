import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import Google from "next-auth/providers/google"
import authConfig from "./auth.config"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Google],
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
})
