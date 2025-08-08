"use client"

import { useForm } from "react-hook-form"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebaseClient"
import userService from "@/services/users/users.service"

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
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder='Email' {...register("email")} />
                <input type="text" placeholder="Username" {...register("username")} />
                <input type="password" placeholder='password' {...register("password")} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register