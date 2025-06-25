import TodoListsList from "@/components/ui/TodoListsList/TodoListsList"
import todoListsService from "@/services/todo-lists/todo-lists.service"

export const metadata = {
    title: "Your lists"
}

const todoLists = async () => {

    const todoLists = await todoListsService.getTodoLists()

    return (
        <section className="py-3 px-2 my-2 bg-gray-100 w-[18vw] h-[80vh] rounded-tr-xl rounded-br-xl">
            <h3 className="text-xl font-bold mb-2">Todo Lists</h3>
            <TodoListsList todoLists={todoLists} />
        </section>
    )
}

export default todoLists