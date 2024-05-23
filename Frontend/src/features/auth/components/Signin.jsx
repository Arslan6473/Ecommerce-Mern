import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { getCurrentUser, getError, logInUserAsync } from '../authSlice'


function Signin() {
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const error = useSelector(getError)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    dispatch(logInUserAsync(data))
  }

return (
  <>

    {user && <Navigate to='/' replace={true}></Navigate>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className='mx-auto font-extrabold text-xl text-center text-indigo-600'>E-Commerce</h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email", {
                  required: "Email is required", pattern:
                  {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "Must be a valid Email"
                  }
                })}
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              {/* <div className="text-sm">
                <Link to="/users/forget-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register("password", {
                  required: "Password is required"
                })}
                type="password"

                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
              {error && <p className='text-red-500'>{error.message}</p>}

            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/users/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Create an Acoount
          </Link>
        </p>
      </div></div>
  </>
)
}

export default Signin