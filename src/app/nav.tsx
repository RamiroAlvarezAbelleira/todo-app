"use client"

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
    {
        title: "Create",
        href: "/create-list"
    }
]

const Nav = () => {
    const pathname = usePathname()
    return (
        <nav>
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
            </ul>
        </nav>
    )
}

export default Nav