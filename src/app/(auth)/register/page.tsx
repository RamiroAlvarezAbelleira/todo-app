"use client"

import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseClient"

type RegisterForm = {
    email: string,
    password: string
}
const Register = () => {
    const { register, handleSubmit } = useForm<RegisterForm>()

    const onSubmit = async (data: RegisterForm) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            console.log("registered user: ", userCredential.user)

        } catch (error: any) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder='Email' {...register("email")} />
                <input type="password" placeholder='password' {...register("password")} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register