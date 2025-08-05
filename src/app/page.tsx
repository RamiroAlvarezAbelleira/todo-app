import Link from "next/link"
const lists = [
    { title: "Lista" },
    { title: "ejemplo" },
    { title: "otra" },
]
const Home = () => {
    return (
        <section className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl">Bienvenido a Todo App</h1>
                <p>Aca vas a poder crear todas las listas de tareas que quieras!</p>
                <button
                    className="flex items-center gap-x-1 px-2 mt-2 py-0.5 text-white bg-blue-400 rounded hover:bg-blue-500 transition-all duration-200">
                    <Link href="/todo-lists">Ver todas mis listas</Link>
                </button>
            </div>
            <div className="flex gap-x-2">
                {
                    lists.map(list => (
                        <div className="w-[200px] h-[100px] py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200">
                            <p>{list.title}</p>
                        </div>
                    ))

                }
                <div className="flex items-center justify-center w-[200px] h-[100px] py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-200">
                    <p>Crear +</p>
                </div>
            </div>
        </section>
    )
}

export default Home