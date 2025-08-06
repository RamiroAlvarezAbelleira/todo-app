import taskService from "@/services/tasks/tasks.service"
import Link from "next/link"

type HomeListCardProps = {
    listId: string,
    title: string
}

const HomeListCard = async ({ listId, title }: HomeListCardProps) => {

    const tasks = await taskService.getTasksByTodoListId(listId)
    return (
        <Link href={`/todo-lists/${listId}`} className="w-[200px] h-[100px] py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200 overflow-hidden">
            <h3 className="font-semibold">{title}</h3>
            <ul className="pl-4">
                {
                    tasks?.length > 0 ?
                        tasks.map(task => (
                            <li key={task.id}>{task.title}</li>
                        ))
                        :
                        <li>No tasks yet</li>
                }
            </ul>
        </Link>
    )
}

export default HomeListCard