"use client"

import { useState } from "react"
import TaskForm from "../TaskForm/TaskForm"
import { Task, TaskFormData } from "@/types/task.types"
import taskService from "@/services/tasks/tasks.service"

type TaskCardProps = {
    task: Task
    title: string,
    id: string,
    completed: boolean,
    toggleCompleteTask: (newTask: Task) => void,
    updateTaskList: (newTask: Task) => void
}

const TaskCard = ({ title, id, completed, toggleCompleteTask, updateTaskList, task }: TaskCardProps) => {
    const [showUpdate, setShowUpdate] = useState(false)

    const completeStyle = "bg-[#32CD32] border-[#ffffffdd]"
    const incompleteStyle = "bg-transparent border-[#aaaaaa44]"

    const updateTask = async (data: TaskFormData) => {
        const res = await taskService.updateTask(task.id, data)
        setShowUpdate(false)
        updateTaskList(res)
    }

    return (
        <li className="flex items-center gap-x-[8px]">
            <button
                onClick={() => toggleCompleteTask(task)}
                className={`p-[0px] rounded-full w-[20px] h-[20px] border border-[2px] ${task.completed ? completeStyle : incompleteStyle}`}
            ></button>
            {
                showUpdate ?
                    <>
                        <TaskForm
                            buttonLabel="Update"
                            onSubmit={updateTask}
                        />
                        <button onClick={() => setShowUpdate(false)}>Close</button>
                    </>
                    :

                    <button className={`m-[0px] font-[700]`} onClick={() => setShowUpdate(true)}>{task.title}</button>
            }
        </li>
    )
}

export default TaskCard