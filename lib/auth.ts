import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { nextCookies } from "better-auth/next-js"

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db("hireloop")

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL?.trim() || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        input: false,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [nextCookies()],
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
})
