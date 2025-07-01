"use client"

import AddButton from "@/components/ui/Buttons/AddButton"
import BackArrow from "@/components/ui/Icons/BackArrow"
import TaskForm from "@/components/ui/Tasks/TaskForm/TaskForm"
import TaskList from "@/components/ui/Tasks/TaskList/TaskList"
import taskService from "@/services/tasks/tasks.service"
import { Task, TaskFormData } from "@/types/task.types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type TaskListWrapperProps = {
    todo_list_id: string,
    title: string
}

const TaskListWrapper = ({ todo_list_id, title }: TaskListWrapperProps) => {

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
        <section className="h-full flex flex-col">
            <div className="flex gap-x-2 mb-2">
                <button onClick={() => goBack()}>
                    <BackArrow />
                </button>
                <h1 className="font-bold text-2xl">{title}</h1>
            </div>
            <div className="flex flex-col items-start bg-gray-100 rounded-xl flex-1 overflow-y-scroll px-1.5 py-2">
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
                        <AddButton setShowState={setShowCreate} />
                }
            </div>
        </section>

    )
}

export default TaskListWrapper