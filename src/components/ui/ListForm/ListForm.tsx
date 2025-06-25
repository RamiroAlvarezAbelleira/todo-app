import { TodoListFormData } from "@/types/todo-list.types"
import { useForm } from "react-hook-form"


type ListFormProps = {
    onSubmit: (data: TodoListFormData) => void,
    buttonLabel: string,
    defaultValue?: string
}
const ListForm = ({ onSubmit, buttonLabel, defaultValue }: ListFormProps) => {

    const onSubmitLocal = (data: TodoListFormData) => {
        onSubmit(data)
        resetField("title")
        resetField("description")
    }

    const { register, handleSubmit, resetField } = useForm<TodoListFormData>()

    return (
        <form onSubmit={handleSubmit(onSubmitLocal)} className="flex items-end gap-x-[5px]">
            <div className="flex flex-col">
                <label htmlFor="listTitle">Title</label>
                <input
                    type="text"
                    id="listTitle"
                    {...register("title")}
                    defaultValue={defaultValue ?? ""}
                />
            </div>
            <div className="hidden">
                <label htmlFor="listDescription">Description</label>
                <input
                    type="text"
                    id="listDescription"
                    {...register("description")}
                />
            </div>
            <button type="submit" className="h-fit">{buttonLabel}</button>
        </form>
    )
}

export default ListForm