import taskService from "@/services/tasks/tasks.service"
import { Task } from "@/types/task.types"
import { Dispatch, SetStateAction } from "react"
import TaskCard from "../TaskCard/TaskCard"

type TaskListProps = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>
}
const TaskList = ({ tasks, setTasks }: TaskListProps) => {

    const updateTaskList = (taskId: string, newTask?: Task) => {
        newTask ?
            setTasks(prevTasks => {
                return prevTasks.map(task => {
                    if (task?.id === taskId) {
                        return newTask
                    } else {
                        return task
                    }
                })
            })
            :
            setTasks(prevTasks => {
                return prevTasks.filter(task => task.id !== taskId)
            })
    }

    const toggleCompleteTask = async (newTask: Task) => {
        const res = await taskService.toggleCompleteTask(newTask.id)
        updateTaskList(newTask.id, res)
    }

    return (
        <ul className="flex flex-col p-[0px] gap-y-0 w-full">
            {tasks?.length > 0 ?

                tasks?.map(task => {
                    return (
                        <TaskCard
                            key={`${task.title}-${task.id}`}
                            toggleCompleteTask={toggleCompleteTask}
                            task={task}
                            updateTaskList={updateTaskList}
                        />
                    )
                })
                :
                <div className="flex flex-col items-center justify-center w-full rounded bg-white py-2">
                    <span className="text-m font-semibold">Aun no tenes Tareas</span>
                    <span className="text-xs">Agrega tu primer tarea</span>
                </div>
            }
        </ul>
    )
}

export default TaskList