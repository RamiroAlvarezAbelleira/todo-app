import todoListsService from "@/services/todo-lists/todo-lists.service"
import { Metadata } from "next"
import TaskListWrapper from "./TaskListWrapper"

type ListDetailProps = {
  params: Promise<{ listId: string }>
}

export const generateMetadata = async ({ params }: ListDetailProps): Promise<Metadata> => {
  const id = (await params).listId
  // Aca se puede hacer el fetch de el nombre de la lista para mostrarlo en el title
  return {
    title: `List ${id}`
  }
}

const listDetail = async ({ params }: ListDetailProps) => {
  const listId = (await params).listId

  const todoList = await todoListsService.getTodoListById(listId)
  return (
    <>
      <h1>{todoList.title}</h1>
      <h3>{todoList.description}</h3>
      <TaskListWrapper todo_list_id={listId} />
    </>
  )
}

export default listDetail