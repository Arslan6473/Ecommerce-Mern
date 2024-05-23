import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectAllOrders, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice';
import { ITEMS_PER_PAGE } from '../../../app/constant';
import Pagination from '../../common/pagination';
import Loader from '../../common/Loader';

import { selectCartStatus } from '../../cart/cartSlice';

function AdminOrders() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [editOrderId, setEditOrderId] = useState(null)
    const totalOrders = useSelector(selectTotalOrders)
    const status = useSelector(selectCartStatus)
    const orders = useSelector(selectAllOrders);

    const handlePage = (page) => {
        setPage(page)
    }

    const fetchOrders = useCallback(() => {
        const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync(pagination));
    }, [dispatch, page]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);


    const handleEdit = (e, order) => {
        setEditOrderId(order._id)
    }

    const handleSelect = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value }
        dispatch(updateOrderAsync(updatedOrder))
        setEditOrderId(-1)
    }

    const chooseColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-pink-500 text-pink-300"
                break;
            case "dispatched":
                return "bg-yellow-500 text-yellow-300"
                break;
            case "delievered":
                return "bg-green-500 text-green-300"
                break;
            case "cancelled":
                return "bg-red-500 text-red-300"
                break;
            default:
                return "bg-pink-500 text-pink-300"
                break;
        }
    }
    return (
        <>
            {status === "Loading" ? <div className="flex justify-center items-center"><Loader /></div> : orders && <div>
                <section className="relative">
                    <div className="w-full mb-12">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded bg-white text-gray-900"
                        >

                            <div className="block w-full overflow-x-auto ">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Order #no
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Order #id
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Items
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Price
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Payment Method
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Status
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Address
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-800 text-gray-300 border-gray-700">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order,index) => (
                                            <tr>
                                                 <td className="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    #{index+1}
                                                </td>
                                                <td className="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    #{order._id}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                                                    {order.products.map((product) => (
                                                        <div className='flex items-center'>
                                                            <img
                                                                src={product.product.thumbnail}
                                                                className="h-12 w-12 bg-white rounded-full border"
                                                                alt="..." />
                                                            <div className="ml-3 font-bold text-gray-900">
                                                                {product.product.title} - #{product.quantity}
                                                            </div></div>
                                                    ))}

                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    ${order.totalAmount}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    ${order.selectedPaymentMethod}
                                                </td>
                                                <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    {order._id === editOrderId ? <select value={order.status} onChange={(e) => handleSelect(e, order)}>
                                                        <option value="pending">Pending</option>
                                                        <option value="dispatched">Dispatched</option>
                                                        <option value="delievered">Delievered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select> : <div className={`${chooseColor(order.status)}  text-center rounded-md`}>{order.status}</div>
                                                    }



                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    <div>
                                                        <div><strong>{order.selectedAddress.fullname}</strong></div>
                                                        <div>{order.selectedAddress.email}</div>
                                                        <div>{order.selectedAddress.streetAddress}</div>
                                                        <div>{order.selectedAddress.city}</div>
                                                        <div>{order.selectedAddress.state}</div>
                                                        <div>{order.selectedAddress.phone}</div>
                                                        <div>{order.selectedAddress.zipCode}</div>
                                                    </div>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    <button
                                                        onClick={(e) => handleEdit(e, order)}
                                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </section>
                <Pagination
                    handlePage={handlePage}
                    page={page}
                    totalItems={totalOrders}
                />

            </div>}

        </>
    )
}

export default AdminOrders