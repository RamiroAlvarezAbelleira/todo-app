"use client"

import { TodoList, TodoListFormData } from "@/types/todo-list.types"
import Link from "next/link"
import { useState } from "react"
import ListForm from "../ListForm/ListForm"
import todoListsService from "@/services/todo-lists/todo-lists.service"

type ListCardProps = {
    list: TodoList
    updateListState: (listId: string, newList?: TodoList) => void
}

const ListCard = ({ list, updateListState }: ListCardProps) => {

    const [showUpdate, setShowUpdate] = useState(false)

    const updateTodoList = async (data: TodoListFormData) => {
        const res = await todoListsService.updateList(list.id, data)
        setShowUpdate(false)
        updateListState(list.id, res)
    }


    const deleteTodoList = async (listId: string) => {
        await todoListsService.deleteList(listId)
        updateListState(listId)
    }

    return (
        <li>
            {
                showUpdate ?
                    <ListForm onSubmit={updateTodoList} buttonLabel="Update" defaultValue={list?.title} setShowState={setShowUpdate} />
                    :
                    <div className="flex justify-between gap-x-2 group hover:bg-gray-300 px-2 rounded py-1 transition-all duration-300">
                        <Link href={`/todo-lists/${list?.id}`}>
                            <span className="group-hover:text-white transition-all duration-300">{list.title}</span>
                        </Link>
                        <div className="flex gap-x-2">
                            <button
                                onClick={() => setShowUpdate(true)}
                                className="opacity-0 group-hover:opacity-100 group-hover:text-white cursor-pointer active:bg-white active:text-black  transition-all duration-300">
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTodoList(list.id)}
                                className="opacity-0 group-hover:opacity-100 group-hover:text-white cursor-pointer active:bg-white active:text-black  transition-all duration-300">
                                Delete
                            </button>
                        </div>
                    </div>
            }
        </li>
    )
}

export default ListCard