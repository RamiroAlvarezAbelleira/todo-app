"use client"

import { TodoList } from "@/types/todo-list.types"
import Link from "next/link"

type ListCardProps = {
    list: TodoList
}

const ListCard = ({ list }: ListCardProps) => {
    return (
        <li className="hover:bg-black transition-all duration-300">
            <Link href={`/todo-lists/${list?.id}`} className="hover:text-white">
                {list.title}
            </Link>
        </li>
    )
}

export default ListCard