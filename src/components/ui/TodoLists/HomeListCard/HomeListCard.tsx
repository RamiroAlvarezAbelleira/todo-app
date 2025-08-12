import taskService from "@/services/tasks/tasks.service"
import Link from "next/link"

type HomeListCardProps = {
    listId: string,
    title: string,
    token: string
}

const HomeListCard = async ({ listId, title, token }: HomeListCardProps) => {

    const tasks = await taskService.getTasksByTodoListId(listId, token)
    return (
        <Link href={`/todo-lists/${listId}`} className="w-[200px] h-[100px] bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200 overflow-hidden">
            <div className="w-full rounded px-2 py-1 bg-gray-300">
                <h3 className="font-semibold">{title}</h3>
            </div>

            <div className="overflow-y-auto scroll-container pb-12 h-full">
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
            </div>

            
        </Link>
    )
}

export default HomeListCard