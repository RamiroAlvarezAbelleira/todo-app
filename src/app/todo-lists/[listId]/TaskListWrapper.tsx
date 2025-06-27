"use client"

import TaskForm from "@/components/ui/TaskForm/TaskForm"
import TaskList from "@/components/ui/TaskList/TaskList"
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
        <section>
            <div className="flex gap-x-2 mb-2">
                <button onClick={() => goBack()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        />
                        <path
                            d="M5 12l14 0"
                        />
                        <path
                            d="M5 12l6 6"
                        />
                        <path d="M5 12l6 -6"
                        />
                    </svg>
                </button>
                <h1 className="font-bold text-2xl">{title}</h1>
            </div>
            <div className="flex flex-col items-start bg-gray-100 rounded-xl w-[50%] px-4 py-2">
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
                        <button
                            className="flex items-center gap-x-1 px-2 mt-2 py-0.5 bg-white rounded hover:bg-gray-100 transition-all duration-200"
                            onClick={() => setShowCreate(true)}>
                            <span>Add</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </button>
                }
            </div>
        </section>

    )
}

export default TaskListWrapper