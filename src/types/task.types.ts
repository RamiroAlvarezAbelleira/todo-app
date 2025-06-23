export type Task = {
    id: string,
    title: string,
    description: string,
    completed: boolean
    todo_list_id: string,
}

export type TaskFormData = {
    id?: string,
    title: string,
    description: string,
}