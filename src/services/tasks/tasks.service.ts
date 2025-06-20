import { Task } from "@/types/task.types";
import httpBaseApi from "../common/http.service";

class TasksService {
    createTask = async (data: object): Promise<Task> => {
        return httpBaseApi.httpPost("/tasks", data)
    }
    getTasksByTodoListId = async (listId: string): Promise<Task[]> => {
        return httpBaseApi.httpGet(`/tasks/${listId}`)
    }
    toggleCompleteTask = async (taskId: string): Promise<Task> => {
        return httpBaseApi.httpPut(`/tasks/toggle_complete/${taskId}`)
    }
}

const taskService = new TasksService()

export default taskService