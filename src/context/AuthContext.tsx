"use client"
import { auth } from '@/lib/firebaseClient'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
    user: User | null
    loading: boolean,
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { }
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser),
                setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}