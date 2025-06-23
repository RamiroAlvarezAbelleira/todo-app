"use client"

import taskService from "@/services/tasks/tasks.service"
import { Task } from "@/types/task.types"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

type FormData = {
    title: string,
    description: string,
}

type CreateTaskFormProps = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>
    todo_list_id: string
}

const CreateTaskForm = ({ tasks, setTasks, todo_list_id }: CreateTaskFormProps) => {
    const { register, handleSubmit, resetField } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        const newTask = {
            title: data.title,
            description: data.description,
            todo_list_id: todo_list_id
        }
        const res = await taskService.createTask(newTask)
        let newTaskArr = [...tasks, res]
        setTasks(newTaskArr)
        resetField("title")
        resetField("description")
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" {...register("title")} />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" {...register("description")} />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default CreateTaskForm