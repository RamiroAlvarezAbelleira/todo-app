import TodoListsList from "@/components/ui/TodoLists/TodoListsList/TodoListsList"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import React from "react"

type MainLayoutProps = {
    children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {

    const todoLists = await todoListsService.getTodoLists()
    return (
        <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,300px)_minmax(220px,300px)] gap-x-4 w-full h-full">
            <nav className="py-3 px-2 bg-gray-100 h-full rounded-tr-xl rounded-br-xl h-full overflow-y-auto scroll-container">
                <h3 className="text-xl font-bold mb-2">Todo Lists</h3>
                <TodoListsList todoLists={todoLists} />
            </nav>
            <section className="h-full overflow-y-auto">
                {children}
            </section>
        </div>
    )
}

export default MainLayout