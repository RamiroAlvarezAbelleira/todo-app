"use client"

import TaskForm from "@/components/ui/TaskForm/TaskForm"
import TaskList from "@/components/ui/TaskList/TaskList"
import taskService from "@/services/tasks/tasks.service"
import { Task, TaskFormData } from "@/types/task.types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type TaskListWrapperProps = {
    todo_list_id: string
}

const TaskListWrapper = ({ todo_list_id }: TaskListWrapperProps) => {

    const router = useRouter()

    const [tasks, setTasks] = useState<Task[]>([])
    const [showCreate, setShowCreate] = useState(false)

    const getTaskFunc = async () => {
        const res = await taskService.getTasksByTodoListId(todo_list_id)
        setTasks(res)
    }

    const goBack = () => {
        router.back()
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
            <button onClick={() => goBack()}>Go Back</button>
            <TaskList
                tasks={tasks}
                setTasks={setTasks}
            />
            {
                showCreate ?
                    <TaskForm
                        onSubmit={createTaskFunc}
                        buttonLabel="Add"
                        setShowState={setShowCreate}
                    />
                    :
                    <button onClick={() => setShowCreate(true)}>+ Add</button>
            }
        </>

    )
}

export default TaskListWrapper