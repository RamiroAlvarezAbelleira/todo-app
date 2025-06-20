"use client"

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

    const completeStyle = "bg-[#32CD32] border-[#ffffffdd]"
    const incompleteStyle = "bg-transparent border-[#aaaaaa44]"

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

    const toggleCompleteTask = async (taskId: string) => {
        await taskService.toggleCompleteTask(taskId)
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed }
                } else {
                    return task
                }
            })
        })
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
            <ul className="flex flex-col p-[0px] gap-y-[8px]">
                {tasks?.map(task => {
                    return (
                        <li key={`${task.title}-${task.id}`} className="flex items-center gap-x-[8px]">
                            <button
                                onClick={() => toggleCompleteTask(task.id)}
                                className={`p-[0px] rounded-full w-[20px] h-[20px] border border-[2px] ${task.completed ? completeStyle : incompleteStyle}`}
                            ></button>
                            <p className={`${task.completed ? "text-[#32CD32]" : "text-[#FFD700]"} m-[0px] font-[700]`}>{task.title}</p>
                        </li>
                    )
                })}
            </ul>
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