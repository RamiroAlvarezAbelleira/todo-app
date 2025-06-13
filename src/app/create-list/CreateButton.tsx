"use client"

import { useRouter } from "next/navigation"
const CreateButton = () => {
    const router = useRouter()
    const create = () => {
        console.log("List Created Successfully!")
        router.push("/todo-lists/1")
    }
    return (
        <button onClick={create}>Create</button>
    )
}

export default CreateButton