import { Task } from "./task.types"

export type TodoList = {
    id: string,
    title: string,
    description: string,
    tasks?: Task[]
}

export type TodoListFormData = {
    id?: string,
    title: string,
    description: string
}