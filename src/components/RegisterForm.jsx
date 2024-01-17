
"use client"

import Link from "next/link"
import { useState } from "react"

export default function SignUpForm() {

    const [inputUsername, setInputUsername] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await fetch('/api/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: inputUsername, password: inputPassword
            })
        })
        if (res.ok) {
            const form = e.target
            form.reset()
            setMessage("Success")
        }
        else {
            setMessage("username is not available")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="py-10 text-2xl text-slate-700 font-medium text-center">Sign Up</h2>
            <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => { setInputUsername(e.target.value) }} required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <div className="flex flex-col my-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => { setInputPassword(e.target.value) }} required className="px-2 border rounded-lg border-slate-700 py-1" />
            </div>
            <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Sign Up</button>
            <Link href={"/users/login"} className="text-center">Login</Link>
            {message}
        </form>
    )
}