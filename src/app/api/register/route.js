import db from "@/db/connect"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/models/User";

const saltRounds = 10;

export async function POST(req) {
    await db
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const { username, password } = await req.json()
    if (users.find((user) => user.username === username.toString())) {
        return NextResponse.json({ message: "user exists" }, { status: 500 })
    }
    else {
        const encrypted = await bcrypt.hash(password, saltRounds)
        await User.create({ username, password: encrypted, userId })
        return NextResponse.json({ message: "success" }, { status: 201 })
    }
}