import { Metadata } from "next"
import React from "react"
import "./globals.css"
import Nav from "./nav"

export const metadata: Metadata = {
    title: {
        default: "Todo App",
        template: "%s | Todo App", // Se lo agrega al final de todos los title que crees con metadata
        // absolute: "" Este sirve por si queres ignorar el template en alguna ruta en especial
    },
    description: 'This is a basic Todo app created with nextjs'
}

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className="h-screen grid grid-rows-[auto_1fr_auto]">
                <header className="flex gap-x-2 items-end justify-between px-4 py-0">
                    <h3 className="text-2xl font-bold text-blue-400">Todo App</h3>
                    <Nav />
                </header>
                <main className="h-full overflow-hidden">
                    {children}
                </main>
                <footer>
                    <h6>Todo App inc.</h6>
                </footer>
            </body>
        </html>
    )
}