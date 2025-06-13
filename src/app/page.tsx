import Link from "next/link"

const Home = () => {
    return (
        <>
            <h1>Welcome home!</h1>
            <ul>
                <li><Link href="/create-list">Create a new list</Link></li>
                <li><Link href="/todo-lists">Todo lists</Link></li>
            </ul>
        </>

    )
}

export default Home