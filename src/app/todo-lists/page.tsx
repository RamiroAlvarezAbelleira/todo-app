import Link from "next/link"

export const metadata = {
    title: "Your lists"
}
const mockLists = [
    {
        id: 1,
        title: "List 1"
    },
    {
        id: 2,
        title: "List 2"
    },
    {
        id: 3,
        title: "List 3"
    },
]
const todoLists = () => {
    return (
        <>
            <h1>To do Lists</h1>
            <ul>
                {mockLists.map(list => {
                    return (
                        <li key={`${list.title}-${list.id}`}><Link href={`/todo-lists/${list?.id}`}>{list.title}</Link></li>
                    )
                })}
            </ul>
        </>
    )
}

export default todoLists