
export const metadata = {
    title: "Your lists"
}

const todoLists = async () => {
    return (
        <section className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl">Bienvenido a Todo App</h1>
                <p>Aca vas a poder crear todas las listas de tareas que quieras!</p>
            </div>
        </section>
    )
}

export default todoLists