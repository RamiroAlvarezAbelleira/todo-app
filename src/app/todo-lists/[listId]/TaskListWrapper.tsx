"use client"

import TaskForm from "@/components/ui/TaskForm/TaskForm"
import TaskList from "@/components/ui/TaskList/TaskList"
import taskService from "@/services/tasks/tasks.service"
import { Task, TaskFormData } from "@/types/task.types"
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

    const createTaskFunc = async (data: TaskFormData) => {
        const newTask = {
            title: data.title,
            description: data.description,
            todo_list_id: todo_list_id
        }
        const res = await taskService.createTask(newTask)
        let newTaskArr = [...tasks, res]
        setTasks(newTaskArr)
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
            <TaskForm
                onSubmit={createTaskFunc}
                buttonLabel="Add"
            />
        </>

    )
}

export default TaskListWrapper