import httpBaseApi from "../common/http.service"

class TodoListsService {

    getTodoLists = async () => {
        return httpBaseApi.httpGet('/todo-lists')
    }

}

const todoListsService = new TodoListsService();

export default todoListsService;