import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/cartSlice'
import { resetOrder } from '../features/order/orderSlice'
import { loggedInUserInfo } from '../features/user/userSlice'

function OrderSuccess() {
    const params = useParams()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(loggedInUserInfo)

    useEffect(() => {
        dispatch(resetCartAsync())
        dispatch(resetOrder())
    }, [dispatch, loggedInUser])
    return (
        <>
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className=" text-2xl font-semibold text-indigo-600">Your order id  # {params.id}</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Orderd Successfuly</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Thankyou for choosing us ..</p>
                    <p className="mt-6 text-base leading-7 text-gray-600">You can check your orders in My orders</p>


                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Continue Shopping
                        </Link>

                    </div>
                </div>
            </main>
        </>
    )
}

export default OrderSuccess