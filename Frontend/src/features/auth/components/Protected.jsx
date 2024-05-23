import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

function Protected({ children }) {
    const user = useSelector(getCurrentUser)


    {
        if (!user) return <Navigate to='/users/signin' replace={true}></Navigate>
        return children
    }

}

export default Protected