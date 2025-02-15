import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product/components/ProductList'
import Footer from '../features/common/Footer'


function Home() {
  
  return (
   <>
    <Navbar>
        <ProductList></ProductList>
    </Navbar>
    <Footer></Footer>
   </>
  )
}

export default Home