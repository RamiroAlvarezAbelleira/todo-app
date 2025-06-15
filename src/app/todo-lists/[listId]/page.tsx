import todoListsService from "@/services/todo-lists/todo-lists.service"
import { Metadata } from "next"

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
      <h4>{todoList.description}</h4>
      <ul>
        {todoList?.tasks?.map(task => {
          return (
            <li key={`${task.title}-${task.id}`}>{task.title}</li>
          )
        })}
      </ul>
    </>
  )
}

export default listDetail