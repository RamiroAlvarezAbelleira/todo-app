"use client"

import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseClient"
import userService from "@/services/users/users.service"
import Link from "next/link"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerScheme } from "@/schemes/register.scheme"

type RegisterForm = {
    email: string,
    username: string,
    password: string,
    confirmPassword: string
}
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: yupResolver(registerScheme)
    })
    const [loading, setLoading] = useState(false)
    const [authError, setAuthError] = useState<string | null>(null)

    const onSubmit = async (data: RegisterForm) => {
        setLoading(true)
        setAuthError(null)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user

            const res = await userService.createUser({ uid: user.uid, email: data.email, username: data.username })

            console.log("Response", res)
        } catch (error: any) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    setAuthError("Email already in use.")
                    break
                default:
                    setAuthError("An error occurred while signing up.")
                    break
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-gray-50 rounded px-4 py-2'>
            <h1 className='text-blue-400 font-semibold text-2xl mt-2'>Sign up</h1>
            <p className='text-gray-500 text-sm mt-2 mb-6'>
                Join us and start organizing your tasks today.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-6'>
                <div className='w-full relative flex flex-col'>
                    <input className={`bg-white px-2 rounded border border-gray-200 ${(errors.email || authError) && "border-red-500 focus:outline-red-500"}`}
                        type="email"
                        placeholder='Email'
                        {...register("email")} />
                    {errors.email && <span className='text-red-500 my-0 text-sm absolute bottom-[-22px] pl-1'>{errors.email.message}</span>}
                </div>
                <div className='w-full relative flex flex-col'>
                    <input className={`bg-white px-2 rounded border border-gray-200 ${(errors.username || authError) && "border-red-500 focus:outline-red-500"}`}
                        type="text"
                        placeholder='Username'
                        {...register("username")} />
                    {errors.username && <span className='text-red-500 my-0 text-sm absolute bottom-[-22px] pl-1'>{errors.username.message}</span>}
                </div>
                <div className='w-full relative flex flex-col'>
                    <input className={`bg-white px-2 rounded border border-gray-200 ${(errors.password || authError) && "border-red-500 focus:outline-red-500"}`}
                        type="password"
                        placeholder='Password'
                        {...register("password")} />
                    {errors.password && <span className='text-red-500 my-0 text-sm absolute bottom-[-22px] pl-1'>{errors.password.message}</span>}
                </div>
                <div className='w-full relative flex flex-col'>
                    <input className={`bg-white px-2 rounded border border-gray-200 ${(errors.confirmPassword || authError) && "border-red-500 focus:outline-red-500"}`}
                        type="password"
                        placeholder='Confirm your password'
                        {...register("confirmPassword")} />
                    {errors.confirmPassword && <span className='text-red-500 my-0 text-sm absolute bottom-[-22px] pl-1'>{errors.confirmPassword.message}</span>}
                </div>
                {authError && <p className='text-red-500 text-sm text-center'>{authError}</p>}
                <button type="submit" className='text-white bg-blue-400 rounded py-1' disabled={loading}>{loading ? "Loading..." : "Register"}</button>
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