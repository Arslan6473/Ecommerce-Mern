import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUserOrdersAsync, loggedInUserInfo, loggedInUserOrdersStatus, selecetLoggedInUserAllOrders } from '../userSlice'
import { productPrice } from '../../../app/constant'
import Loader from '../../common/Loader'



function UserOrders() {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(loggedInUserInfo)
    const status = useSelector(loggedInUserOrdersStatus)

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync())
    }, [loggedInUser])

    const orders = useSelector(selecetLoggedInUserAllOrders)

    if (!orders.length) return <> <div className='text-2xl font-medium'>You have not buy anything yet</div></>
    return (
        <>

            {status === "Loading" ? <div className="flex justify-center items-center"><Loader /></div> :
                <div>
                    <div>
                        <h2 className=' px-6 text-4xl p-1 font-semibold'>
                            List of your orders
                        </h2>
                    </div>
                    {
                        orders.map((order) => (
                            <div className='shadow-lg p-4 mb-6'>
                                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-6'>

                                    <h3 className='text-2xl p-1 pt-3 pb-0 font-semibold'>
                                        Order # {order._id}
                                    </h3>
                                    <h4 className='text-xl text-red-500 p-1 pt-3 pb-0 font-semibold'>
                                        order status is : {order.status}
                                    </h4>
                                    <div className="mt-2 ">
                                        <div className="flow-root">
                                            <ul role="list" className=" divide-y divide-gray-200">
                                                {order.products.map((product) => (
                                                    <li key={product._id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={product.product.thumbnail}
                                                                alt={product.product.thumbnail}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <p>{product.product.title}</p>
                                                                    </h3>
                                                                    <p className="ml-4">
                                                                        $
                                                                        {productPrice(product.product)}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div>
                                                                    <p className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                                                        Qty : {product.quantity}
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-2 sm:px-6">
                                        <div className="flex justify-between my-1 text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>$ {order.totalAmount}</p>
                                        </div>
                                        <div className="flex justify-between my-1 text-base font-medium text-gray-900">
                                            <p>Total items in order</p>
                                            <p>{order.totalItems} items</p>
                                        </div>
                                        <div className="flex justify-between my-1 text-base font-medium text-gray-900">
                                            <p>Payment Method</p>
                                            <p>{order.selectedPaymentMethod}</p>
                                        </div>
                                    </div>
                                    <p className='font-medium leading-6 text-gray-900 py-2'>
                                        Your Address
                                    </p>
                                    <div>
                                        <div className="p-3 flex  rounded-md justify-between gap-x-6 py-2 border-2 border-gray-400">
                                            <div id='address' className='flex justify-between gap-x-6 py-2 w-[95%]'>
                                                <div className="flex min-w-0 gap-x-4 ">
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.streetAddress}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.fullname}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">Phone : {order.selectedAddress.phone}</p>
                                                    <p className="text-sm leading-6 text-gray-900">Zip : {order.selectedAddress.zipCode}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }


        </>
    )
}


export default UserOrders