import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
// import MyOrderPage from "../pages/MyOrder";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// import OrderPage from "../pages/OrderPage";
// import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import ProductDetailsPage from "../pages/ProductDetailsPage";
// import ProductsPage from "../pages/ProductsPage";
import Profile from "../pages/ProfilePage";
import AdminPage from "../pages/Admin/Admin";
// import TypeProductPage from "../pages/TypeProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage
    },
    // {
    //     path: '/order',
    //     page: OrderPage
    // },
    // {
    //     path: '/my-order',
    //     page: MyOrderPage
    // },
    // {
    //     path: '/details-order/:id',
    //     page: DetailsOrderPage
    // },
    // {
    //     path: '/orderSuccess',
    //     page: OrderSucess
    // },
    // {
    //     path: '/products',
    //     page: ProductsPage
    // },
    // {
    //     path: '/product/:type',
    //     page: TypeProductPage
    // },
    {
        path: '/sign-in',
        page: Login
    },
    {
        path: '/sign-up',
        page: Register
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage
    },
    {
        path: '/profile-user',
        page: Profile
    },
    {
        path: '/system/admin',
        page: AdminPage,
        // isPrivated: true
    },
    // {
    //     path: '*',
    //     page: NotFoundPage
    // }
]