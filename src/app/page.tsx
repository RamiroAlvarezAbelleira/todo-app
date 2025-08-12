import HomeListCard from "@/components/ui/TodoLists/HomeListCard/HomeListCard"
import todoListsService from "@/services/todo-lists/todo-lists.service"
import { TodoList } from "@/types/todo-list.types"
import { cookies } from "next/headers"
import Link from "next/link"
const Home = async () => {
    const cookieStore = await cookies()

    const token = cookieStore.get("auth_token")?.value ?? ""
    let todoLists: TodoList[] = []
    
    if (token) {
        todoLists = await todoListsService.getTodoLists(token)
    }

    return (
        <section className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col w-[40vw] items-start">
                <div className="flex flex-col items-center mb-8 w-full">
                    <h1 className="font-bold text-3xl">Welcome to Todo App</h1>
                    <p className="text-gray-700">Plan smarter, stay organized, and conquer your day — one task at a time.</p>
                </div>
                <div className="w-full px-4 py-2 rounded bg-gray-50">
                    <div className="flex w-full justify-between items-center">
                        <h3 className="font-semibold text-2xl pb-2">Lists preview</h3>
                        <button
                            className="flex items-center gap-x-1 px-2 mt-2 py-0.5 text-white bg-blue-400 rounded hover:bg-blue-500 transition-all duration-200">
                            <Link href="/todo-lists">Show All Lists</Link>
                        </button>
                    </div>
                    <div className="flex gap-x-2">
                        {
                            todoLists?.slice(0, 4).map(list => (
                                <HomeListCard key={list.id} title={list.title} listId={list.id} />
                            ))

                        }
                        <div className="flex items-center justify-center w-[200px] h-[100px] py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200">
                            <p>Create new list</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Home