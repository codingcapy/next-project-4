
'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {

    const { data: session } = useSession()

    return (
        <header className="py-5 flex justify-between z-10 sticky top-0">
            <div>
                <Link href={"/"} className="px-5">CapyNext</Link>
                <Link href={"/"} className="px-5">Home</Link>
                {session && <Link href={"/dashboard"} className="px-5">Dashboard</Link>}
            </div>
            <div>
                <Link href={"/"} className="px-5">Posts</Link>
            </div>
            <div>
                {!session && <Link href={"/users/login"} className="px-5">Login</Link>}
                {!session && <Link href={"/users/signup"} className="px-5">Sign up</Link>}
                {session && <Link href={"/users/signup"} className="px-5" onClick={()=>signOut()}>Logout</Link>}
            </div>
        </header>
    )
}