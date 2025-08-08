import { TodoList } from "@/types/todo-list.types"
import httpBaseApi from "../common/http.service"

class TodoListsService {

    getTodoLists = async (token: string): Promise<TodoList[]> => {
        return httpBaseApi.httpGetPrivate('/todo-lists', token)
    }

    getTodoListById = async (id: string): Promise<TodoList> => {
        return httpBaseApi.httpGet(`/todo-lists/${id}`)
    }

    createList = async (data: object, token: string): Promise<TodoList> => {
        return httpBaseApi.httpPostPrivate("/todo-lists", data, token)
    }

    updateList = async (id: string, data: object): Promise<TodoList> => {
        return httpBaseApi.httpPut(`/todo-lists/${id}`, data)
    }

    deleteList = async (id: string): Promise<object> => {
        return httpBaseApi.httpDelete(`/todo-lists/${id}`)
    }

}

const todoListsService = new TodoListsService();

export default todoListsService;