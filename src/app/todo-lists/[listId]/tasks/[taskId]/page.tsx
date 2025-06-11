import { Metadata } from "next"
import { notFound } from "next/navigation"

type TaskDetailProps = {
    params: Promise<{ listId: string, taskId: string }>
}

export const generateMetadata = async ({ params }: TaskDetailProps): Promise<Metadata> => {
    const id = (await params).taskId
    return {
        title: `Task ${id}`
    }
}

const taskDetail = async ({ params }: TaskDetailProps) => {
    const { listId, taskId } = await params
    if (parseInt(taskId) > 1000) {
        notFound()
    }
    return (
        <h1>Task {taskId} for list {listId}</h1>
    )
}

export default taskDetail