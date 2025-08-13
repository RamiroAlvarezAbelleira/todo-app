"use client"
import { auth } from '@/lib/firebaseClient'
import { signInWithEmailAndPassword } from '@firebase/auth'
import Link from 'next/link'
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
            console.log("logged in: ", userCredential.user.uid)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    return (
        <div className='bg-gray-50 rounded px-4 py-2'>
            <h1 className='text-blue-400 font-semibold text-2xl mt-2'>Sign in</h1>
            <p className='text-gray-500 text-sm mt-2 mb-6'>
                Welcome back! Let’s get your tasks done.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-6'>
                <input className='bg-white px-2 rounded border border-gray-200' type="email" placeholder='Email' {...register("email")} />
                <input className='bg-white px-2 rounded border border-gray-200' type="password" placeholder='Password' {...register("password")} />
                <button type="submit" className='text-white bg-blue-400 rounded py-1'>Sign in</button>
            </form>
            <p className='text-sm text-gray-500 mt-2'>
                Don't have an account?{" "}
                <Link href={"/register"} className='text-blue-600 hover:text-blue-400'>
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default Login