"use client"

import { TodoList, TodoListFormData } from "@/types/todo-list.types"
import ListCard from "../ListCard/ListCard"
import { useState } from "react"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import ListForm from "../ListForm/ListForm"

type TodoListsListProps = {
    todoLists?: TodoList[]
}
const TodoListsList = ({ todoLists }: TodoListsListProps) => {

    const [localLists, setLocalLists] = useState<TodoList[]>(todoLists ?? [])
    const [showCreate, setShowCreate] = useState(false)

    const updateListsState = (listId: string, newList?: TodoList) => {
        newList ?
            setLocalLists(prevLocalLists => {
                return prevLocalLists.map(list => {
                    if (list.id === listId) {
                        return newList
                    } else {
                        return list
                    }
                })
            })
            :
            setLocalLists(prevLocalLists => {
                return prevLocalLists.filter(list => list.id !== listId)
            })

    }

    const addNewTodoList = async (data: TodoListFormData) => {
        const res = await todoListsService.createList(data)
        const newLists = [...localLists, res]
        setLocalLists(newLists)
        setShowCreate(false)
    }

    return (
        <ul>
            {
                localLists.length > 0 ?
                    localLists.map(list => {
                        return (
                            <ListCard
                                key={`${list.title}-${list.id}`}
                                list={list}
                                updateListState={updateListsState}
                            />
                        )
                    })
                    :
                    <p>No hay listas</p>
            }
            <li className="mt-2">
                {
                    showCreate ?
                        <ListForm buttonLabel="Add" onSubmit={addNewTodoList} setShowState={setShowCreate} />
                        :
                        <button className="px-2 py-0.5 bg-white rounded hover:bg-gray-100 transition-all duration-200" onClick={() => setShowCreate(true)}>Add+</button>
                }
            </li>
        </ul>
    )
}

export default TodoListsList