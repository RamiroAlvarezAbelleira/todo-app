import todoListsService from "@/services/todo-lists/todo-lists.service"
import { Metadata } from "next"
import TaskListWrapper from "./TaskListWrapper"
import { cookies } from "next/headers"
type ListDetailProps = {
  params: Promise<{ listId: string }>
}

export const generateMetadata = async ({ params }: ListDetailProps): Promise<Metadata> => {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value
  const id = (await params).listId

  const todoList = await todoListsService.getTodoListById(id, token ?? "")
  // Aca se puede hacer el fetch de el nombre de la lista para mostrarlo en el title
  return {
    title: `List ${todoList.title}`
  }
}

const listDetail = async ({ params }: ListDetailProps) => {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value ?? ""
  const listId = (await params).listId

  const todoList = await todoListsService.getTodoListById(listId, token ?? "")
  return (
    <div className="h-full">
      <TaskListWrapper todo_list_id={listId} title={todoList.title} token={token} />
    </div>
  )
}

export default listDetail