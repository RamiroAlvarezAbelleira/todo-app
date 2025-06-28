"use client"

import { TaskFormData } from "@/types/task.types"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"

type TaskFormProps = {
    buttonLabel: string,
    onSubmit: (data: TaskFormData) => void,
    defaultValue?: string,
    setShowState: Dispatch<SetStateAction<boolean>>
}

const TaskForm = ({ onSubmit, buttonLabel, defaultValue, setShowState }: TaskFormProps) => {
    const { register, handleSubmit, resetField } = useForm<TaskFormData>()

    const onSubmitLocal = async (data: TaskFormData) => {
        onSubmit(data)
        resetField("title")
        resetField("description")
    }

    return (
        <form onSubmit={handleSubmit(onSubmitLocal)} className="flex w-full px-2 items-center justify-between gap-x-2">
            <div className="flex">
                <input
                    placeholder="Task..."
                    className="bg-white border border-gray-300 px-2 rounded"
                    type="text"
                    {...register("title")}
                    defaultValue={defaultValue ?? ""} />
            </div>
            <div className="hidden">
                <label htmlFor="description">Description</label>
                <input type="text" {...register("description")} />
            </div>
            <div className="flex gap-x-2">
                <button type="submit" className="h-fit">{buttonLabel}</button>
                <button onClick={() => setShowState(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default TaskForm