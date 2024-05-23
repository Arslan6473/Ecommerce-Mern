import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { deleteCartItemAsync, selectAllCartItems, updateCartAsync } from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice'
import { loggedInUserInfo, updateLoggedInUserAsync } from '../features/user/userSlice';
import { productPrice } from '../app/constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Checkout() {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const dispatch = useDispatch()
    const products = useSelector(selectAllCartItems)
    const totalAmount = products.reduce((amount, item) => productPrice(item.product) * item.quantity + amount, 0)
    const totalItems = products.reduce((total, item) => item.quantity + total, 0)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const loggedInUser = useSelector(loggedInUserInfo)
    const orderdPlaced = useSelector(selectCurrentOrder)
    const handleQunatity = (e, updatedItem) => {
        dispatch(updateCartAsync({ id: updatedItem._id, quantity: +e.target.value }))
    }
    const handleRemove = (e, id) => {
        dispatch(deleteCartItemAsync(id))
    }
    const handleAddress = (e, index) => {
        setSelectedAddress(loggedInUser.addresses[index])
    }
    const notifyAddedAddress = () => toast.success("Address added successfully", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });
    const onSubmit = (data) => {
        const updatedUser = { ...loggedInUser, addresses: [...loggedInUser.addresses, data] };
        dispatch(updateLoggedInUserAsync(updatedUser))
        reset()
        notifyAddedAddress()

    }

    const notify = () => toast.error("Address and Payment method should be selected", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });
    const handleOrder = () => {
        if (selectedAddress && selectedPaymentMethod) {
            dispatch(createOrderAsync(
                {
                    products: [...products],
                    user: loggedInUser._id,
                    totalAmount,
                    totalItems,
                    status: "pending",
                    selectedAddress,
                    selectedPaymentMethod
                }))
        } else {
            notify()
        }

    }
    return (
        <>
            {!products.length && <Navigate to='/' replace={true}></Navigate>}
            {orderdPlaced && <Navigate to={`/order-success/${orderdPlaced._id}`} replace={true}></Navigate>}
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-5">
                    <div className='lg:col-span-3 bg-gray-100 py-5 px-3 my-6'>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive your order.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("fullname", { required: "Full name is required" })}
                                                    id="fullname"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.fullname && <p className='text-red-500'>{errors.fullname.message}</p>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register("phone", { required: "Phone is required" })}
                                                    id="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}

                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register("email", { required: "Email is required" })}
                                                    type="email"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

                                            </div>
                                        </div>



                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("streetAddress", { required: "Street Address is required" })}
                                                    id="streetAddress"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.streetAddress && <p className='text-red-500'>{errors.streetAddress.message}</p>}

                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("city", { required: "City is required" })}
                                                    id="city"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.city && <p className='text-red-500'>{errors.city.message}</p>}

                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("state", { required: "State / Province is required" })}
                                                    id="state"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.state && <p className='text-red-500'>{errors.state.message}</p>}

                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("zipCode", { required: "ZIP / Postal code is required" })}
                                                    id="zipCode"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.zipCode && <p className='text-red-500'>{errors.zipCode.message}</p>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">

                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>

                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from the existing addresses.
                                    </p>
                                    <ul role="list">
                                        {loggedInUser.addresses.map((address, index) => (
                                            <li key={index} className="p-3 flex mt-2 rounded-md justify-between gap-x-6 py-5 border-2 border-gray-400">
                                                <div className='w-[5%] my-auto mx-auto'>
                                                    <input
                                                        onChange={(e) => handleAddress(e, index)}
                                                        type="radio"
                                                        name="address"
                                                        id="address"
                                                        value={address}
                                                    />
                                                </div>
                                                <div id='address' className='flex justify-between gap-x-6 py-5 w-[95%]'>
                                                    <div className="flex min-w-0 gap-x-4 ">
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.streetAddress}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.fullname}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm leading-6 text-gray-900">Phone : {address.phone}</p>
                                                        <p className="text-sm leading-6 text-gray-900">Zip : {address.zipCode}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Delivery Method</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                                        id="cash"
                                                        name="payment"
                                                        type="radio"
                                                        value="cash"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}

                                                        id="card"
                                                        value="card"
                                                        name="payment"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card Payment
                                                    </label>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div className='lg:col-span-2'>
                        <div className='mx-auto max-w-7xl bg-gray-100 px-2 sm:px-4 lg:px-6 mt-6'>
                            <h2 className='text-4xl p-1 font-semibold'>
                                Cart
                            </h2>
                            <div className="mt-8 ">
                                <div className="flow-root">
                                    <ul role="list" className=" divide-y divide-gray-200">
                                        {products.map((product) => (
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
                                                        <p className="mt-1 text-sm text-gray-500">{product.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div>
                                                            <label htmlFor="quantity" className="inline mr-3 text-sm font-medium leading-6 text-gray-900">
                                                                Qty
                                                            </label>
                                                            <select id="quantity" value={product.quantity} onChange={(e) => handleQunatity(e, product)}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>


                                                        <div className="flex">
                                                            <button
                                                                onClick={(e) => handleRemove(e, product._id)}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 px-2 py-4 sm:px-4">
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>$ {totalAmount}</p>
                                </div>
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Total items in cart</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <Link
                                        onClick={handleOrder}
                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Pay and order
                                    </Link>
                                </div>
                                <ToastContainer />
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout