import todoListsService from "@/services/todo-lists/todo-lists.service"
import Link from "next/link"

export const metadata = {
    title: "Your lists"
}

const todoLists = async () => {

    const todoLists = await todoListsService.getTodoLists()

    return (
        <>
            <h1>To do Lists</h1>
            <ul>
                {todoLists.map(list => {
                    return (
                        <li key={`${list.title}-${list.id}`}><Link href={`/todo-lists/${list?.id}`}>{list.title}</Link></li>
                    )
                })}
            </ul>
        </>
    )
}

export default todoLists