import MainLayout from '@/components/layouts/MainLayout/MainLayout'
import React from 'react'

type TodoListsLayoutProps = {
    children: React.ReactNode
}

const TodoListsLayout = ({ children }: TodoListsLayoutProps) => {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}

export default TodoListsLayout