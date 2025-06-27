"use client"

import { useState } from "react"
import TaskForm from "../TaskForm/TaskForm"
import { Task, TaskFormData } from "@/types/task.types"
import taskService from "@/services/tasks/tasks.service"

type TaskCardProps = {
    task: Task
    toggleCompleteTask: (newTask: Task) => void,
    updateTaskList: (taskId: string, newTask?: Task) => void
}

const TaskCard = ({ toggleCompleteTask, updateTaskList, task }: TaskCardProps) => {
    const [showUpdate, setShowUpdate] = useState(false)

    const completeStyle = "bg-[#32CD32] border-[#ffffffdd]"
    const incompleteStyle = "bg-transparent border-[#aaaaaa44]"

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
                className={`mr-1 rounded-full w-[20px] h-[20px] border border-[2px] ${task.completed ? completeStyle : incompleteStyle}`}
            >
                {task.completed &&
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-check text-gray-100"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        />
                        <path
                            d="M5 12l5 5l10 -10"
                        />
                    </svg>
                }
            </button>
            {
                showUpdate ?
                    <div className="flex items-end gap-x-2">
                        <TaskForm
                            buttonLabel="Update"
                            onSubmit={updateTask}
                            defaultValue={task.title}
                            setShowState={setShowUpdate}
                        />
                    </div>
                    :
                    <div className="flex items-center justify-between w-full px-2 py-1 rounded gap-x-2 group hover:bg-white transition-all duration-300">
                        <p className="cursor-pointer py-0.5">{task.title}</p>
                        <div className="hidden group-hover:flex gap-x-2">
                            <button onClick={() => setShowUpdate(true)}
                                className="hidden group-hover:flex px-2 py-0.5 bg-white rounded hover:bg-gray-100">
                                Edit
                            </button>
                            <button onClick={() => deleteTask(task.id)}
                                className="hidden group-hover:flex px-2 py-0.5 bg-white rounded hover:bg-gray-100">
                                Delete
                            </button>
                        </div>
                    </div>
            }
        </li>
    )
}

export default TaskCard