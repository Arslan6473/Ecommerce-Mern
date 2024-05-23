import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders'

function UserOrdersPage() {
    return (
        <>
            <Navbar>
                <UserOrders></UserOrders>
            </Navbar>
        </>
    )
}

export default UserOrdersPage