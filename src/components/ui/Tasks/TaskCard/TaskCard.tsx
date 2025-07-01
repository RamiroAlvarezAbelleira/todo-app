"use client"

import taskService from "@/services/tasks/tasks.service"
import { Task, TaskFormData } from "@/types/task.types"
import { useState } from "react"
import TaskForm from "../TaskForm/TaskForm"
import Check from "../../Icons/Check"
import Delete from "../../Icons/Delete"
import Edit from "../../Icons/Edit"

type TaskCardProps = {
    task: Task
    toggleCompleteTask: (newTask: Task) => void,
    updateTaskList: (taskId: string, newTask?: Task) => void
}

const TaskCard = ({ toggleCompleteTask, updateTaskList, task }: TaskCardProps) => {
    const [showUpdate, setShowUpdate] = useState(false)

    const completeStyle = "bg-green-500 border-gray-200 group hover:border-white hover:bg-green-400"
    const incompleteStyle = "bg-transparent border-gray-200 hover:border-gray-300"

    const updateTask = async (data: TaskFormData) => {
        const res = await taskService.updateTask(task.id, data)
        setShowUpdate(false)
        updateTaskList(task.id, res)
    }

    const deleteTask = async (taskId: string) => {
        await taskService.deleteTask(taskId)
        setShowUpdate(false)
        updateTaskList(taskId)
    }

    return (
        <li className="flex items-center w-full">
            <button
                onClick={() => toggleCompleteTask(task)}
                className={`flex items-center justify-center mr-1 rounded-full w-[20px] h-[20px] border border-[2px] ${task.completed ? completeStyle : incompleteStyle}`}
            >
                {task.completed &&
                    <Check className="text-gray-200 group-hover:text-white" w="80%" h="80%" />
                }
            </button>
            {
                showUpdate ?
                    <div className="flex min-w-0 flex-1 py-[5px] bg-gray-200 rounded items-center w-full">
                        <TaskForm
                            buttonLabel="Update"
                            onSubmit={updateTask}
                            defaultValue={task.title}
                            setShowState={setShowUpdate}
                        />
                    </div>
                    :
                    <div className="flex items-center justify-between min-w-0 flex-1 px-2 py-1 rounded gap-x-2 group hover:bg-white transition-all duration-300">
                        <p className="cursor-pointer capitalize py-0.5 font-semibold truncate flex-1 transition-all duration-300">{task.title}</p>
                        <div className="hidden group-hover:flex gap-x-2">
                            <button onClick={() => setShowUpdate(true)}
                                className="p-0.5 bg-white rounded hover:bg-gray-100">
                                <Edit />
                            </button>

                            <button onClick={() => deleteTask(task.id)}
                                className="p-0.5 bg-white rounded hover:bg-gray-100">
                                <Delete className="text-red-600" />
                            </button>
                        </div>
                    </div>
            }
        </li>
    )
}

export default TaskCard