"use client"
import { auth } from '@/lib/firebaseClient'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { useForm } from 'react-hook-form'

type LoginForm = {
    email: string,
    password: string
}
const Login = () => {
    const { register, handleSubmit } = useForm<LoginForm>()

    const onSubmit = async (data: LoginForm) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            console.log("logged in: ", userCredential.user)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder='Email' {...register("email")} />
                <input type="password" placeholder='password' {...register("password")} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login