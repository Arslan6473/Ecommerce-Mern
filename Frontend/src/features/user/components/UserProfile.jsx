import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loggedInUserInfo, updateLoggedInUserAsync } from "../userSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
    const notifyAddressRemove = () => toast.success("Address removed", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });

    const loggedInUser = useSelector(loggedInUserInfo)
    const dispatch = useDispatch()
    

    const handleRemove = (index) => {
        const newUser = { ...loggedInUser, addresses: [...loggedInUser.addresses] }
        newUser.addresses.splice(index, 1)
        dispatch(updateLoggedInUserAsync(newUser))
        notifyAddressRemove()
        
    }
    return (
        <div>
            <div>
                <h2 className='  text-4xl p-1 font-semibold'>
                    Your Profile
                </h2>
            </div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white mt-6 border-2 border-gray-300 pb-3 rounded-md'>

                <h4 className='text-2xl p-1 pt-3 pb-0 font-semibold'>
                    Name : {loggedInUser.fullName}
                </h4>
                <h3 className='text-xl p-1 pt-3 pb-0 font-semibold'>
                    Email : {loggedInUser.email}
                </h3>
                {loggedInUser.role === "admin" &&
                    <h3 className='text-xl text-red-500 p-1 pt-3 pb-0 font-semibold'>
                        Role : {loggedInUser.role}
                    </h3>}
                <h6 className='text-sm p-1 pt-3 pb-0 '>
                    List of Addresses
                </h6>
                {loggedInUser.addresses.length ?
                 <ul role="list pt-2">
                    {loggedInUser.addresses.map((address, index) => (
                        <li key={index} className="p-3 flex mt-1 rounded-md justify-between gap-x-6 py-3 border-2 border-gray-400">
                            <div id='address' className='flex justify-between gap-x-6 py-3 w-[95%]'>
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
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <button
                                        onClick={(index) => handleRemove(index)}
                                        className="flex w-full justify-center mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Remove
                                    </button>
                                   <ToastContainer/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>:<div className='text-xl '>You do not add your addressess yet</div>}
               
                <p className="text-sm leading-6 text-gray-900 py-2">You can add your new adresses on checkout page.</p>
            </div>
        </div>
    )
}

export default UserProfile