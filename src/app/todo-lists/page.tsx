
export const metadata = {
    title: "Your lists"
}

const todoLists = async () => {
    return (
        <section className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center">
                <h1 className="font-bold text-3xl">Welcome to Todo App</h1>
                <p className="text-gray-700">Plan smarter, stay organized, and conquer your day — one task at a time.</p>
            </div>
        </section>
    )
}

export default todoLists