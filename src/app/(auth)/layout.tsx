

type AuthLayoutType = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutType) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout