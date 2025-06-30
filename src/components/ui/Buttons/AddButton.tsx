import { Dispatch, SetStateAction } from "react"
import Plus from "../Icons/Plus"


type AddButtonProps = {
    setShowState: Dispatch<SetStateAction<boolean>>
}
const AddButton = ({ setShowState }: AddButtonProps) => {
    return (
        <button
            className="flex items-center gap-x-1 px-2 mt-2 py-0.5 bg-white rounded hover:bg-gray-100 transition-all duration-200"
            onClick={() => setShowState(true)}>
            <span>Add</span>
            <Plus w="18" h="18" />
        </button>
    )
}

export default AddButton