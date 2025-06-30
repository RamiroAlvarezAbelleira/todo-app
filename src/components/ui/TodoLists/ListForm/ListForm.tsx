import { TodoListFormData } from "@/types/todo-list.types"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"


type ListFormProps = {
    onSubmit: (data: TodoListFormData) => void,
    buttonLabel: string,
    defaultValue?: string,
    setShowState: Dispatch<SetStateAction<boolean>>
}
const ListForm = ({ onSubmit, buttonLabel, defaultValue, setShowState }: ListFormProps) => {

    const onSubmitLocal = (data: TodoListFormData) => {
        onSubmit(data)
        resetField("title")
        resetField("description")
    }

    const { register, handleSubmit, resetField } = useForm<TodoListFormData>()

    return (
        <form onSubmit={handleSubmit(onSubmitLocal)} className="flex flex-col">
            <input
                className="bg-white border border-gray-300 px-2 rounded"
                type="text"
                id="listTitle"
                placeholder="Title"
                {...register("title")}
                defaultValue={defaultValue ?? ""}
            />
            <div className="hidden">
                <label htmlFor="listDescription">Description</label>
                <input
                    type="text"
                    id="listDescription"
                    {...register("description")}
                />
            </div>
            <div className="flex gap-x-2">
                <button type="submit" className="h-fit">{buttonLabel}</button>
                <button onClick={() => setShowState(false)}>Cancel</button>
            </div>
        </form>
    )
}

export default ListForm