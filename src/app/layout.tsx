import React from "react"

export const metadata = {
    title: 'Todo App',
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
                <header>Header</header>
                {children}
                <footer>Footer</footer>
            </body>
        </html>
    )
}