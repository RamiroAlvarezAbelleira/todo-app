"use client"
import { usePathname } from "next/navigation"

const notFound = () => {
    const pathname = usePathname();
    const taskId = pathname.split("/")[4]
    const listId = pathname.split("/")[2]
    return (
        <div>
            <h2>Task Not Found</h2>
            <p>Could not find the task {taskId} from the list {listId}</p>
        </div>
    )
}

export default notFound