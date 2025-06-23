"use client"

import { TaskFormData } from "@/types/task.types"
import { useForm } from "react-hook-form"

type TaskFormProps = {
    buttonLabel: string,
    onSubmit: (data: TaskFormData) => void
}

const TaskForm = ({ onSubmit, buttonLabel }: TaskFormProps) => {
    const { register, handleSubmit, resetField } = useForm<TaskFormData>()

    const onSubmitLocal = async (data: TaskFormData) => {
        onSubmit(data)
        resetField("title")
        resetField("description")
    }

    return (
        <form onSubmit={handleSubmit(onSubmitLocal)}>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" {...register("title")} />
            </div>
            <div className="hidden">
                <label htmlFor="description">Description</label>
                <input type="text" {...register("description")} />
            </div>
            <button type="submit">{buttonLabel}</button>
        </form>
    )
}

export default TaskForm