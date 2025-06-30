"use client"

import { TaskFormData } from "@/types/task.types"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import Check from "../../Icons/Check"
import Cross from "../../Icons/Cross"

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
                <button type="submit" className="p-0.5 bg-gray-200 rounded group hover:bg-gray-100">
                    <Check className="text-green-600 group-hover:text-green-500" />
                </button>
                <button onClick={() => setShowState(false)} className="p-0.5 bg-gray-200 rounded group hover:bg-gray-100">
                    <Cross className="text-red-600 group-hover:text-red-500" />
                </button>
            </div>
        </form>
    )
}

export default TaskForm