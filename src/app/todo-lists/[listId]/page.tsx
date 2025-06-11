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
  return (
    <h1>List {listId} Details</h1>
  )
}

export default listDetail