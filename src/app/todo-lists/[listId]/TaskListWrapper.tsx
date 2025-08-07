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
        <section className="flex flex-col items-center">
            <div className="flex gap-x-2 mb-2 self-start">
                <button onClick={() => goBack()}>
                    <BackArrow />
                </button>
                <h1 className="font-bold text-2xl">{title}</h1>
            </div>
            <div className="flex mt-8 w-[50%] flex-col items-start justify-start bg-gray-100 rounded-xl flex-1 overflow-y-auto scroll-container p-4">
                <TaskList
                    tasks={tasks}
                    setTasks={setTasks}
                />
                {
                    showCreate ?
                        <div className="w-full py-2">
                            <TaskForm
                                onSubmit={createTaskFunc}
                                buttonLabel="Add"
                                setShowState={setShowCreate}
                            />
                        </div>
                        :
                        <div className="w-full flex justify-center">
                            <AddButton setShowState={setShowCreate} />
                        </div>
                }
            </div>
        </section>

    )
}

export default TaskListWrapper