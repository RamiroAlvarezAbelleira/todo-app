"use client"

import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Todo lists",
        href: "/todo-lists"
    },
]

const authLinks = [
    {
        title: "Login",
        href: "/login"
    },
    {
        title: "Register",
        href: "/register"
    }
]

const Nav = () => {
    const pathname = usePathname()
    const { user, logout } = useAuth()
    return (
        <nav>
            {
                user ?
                    <ul className="flex gap-x-[5px]">
                        {links.map(link => {
                            const isActive = link.href === pathname
                            return (
                                <li key={`${link.title}-${link.href}`}>
                                    <Link className={isActive ? "text-[#2563EB]" : "text-[#000]"} href={link.href}>
                                        {link.title}
                                    </Link>
                                </li>
                            )
                        })}
                        <li>
                            <button onClick={logout} className="text-red-500 hover:underline">
                                Logout
                            </button>
                        </li>
                    </ul>
                    :
                    <ul className="flex gap-x-[5px]">
                        {authLinks.map(link => {
                            const isActive = link.href === pathname
                            return (
                                <li key={`${link.title}-${link.href}`}>
                                    <Link className={isActive ? "text-[#2563EB]" : "text-[#000]"} href={link.href}>
                                        {link.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
            }

        </nav>
    )
}

export default Nav