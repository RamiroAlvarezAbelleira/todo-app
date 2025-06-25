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
    const [showCreate, setShowCreate] = useState(false)

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
            {
                showCreate ?
                    <div className="flex items-end gap-x-2">
                        <TaskForm
                            onSubmit={createTaskFunc}
                            buttonLabel="Add"
                        />
                        <button onClick={() => setShowCreate(false)}>Cancel</button>
                    </div>
                    :
                    <button onClick={() => setShowCreate(true)}>+ Add</button>
            }
        </>

    )
}

export default TaskListWrapper