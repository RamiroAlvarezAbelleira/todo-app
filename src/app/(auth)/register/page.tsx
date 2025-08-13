"use client"

import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseClient"
import userService from "@/services/users/users.service"
import Link from "next/link"

type RegisterForm = {
    email: string,
    username: string,
    password: string
}
const Register = () => {
    const { register, handleSubmit } = useForm<RegisterForm>()

    const onSubmit = async (data: RegisterForm) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user

            const res = await userService.createUser({ uid: user.uid, email: data.email, username: data.username })

            console.log("Response", res)
        } catch (error: any) {
            console.error(error.message)
        }
    }

    return (
        <div className='bg-gray-50 rounded px-4 py-2'>
            <h1 className='text-blue-400 font-semibold text-2xl mt-2'>Sign up</h1>
            <p className='text-gray-500 text-sm mt-2 mb-6'>
                Join us and start organizing your tasks today.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-6'>
                <input className='bg-white px-2 rounded border border-gray-200' type="email" placeholder='Email' {...register("email")} />
                <input className='bg-white px-2 rounded border border-gray-200' type="text" placeholder="Username" {...register("username")} />
                <input className='bg-white px-2 rounded border border-gray-200' type="password" placeholder='Password' {...register("password")} />
                <button type="submit" className='text-white bg-blue-400 rounded py-1'>Register</button>
            </form>
            <p className='text-sm text-gray-500 mt-2'>
                Already have an account?{" "}
                <Link href={"/login"} className='text-blue-600 hover:text-blue-400'>
                    Sign in
                </Link>
            </p>
        </div>
    )
}

export default Register