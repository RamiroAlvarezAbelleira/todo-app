import taskService from "@/services/tasks/tasks.service"
import { Task } from "@/types/task.types"
import { Dispatch, SetStateAction } from "react"
import TaskCard from "../TaskCard/TaskCard"

type TaskListProps = {
    tasks: Task[],
    setTasks: Dispatch<SetStateAction<Task[]>>
}
const TaskList = ({ tasks, setTasks }: TaskListProps) => {

    const updateTaskList = (newTask: Task) => {
        setTasks(prevTasks => {
            return prevTasks.map(task => {
                if (task.id === newTask.id) {
                    return newTask
                } else {
                    return task
                }
            })
        })
    }

    const toggleCompleteTask = async (newTask: Task) => {
        const res = await taskService.toggleCompleteTask(newTask.id)
        updateTaskList(res)
    }

    return (
        <ul className="flex flex-col p-[0px] gap-y-[8px]">
            {tasks?.map(task => {
                return (
                    <TaskCard
                        key={`${task.title}-${task.id}`}
                        toggleCompleteTask={toggleCompleteTask}
                        title={task.title}
                        task={task}
                        updateTaskList={updateTaskList}
                        completed={task.completed}
                        id={task.id}
                    />
                )
            })}
        </ul>
    )
}

export default TaskList