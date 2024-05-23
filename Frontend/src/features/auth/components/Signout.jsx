import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, logoutUserAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

function Signout() {
    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)
    useEffect(()=>{
    dispatch(logoutUserAsync())
    },)
    
  return (
    <>
       {!user && <Navigate to='/users/signin' replace={true}></Navigate>}
    </>
  )
}

export default Signout