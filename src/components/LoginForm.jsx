
'use client'

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm() {

    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [message, setMessage] = useState("")
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await signIn('credentials', {
            username: inputUsername, password: inputPassword, redirect: false
        })
        if (res.error) {
            setMessage("Invalid credentials")
            return
        }
        router.replace("/dashboard")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="py-10 text-2xl text-slate-700 font-medium text-center">Login</h2>
            <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => { setInputUsername(e.target.value) }} required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => { setInputPassword(e.target.value) }} required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Login</button>
            <Link href={"/users/signup"} className="text-center">Sign Up</Link>
            {message}
        </form>
    )
}