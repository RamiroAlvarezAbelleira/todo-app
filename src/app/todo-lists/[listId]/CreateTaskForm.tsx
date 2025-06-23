"use client"

import TaskList from "@/components/ui/TaskList/TaskList"
import taskService from "@/services/tasks/tasks.service"
import { Task } from "@/types/task.types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type FormData = {
    title: string,
    description: string,
}

type CreateTaskFormProps = {
    todo_list_id: string
}

const CreateTaskForm = ({ todo_list_id }: CreateTaskFormProps) => {

    const { register, handleSubmit, resetField } = useForm<FormData>()
    const [tasks, setTasks] = useState<Task[]>([])

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

    const getTaskFunc = async () => {
        const res = await taskService.getTasksByTodoListId(todo_list_id)
        setTasks(res)
    }

    useEffect(() => {
        getTaskFunc()
    }, [])

    return (
        <>
            <TaskList tasks={tasks} setTasks={setTasks} />
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
        </>

    )
}

export default CreateTaskForm