
'use client'

import { signOut } from "next-auth/react"
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Logout() {
    return (
        <button onClick={signOut} className="px-5">Logout</button>
    )
}