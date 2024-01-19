import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/GitHub"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/mongoclient"
import User from "./models/User"
import bcrypt from "bcryptjs"
import db from "@/db/connect"

export const authConfig = {
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt"
    },
    providers: [GitHub, CredentialsProvider(
        {
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await db
                const user = await User.findOne({ username: credentials.username })
                if (!user) {
                    return null
                }
                const passwordsMatch = await bcrypt.compare(credentials.password, user.password)
                if (!passwordsMatch) return null
                return user
            },
        }
    )],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                //@ts-ignore
                token.username = user.username;
                //@ts-ignore
                token.userId = user.userId;
            }
            return token
        },
        async session({ session, token }) {
            //@ts-ignore
            session.user.id = token.id
            //@ts-ignore
            session.user.username = token.username
            //@ts-ignore
            session.user.userId = token.userId
            return session
        },
    },
    secret:"secret"
} satisfies NextAuthConfig

export const {
    handlers,
    auth,
    signOut
} = NextAuth(authConfig)