"use client"
import { auth } from '@/lib/firebaseClient'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { redirect } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
    user: User | null,
    token: string | null
    loading: boolean,
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    token: null,
    logout: async () => { }
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)

            if (firebaseUser) {
                console.log("entro")
                let newToken = await firebaseUser.getIdToken()
                setToken(newToken)
                await fetch("/api/set-token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token: newToken })
                })
                setLoading(false)
                redirect("/")
            } else {
                console.log(" no entro")
                setToken(null)
                await fetch("/api/logout", { method: "POST" })
                setLoading(false)
                redirect("/login")
            }
        })

        return () => unsubscribe()
    }, [])

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )

}