import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductForm from '../features/admin/components/ProductForm'

function EditProductPage() {
  return (
    <>
     <Navbar>
       <ProductForm></ProductForm>
    </Navbar>
    </>
  )
}

export default EditProductPage