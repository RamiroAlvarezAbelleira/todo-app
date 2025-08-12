import { Task } from "@/types/task.types";
import httpBaseApi from "../common/http.service";

class TasksService {
    createTask = async (data: object, token: string): Promise<Task> => {
        return httpBaseApi.httpPostPrivate("/tasks", data, token)
    }
    getTasksByTodoListId = async (listId: string, token: string): Promise<Task[]> => {
        return httpBaseApi.httpGetPrivate(`/tasks/${listId}`, token)
    }
    toggleCompleteTask = async (taskId: string, token: string): Promise<Task> => {
        return httpBaseApi.httpPutPrivate(`/tasks/toggle_complete/${taskId}`, token)
    }
    updateTask = async (taskId: string, data: object, token: string): Promise<Task> => {
        return httpBaseApi.httpPutPrivate(`/tasks/${taskId}`, token, data)
    }
    deleteTask = async (taskId: string, token: string): Promise<object> => {
        return httpBaseApi.httpDeletePrivate(`/tasks/${taskId}`, token)
    }
}

const taskService = new TasksService()

export default taskService