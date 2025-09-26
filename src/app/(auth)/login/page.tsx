"use client"
import { auth } from '@/lib/firebaseClient'
import { loginScheme } from '@/schemes/login.scheme'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { Span } from 'next/dist/trace'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type LoginForm = {
    email: string,
    password: string
}
const Login = () => {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: yupResolver(loginScheme)
    })

    const onSubmit = async (data: LoginForm) => {
        setLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            console.log("logged in: ", userCredential.user.uid)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
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
                <div className='w-full relative flex flex-col'>
                    <input className={`bg-white px-2 rounded border border-gray-200 ${errors.email && "border-red-500"}`} type="email" placeholder='Email' {...register("email")} />
                    {errors.email && <span className='text-red-500 my-0 text-sm absolute bottom-[-22px] pl-1'>{errors.email.message}</span>}
                </div>
                <div className='w-full relative flex flex-col'>
                    <input className={`bg-white px-2 rounded border border-gray-200 ${errors.password && "border-red-500"}`} type="password" placeholder='Password' {...register("password")} />
                    {errors.password && <span className='text-red-500 my-0 text-sm absolute bottom-[-22px] pl-1'>{errors.password.message}</span>}
                </div>
                <button type="submit" className='text-white bg-blue-400 rounded py-1' disabled={loading}>{loading ? "Loading..." : "Sign in"}</button>
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