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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <header>
                    <h3>Header</h3>
                    <Nav />
                </header>
                {children}
                <footer>Footer</footer>
            </body>
        </html>
    )
}