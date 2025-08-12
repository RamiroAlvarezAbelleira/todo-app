"use client"

import { TodoList, TodoListFormData } from "@/types/todo-list.types"
import Link from "next/link"
import { useState } from "react"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import ListForm from "../ListForm/ListForm"
import Delete from "../../Icons/Delete"
import Edit from "../../Icons/Edit"
import { redirect, usePathname } from "next/navigation"

type ListCardProps = {
    list: TodoList
    updateListState: (listId: string, newList?: TodoList) => void,
    token: string
}

const ListCard = ({ list, updateListState, token }: ListCardProps) => {
    const pathname = usePathname()
    const [showUpdate, setShowUpdate] = useState(false)

    const updateTodoList = async (data: TodoListFormData) => {
        const res = await todoListsService.updateList(list.id, token, data)
        setShowUpdate(false)
        updateListState(list.id, res)
    }


    const deleteTodoList = async (listId: string) => {
        await todoListsService.deleteList(listId, token)
        updateListState(listId)
        if (pathname.includes(listId)) {
            redirect("/todo-lists")
        }
    }

    return (
        <li className="w-full">
            {
                showUpdate ?
                    <div className="flex py-[5px] bg-gray-200 rounded items-center w-full">
                        <ListForm onSubmit={updateTodoList} buttonLabel="Update" defaultValue={list?.title} setShowState={setShowUpdate} />
                    </div>
                    :
                    <div className="flex justify-between min-w-0 flex-1 gap-x-2 group hover:bg-white px-2 rounded py-1 transition-all duration-300">
                        <Link href={`/todo-lists/${list?.id}`} className="w-full py-0.5 truncate flex-1 transition-all duration-300">
                            <span>{list.title}</span>
                        </Link>
                        <div className="hidden group-hover:flex gap-x-2">
                            <button
                                onClick={() => setShowUpdate(true)}
                                className="p-0.5 bg-white rounded hover:bg-gray-100">
                                <Edit />
                            </button>
                            <button
                                onClick={() => deleteTodoList(list.id)}
                                className="p-0.5 bg-white rounded hover:bg-gray-100">
                                <Delete className="text-red-600" />
                            </button>
                        </div>
                    </div>
            }
        </li>
    )
}

export default ListCard