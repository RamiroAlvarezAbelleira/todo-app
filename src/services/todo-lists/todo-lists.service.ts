import { TodoList } from "@/types/todo-list.types"
import httpBaseApi from "../common/http.service"

class TodoListsService {

    getTodoLists = async (): Promise<TodoList[]> => {
        return httpBaseApi.httpGet('/todo-lists')
    }

    getTodoListById = async (id: string): Promise<TodoList> => {
        return httpBaseApi.httpGet(`/todo-lists/${id}`)
    }

    createList = async (data: object): Promise<TodoList> => {
        return httpBaseApi.httpPost("/todo-lists", data)
    }

}

const todoListsService = new TodoListsService();

export default todoListsService;