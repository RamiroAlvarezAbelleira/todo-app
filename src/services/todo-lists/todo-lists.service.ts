import { TodoList } from "@/types/todo-list.types"
import httpBaseApi from "../common/http.service"

class TodoListsService {

    getTodoLists = async (token: string): Promise<TodoList[]> => {
        return httpBaseApi.httpGetPrivate('/todo-lists', token)
    }

    getTodoListById = async (id: string, token:string): Promise<TodoList> => {
        return httpBaseApi.httpGetPrivate(`/todo-lists/${id}`, token)
    }

    createList = async (data: object, token: string): Promise<TodoList> => {
        return httpBaseApi.httpPostPrivate("/todo-lists", data, token)
    }

    updateList = async (id: string, token: string, data: object): Promise<TodoList> => {
        return httpBaseApi.httpPutPrivate(`/todo-lists/${id}`, token, data)
    }

    deleteList = async (id: string, token: string): Promise<object> => {
        return httpBaseApi.httpDeletePrivate(`/todo-lists/${id}`, token)
    }

}

const todoListsService = new TodoListsService();

export default todoListsService;