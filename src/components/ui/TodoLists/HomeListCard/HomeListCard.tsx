
type HomeListCardProps = {
    listId?: string,
    title: string
}

const HomeListCard = ({ listId, title }: HomeListCardProps) => {
    
    return (
        <div className="w-[200px] h-[100px] py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200">
            <p>{title}</p>
        </div>
    )
}

export default HomeListCard