import ListCard from "@/components/ui/ListCard/ListCard"
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
                        <ListCard
                            key={`${list.title}-${list.id}`}
                            list={list}
                        />
                    )
                })}
            </ul>
        </>
    )
}

export default todoLists