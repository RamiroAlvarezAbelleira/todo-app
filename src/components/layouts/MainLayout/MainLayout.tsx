import TodoListsList from "@/components/ui/TodoListsList/TodoListsList"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import React from "react"

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {

    const todoLists = await todoListsService.getTodoLists()
    return (
        <div className="flex w-full">
            <nav className="py-3 px-2 bg-gray-200 w-[18vw] h-[80vh] rounded-tr-xl rounded-br-xl">
                <h3 className="text-xl font-bold mb-2">Todo Lists</h3>
                <TodoListsList todoLists={todoLists} />
            </nav>
            <main className="w-full px-4 py-2">
                {children}
            </main>
        </div>
    )
}

export default MainLayout