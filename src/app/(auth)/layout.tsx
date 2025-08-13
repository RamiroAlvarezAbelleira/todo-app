

type AuthLayoutType = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutType) => {
    return (
        <section className="flex h-full justify-center items-center">
            {children}
        </section>
    )
}

export default AuthLayout