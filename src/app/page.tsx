import Link from "next/link"

const Home = () => {
    return (
        <section className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl">Bienvenido a Todo App</h1>
                <p>Aca vas a poder crear todas las listas de tareas que quieras!</p>
                <button
                    className="flex items-center gap-x-1 px-2 mt-2 py-0.5 bg-white rounded hover:bg-gray-100 transition-all duration-200">
                    <Link href="/todo-lists">Ver listas</Link>
                </button>
            </div>
        </section>
    )
}

export default Home