"use client"

import { TodoList, TodoListFormData } from "@/types/todo-list.types"
import { useEffect, useState } from "react"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import ListForm from "../ListForm/ListForm"
import ListCard from "../ListCard/ListCard"
import AddButton from "../../Buttons/AddButton"

const TodoListsList = ({ token }: { token: string }) => {
    const [todoLists, setTodoLists] = useState<TodoList[]>([])
    const [showCreate, setShowCreate] = useState(false)

    const getTodoLists = async () => {
        console.log(token)
        if (token) {
            const usersLists = await todoListsService.getTodoLists(token)
            return usersLists
        } else {
            return []
        }

    }

    useEffect(() => {
        getTodoLists().then(lists => setTodoLists(lists))
    }, [])

    const updateListsState = (listId: string, newList?: TodoList) => {
        newList ?
            setTodoLists(prevLocalLists => {
                return prevLocalLists.map(list => {
                    if (list.id === listId) {
                        return newList
                    } else {
                        return list
                    }
                })
            })
            :
            setTodoLists(prevLocalLists => {
                return prevLocalLists.filter(list => list.id !== listId)
            })

    }

    const addNewTodoList = async (data: TodoListFormData) => {
        if (token) {
            const res = await todoListsService.createList({ ...data }, token)
            const newLists = [...todoLists, res]
            setTodoLists(newLists)
            setShowCreate(false)
        }
    }

    return (
        <ul className="">
            {
                todoLists.length > 0 ?
                    todoLists.map(list => {
                        return (
                            <ListCard
                                key={`${list.title}-${list.id}`}
                                list={list}
                                updateListState={updateListsState}
                                token={token}
                            />
                        )
                    })
                    :
                    <div className="flex flex-col items-center justify-center w-full rounded bg-white py-2">
                        <span className="text-m font-semibold">Aun no tenes listas</span>
                        <span className="text-xs">Agrega tu primera lista</span>
                    </div>
            }
            <li className="mt-2">
                {
                    showCreate ?
                        <ListForm buttonLabel="Add" onSubmit={addNewTodoList} setShowState={setShowCreate} />
                        :
                        <AddButton setShowState={setShowCreate} />
                }
            </li>
        </ul>
    )
}

export default TodoListsList