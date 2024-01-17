


import db from "@/db/connect";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { username, password } = credentials
                await db
                const user = await User.findOne({ username })
                console.log(user)
                if (!user) { return null }
                else {
                    const passwordsMatch = await bcrypt.compare(password, user.password)
                    if (!passwordsMatch) return null
                    return user
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/users/login"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }