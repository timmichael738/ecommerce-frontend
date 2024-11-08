import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import Products from '../pages/Products'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../components/ProductDetails'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'product-category/:category',
                element: <CategoryProduct />
            },
            {
                path: 'product/:id',
                element: <ProductDetails />
            },
            {
                path: 'admin-panel',
                element: <AdminPanel />,
                children: [
                    {
                        path: 'all-users',
                        element: <AllUsers />
                    },
                    {
                        path: 'products',
                        element: <Products />
                    }
                ]
            },
        ]
    }
])

export default router