"use client"

import { TodoList } from "@/types/todo-list.types"
import Link from "next/link"

type ListCardProps = {
    list: TodoList
}

const ListCard = ({ list }: ListCardProps) => {
    return (
        <li className="group hover:bg-gray-300 px-2 rounded py-1 transition-all duration-300 flex gap-x-2">
            <Link href={`/todo-lists/${list?.id}`}>
                <span className="group-hover:text-white transition-all duration-300">{list.title}</span>
            </Link>
            <button className="opacity-0 group-hover:opacity-100 group-hover:text-white cursor-pointer active:bg-white active:text-black  transition-all duration-300">
                Edit
            </button>
            <button className="opacity-0 group-hover:opacity-100 group-hover:text-white cursor-pointer active:bg-white active:text-black  transition-all duration-300">
                Delete
            </button>
        </li>
    )
}

export default ListCard