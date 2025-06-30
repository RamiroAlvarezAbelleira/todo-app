"use client"

import { TodoList, TodoListFormData } from "@/types/todo-list.types"
import { useState } from "react"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import ListForm from "../ListForm/ListForm"
import Plus from "../../Icons/Plus"
import ListCard from "../ListCard/ListCard"
import AddButton from "../../Buttons/AddButton"

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
        <ul className="">
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
                        <AddButton setShowState={setShowCreate} />
                }
            </li>
        </ul>
    )
}

export default TodoListsList