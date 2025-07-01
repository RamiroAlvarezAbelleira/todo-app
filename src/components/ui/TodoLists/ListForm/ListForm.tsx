import { TodoListFormData } from "@/types/todo-list.types"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import Check from "../../Icons/Check"
import Cross from "../../Icons/Cross"


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
        <form onSubmit={handleSubmit(onSubmitLocal)} className="flex flex-1 min-w-0 px-2 items-center justify-between gap-x-2">
            <input
                className="flex flex-1 min-w-0 bg-white border border-gray-300 px-2 rounded"
                type="text"
                id="listTitle"
                placeholder="Title..."
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
                <button type="submit" className="p-0.5 bg-gray-200 rounded group hover:bg-gray-100">
                    <Check className="text-green-600 group-hover:text-green-500" />
                </button>
                <button onClick={() => setShowState(false)} className="p-0.5 bg-gray-200 rounded group hover:bg-gray-100">
                    <Cross className="text-red-600 group-hover:text-red-500" />
                </button>
            </div>
        </form>
    )
}

export default ListForm