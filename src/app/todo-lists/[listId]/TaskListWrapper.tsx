"use client"

import CreateTaskForm from "@/components/ui/CreateTaskForm/CreateTaskForm"
import TaskList from "@/components/ui/TaskList/TaskList"
import taskService from "@/services/tasks/tasks.service"
import { Task } from "@/types/task.types"
import { useEffect, useState } from "react"

type TaskListWrapperProps = {
    todo_list_id: string
}

const TaskListWrapper = ({ todo_list_id }: TaskListWrapperProps) => {

    const [tasks, setTasks] = useState<Task[]>([])

    const getTaskFunc = async () => {
        const res = await taskService.getTasksByTodoListId(todo_list_id)
        setTasks(res)
    }

    useEffect(() => {
        getTaskFunc()
    }, [])

    return (
        <>
            <TaskList
                tasks={tasks}
                setTasks={setTasks}
            />
            <CreateTaskForm
                tasks={tasks}
                setTasks={setTasks}
                todo_list_id={todo_list_id}
            />
        </>

    )
}

export default TaskListWrapper