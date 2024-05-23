import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    clearSelectedProduct,
    createProductAsync,
    fetchSingleproductAsync,
    selectAllbrands,
    selectAllcategories,
    selectSingleproduct,
    updateProductAsync
} from '../../product/productSlice'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "../../common/Modal"

function ProductForm() {
    const notifyUpdated = () => toast.success("Product updated", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });
    const notifyAdded = () => toast.success("Product Added", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
    });
    const categories = useSelector(selectAllcategories)
    const brands = useSelector(selectAllbrands)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const dispatch = useDispatch()
    const params = useParams()
    const selectedproduct = useSelector(selectSingleproduct)
    const [openModal,setOpenModal] = useState(null)
    useEffect(() => {
        if (params.id) {
            dispatch(fetchSingleproductAsync(params.id))
        } else {
            dispatch(clearSelectedProduct())
        }
    }, [dispatch, params])
    useEffect(() => {
        if (selectedproduct && params.id) {
            setValue("title", selectedproduct.title)
            setValue("price", selectedproduct.price)
            setValue("rating", selectedproduct.rating)
            setValue("stock", selectedproduct.stock)
            setValue("discountPercentage", selectedproduct.discountPercentage)
            setValue("thumbnail", selectedproduct.thumbnail)
            setValue("description", selectedproduct.description)
            setValue("brand", selectedproduct.brand)
            setValue("category", selectedproduct.category)
            setValue("image1", selectedproduct.images[0])
            setValue("image2", selectedproduct.images[1])
            setValue("image3", selectedproduct.images[2])
        }
    }, [selectedproduct])
    const onSubmit = (data) => {
        const product = { ...data }
        product.images = [product.image1, product.image2, product.image3, product.thumbnail]
        product.price = +product.price;
        product.stock = +product.stock;
        product.rating = +product.rating;
        product.discountPercentage = +product.discountPercentage;
        delete product.image1
        delete product.image2
        delete product.image3
        if (params.id && selectedproduct) {
            product._id = params.id

            dispatch(updateProductAsync(product))
            notifyUpdated()
        } else {
            dispatch(createProductAsync(product))
            notifyAdded()
        }

        reset()
    }
    const handleDelete = () => {
        const product = { ...selectedproduct }
        product.deleted = true
        dispatch(updateProductAsync(product))
    }
    return (
        <div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12 p-4">
                    <div className="pb-12">
                        <h1 className=" text-2xl font-bold leading-7 text-gray-900">Add Product</h1>
                        <div >

                            <div className="border-b border-gray-900/10 pb-12">

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("title", {
                                                    required: "Title is required"
                                                })}
                                                id="title"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                                        </div>

                                    </div>


                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                {...register("price", {
                                                    required: "Price is required",
                                                    min: 1

                                                })}
                                                id="price"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                            Stock
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                {...register("stock", {
                                                    required: "Stock is required",
                                                    min: 0
                                                })}
                                                id="stock"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.stock && <p className='text-red-500'>{errors.stock.message}</p>}

                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                            Discount Percentage
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                {...register("discountPercentage", {
                                                    required: "Discount Percentage is required",
                                                    min: 0,
                                                    max: 100
                                                })}
                                                id="discountPercentage"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.discountPercentage && <p className='text-red-500'>{errors.discountPercentage.message}</p>}

                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="rating" className="block text-sm font-medium leading-6 text-gray-900">
                                            Rating
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                {...register("rating", {
                                                    required: "Rating is required",
                                                    min: 0,
                                                    max: 5
                                                })}
                                                id="rating"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.rating && <p className='text-red-500'>{errors.rating.message}</p>}

                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Discription
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                {...register("description", {
                                                    required: "Description is required"

                                                })}
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                defaultValue={''}
                                            />
                                            {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
                                    </div>

                                    <div className="sm:col-span-3 ">
                                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="category"
                                                {...register("category", {
                                                    required: "Category is required"

                                                })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="">--Select Category--</option>
                                                {categories.map((category) => (
                                                    <option value={category.value}>{category.label}</option>
                                                ))}
                                            </select>
                                            {errors.category && <p className='text-red-500'>{errors.category.message}</p>}

                                        </div>
                                    </div>

                                    <div className="sm:col-span-3 block">
                                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                            Brand
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="brand"
                                                {...register("brand", {
                                                    required: "Brand is required"

                                                })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option value="">--Select Brand--</option>
                                                {brands.map((brand) => (
                                                    <option value={brand.value}>{brand.label}</option>
                                                ))}
                                            </select>
                                            {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}

                                        </div>
                                    </div>



                                    <div className="col-span-full">
                                        <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                            Thumbnail
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("thumbnail", {
                                                    required: "Thumbnail is required"

                                                })}
                                                id="thumbnail"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}

                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 1
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("image1",
                                                    {
                                                        required: "Image 1 is required"

                                                    }
                                                )}
                                                id="image1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.image1 && <p className='text-red-500'>{errors.image1.message}</p>}

                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 2
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("image2")}
                                                id="image2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image 3
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("image3")}
                                                id="image3"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Modal
                        title="Delete product"
                        message="Are you sure you want to delete this product?"
                        dangerActionName="Delete"
                        cancelActionName="Cancel"
                        dangerAction={handleDelete}
                        cancelAction={() => setOpenModal(null)}
                        showModel={openModal}
                    />
                    {params.id && <button
                        onClick={(e)=>{
                            e.preventDefault();
                             setOpenModal(true)}}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Delete Product
                    </button>}
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {params.id ? <span>Update Product</span> : <span>Add Product</span>}
                    </button>
                    <ToastContainer />
                </div>
            </form>
        </div>
    )
}

export default ProductForm