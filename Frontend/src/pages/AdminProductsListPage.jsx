import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductsList from '../features/admin/components/AdminProductsList'

function AdminProductsListPage() {
  return (
    <>
     <Navbar>
       <AdminProductsList></AdminProductsList>
    </Navbar>
    </>
  )
}

export default AdminProductsListPage