import {
  Home,
  PageNotFound,
  CartPage,
  Checkout,
  OrderSuccess,
  ProductDetailPage,
  SigninPage,
  SignupPage,
  UserOrdersPage,
  UserProfilePage,
  ForgetPasswordPage, 
  AdminProductsListPage,
  AddProductPage,
  EditProductPage,
  AdminOrdersPage
}
  from ".";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Protected from "../features/auth/components/Protected"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCartItemsAsync } from "../features/cart/cartSlice"
import { getCurrentUser } from "../features/auth/authSlice"
import { fetchLoggedInUserAsync } from "../features/user/userSlice";
import Signout from "../features/auth/components/Signout";
import AdminProtected from "../features/admin/components/AdminProtected";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/admin",
    element: <AdminProtected><AdminProductsListPage /></AdminProtected>
  },
  {
    path: "/admin/edit-product/:id",
    element: <AdminProtected><EditProductPage /></AdminProtected>
  },
  {
    path: "/admin/add-product",
    element: <AdminProtected><AddProductPage /></AdminProtected>
  },
  {
    path: "/admin/orders",
    element: <AdminProtected><AdminOrdersPage /></AdminProtected>
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailPage /></Protected>
  },
  {
    path: "/cart/items",
    element: <Protected><CartPage /></Protected>
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>
  },
  {
    path: "/users/signin",
    element: <SigninPage />,
  },
  {
    path: "/users/signup",
    element: <SignupPage />,
  },
  {
    path: "/orders/user",
    element: <UserOrdersPage />,
  },
  {
    path: "/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/users/signout",
    element: <Signout />,
  },
  // {
  //   path: "/users/forget-password",
  //   element: <ForgetPasswordPage />,
  // },
  {
    path: "/order-success/:id",
    element: <OrderSuccess />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);


function App() {
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()

  useEffect(() => {

    if (user){
      dispatch(fetchAllCartItemsAsync())
      dispatch(fetchLoggedInUserAsync())
    } 
  }, [user, dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
