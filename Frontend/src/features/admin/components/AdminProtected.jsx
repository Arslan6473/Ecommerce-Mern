import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'
import { loggedInUserInfo } from '../../user/userSlice'

function AdminProtected({ children }) {
    const user = useSelector(loggedInUserInfo)


    {
        if (!user) return <Navigate to='/users/signin' replace={true}></Navigate>
        if (user && user.role !== "admin") return <Navigate to='/' replace={true}></Navigate>

        return children
    }

}

export default AdminProtected