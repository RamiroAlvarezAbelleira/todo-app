"use client"

import todoListsService from "@/services/todo-lists/todo-lists.service"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type FormData = {
    title: string,
    description: string
}

const CreateListForm = () => {
    const router = useRouter()

    const onSubmit = (data: FormData) => {
        todoListsService.createList({ title: data.title, description: data.description })
        resetField("title")
        resetField("description")
        router.push("/todo-lists")
    }

    const { register, handleSubmit, resetField } = useForm<FormData>()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="listTitle">Title</label>
                <input
                    type="text"
                    id="listTitle"
                    {...register("title")}
                />
            </div>
            <div>
                <label htmlFor="listDescription">Description</label>
                <input
                    type="text"
                    id="listDescription"
                    {...register("description")}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default CreateListForm