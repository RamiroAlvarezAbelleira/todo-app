import { cookies } from "next/headers"

export async function POST(req: Request) {
    const { token } = await req.json()
    const cookieStore = await cookies()
    if (!token) {
        return new Response("No token provided", { status: 400 })
    }

    cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 // 1 día
    })

    return new Response("Token set", { status: 200 })
}