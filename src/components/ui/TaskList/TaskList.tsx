import taskService from "@/services/tasks/tasks.service"
import { Task } from "@/types/task.types"
import { Dispatch, SetStateAction } from "react"
import TaskCard from "../TaskCard/TaskCard"

type TaskListProps = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>
}
const TaskList = ({ tasks, setTasks }: TaskListProps) => {

    const toggleCompleteTask = async (taskId: string) => {
        await taskService.toggleCompleteTask(taskId)
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed }
                } else {
                    return task
                }
            })
        })
    }

    return (
        <ul className="flex flex-col p-[0px] gap-y-[8px]">
            {tasks?.map(task => {
                return (
                    <TaskCard
                        key={`${task.title}-${task.id}`}
                        onClick={toggleCompleteTask}
                        title={task.title}
                        completed={task.completed}
                        id={task.id}
                    />
                )
            })}
        </ul>
    )
}

export default TaskList