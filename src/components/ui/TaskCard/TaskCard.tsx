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
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="80%"
                        height="80%"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-check text-gray-300 group-hover:text-white"
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
                        <p className="cursor-pointer capitalize py-0.5 font-semibold">{task.title}</p>
                        <div className="hidden group-hover:flex gap-x-2">
                            {/* Edit */}
                            <button onClick={() => setShowUpdate(true)}
                                className="hidden group-hover:flex p-0.5 bg-white rounded hover:bg-gray-100">
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
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-pencil">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                                    <path d="M13.5 6.5l4 4" />
                                </svg>
                            </button>
                            {/* Delete */}
                            <button onClick={() => deleteTask(task.id)}
                                className="hidden group-hover:flex p-0.5 bg-white rounded hover:bg-gray-100">
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
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-trash text-red-600">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 7l16 0" />
                                    <path d="M10 11l0 6" />
                                    <path d="M14 11l0 6" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                </svg>
                            </button>
                        </div>
                    </div>
            }
        </li>
    )
}

export default TaskCard