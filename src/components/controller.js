

"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import User from "@/models/User";
import Post from "@/models/Post";

const saltRounds = 10;

export async function createUser(formData) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const username = formData.get("username")
    const password = formData.get("password")
    if (users.find((user) => user.username === username.toString())) {
        return
    }
    else {
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username: username, password: encrypted, userId: userId })
        redirect("/users/login")
    }
}

export async function createPost(formData) {
    const posts = await Post.find({})
    const postId = posts.length === 0 ? 1 : posts[posts.length - 1].postId + 1
    const title = formData.get("title")
    const content = formData.get("content")
    const username = formData.get("username")
    const userId = formData.get("userid")
    const newPost = { title, content, username, userId, postId }
    await Post.create(newPost)
        redirect("/")
}