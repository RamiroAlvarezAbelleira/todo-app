"use client"

import { TaskFormData } from "@/types/task.types"
import { useForm } from "react-hook-form"

type TaskFormProps = {
    buttonLabel: string,
    onSubmit: (data: TaskFormData) => void,
    defaultValue?: string
}

const TaskForm = ({ onSubmit, buttonLabel, defaultValue }: TaskFormProps) => {
    const { register, handleSubmit, resetField } = useForm<TaskFormData>()

    const onSubmitLocal = async (data: TaskFormData) => {
        onSubmit(data)
        resetField("title")
        resetField("description")
    }

    return (
        <form onSubmit={handleSubmit(onSubmitLocal)} className="flex items-end gap-x-[5px]">
            <div className="flex flex-col">
                <label htmlFor="title">Title</label>
                <input type="text" {...register("title")} defaultValue={defaultValue ?? ""} />
            </div>
            <div className="hidden">
                <label htmlFor="description">Description</label>
                <input type="text" {...register("description")} />
            </div>
            <button type="submit" className="h-fit">{buttonLabel}</button>
        </form>
    )
}

export default TaskForm