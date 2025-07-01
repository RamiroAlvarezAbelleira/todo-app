import TodoListsList from "@/components/ui/TodoLists/TodoListsList/TodoListsList"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import React from "react"

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {

    const todoLists = await todoListsService.getTodoLists()
    return (
        <div className="flex w-full h-full">
            <nav className="py-3 px-2 bg-gray-100 max-w-[22vw] min-w-[22vw] h-full rounded-tr-xl rounded-br-xl">
                <h3 className="text-xl font-bold mb-2">Todo Lists</h3>
                <TodoListsList todoLists={todoLists} />
            </nav>
            <main className="w-full h-full px-4 py-2">
                {children}
            </main>
        </div>
    )
}

export default MainLayout