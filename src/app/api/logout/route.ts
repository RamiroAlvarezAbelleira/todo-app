import { cookies } from "next/headers"

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.set("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: new Date(0) // fecha expirada
    })

    return new Response("Logged out", { status: 200 })
}