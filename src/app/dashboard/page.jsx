'use client'

import { useSession } from "next-auth/react"


export default function Dashboard() {

    const { data: session } = useSession()
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{JSON.stringify(session?.user)}</p>
        </div>
    )
}