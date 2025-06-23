type TaskCardProps = {
    title: string,
    id: string,
    completed: boolean,
    onClick: (id: string) => void
}
const TaskCard = ({ title, id, completed, onClick }: TaskCardProps) => {

    const completeStyle = "bg-[#32CD32] border-[#ffffffdd]"
    const incompleteStyle = "bg-transparent border-[#aaaaaa44]"

    return (
        <li className="flex items-center gap-x-[8px]">
            <button
                onClick={() => onClick(id)}
                className={`p-[0px] rounded-full w-[20px] h-[20px] border border-[2px] ${completed ? completeStyle : incompleteStyle}`}
            ></button>
            <p className={`${completed ? "text-[#32CD32]" : "text-[#FFD700]"} m-[0px] font-[700]`}>{title}</p>
        </li>
    )
}

export default TaskCard