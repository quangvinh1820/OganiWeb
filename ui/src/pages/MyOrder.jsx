// import Header from '../component/Header';
// import Footer from '../component/Footer';
// import Searchbar from '../component/SearchBar';
// import Breadcrumb from '../component/Breadcrumb';
// import { Add, Remove } from "@material-ui/icons";

// import React,{ useEffect, useState } from 'react'
// import Loading from '../../components/LoadingComponent/Loading';
// import { useQuery } from '@tanstack/react-query';
// import * as OrderService from '../../services/OrderService'
// import { useSelector } from 'react-redux';
// import { convertPrice } from '../utils';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useMutationHooks } from '../../hooks/useMutationHook';
// import * as message from '../../components/Message/Message'

// import cart1 from "../img/cart/cart-1.jpg";
// import { checkout } from '../redux/apiCalls';


// const MyOrderPage = () => {
//     const location = useLocation()
//     const { state } = location
//     const navigate = useNavigate()
//     const fetchMyOrder = async () => {
//         const res = await OrderService.getOrderByUserId(state?.id, state?.token)
//         return res.data
//     }
//     const user = useSelector((state) => state.user)
//     const order = useSelector((state) => state.order)

//     const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder }, {
//         enabled: state?.id && state?.token
//     })
//     const { isLoading, data } = queryOrder

//     const handleDetailsOrder = (id) => {
//         navigate(`/details-order/${id}`, {
//         state: {
//             token: state?.token
//         }
//         })
//     }

//     const mutation = useMutationHooks(
//         (data) => {
//         const { id, token , orderItems, userId } = data
//         const res = OrderService.cancelOrder(id, token,orderItems, userId)
//         return res
//         }
//     )

//     const handleCanceOrder = (order) => {
//         mutation.mutate({id : order._id, token:state?.token, orderItems: order?.orderItems, userId: user.id }, {
//         onSuccess: () => {
//             queryOrder.refetch()
//         },
//         })
//     }
//     const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

//     useEffect(() => {
//         if (isSuccessCancel && dataCancel?.status === 'OK') {
//         message.success()
//         } else if(isSuccessCancel && dataCancel?.status === 'ERR') {
//         message.error(dataCancel?.message)
//         }else if (isErrorCancle) {
//         message.error()
//         }
//     }, [isErrorCancle, isSuccessCancel])


//     return (
//         <>
//             <Header />
//             <Searchbar />
//             <Breadcrumb 
//             title={"Cart"}
//             categories={"Pages"}
//             />
//             <section className="shoping-cart spad">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <div className="shoping__cart__table">
//                                 <table>
//                                     <thead>
//                                         <tr>
//                                             <th className="shoping__product">Products</th>
//                                             <th>Price</th>
//                                             <th>Quantity</th>
//                                             <th>Total</th>
//                                             <th></th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {order.orderItems.map((order) =>(
//                                         <tr>
//                                             <td className="shoping__cart__item">
//                                                 <img src={order.image} alt=""/>
//                                                 <h5>{order.name}</h5>
//                                             </td>
//                                             <td className="shoping__cart__price">
//                                                 ${order.price}
//                                             </td>
//                                             <td className="shoping__cart__quantity">
//                                                 <div className="quantity">
//                                                     <div className="pro-qty">
//                                                         <Link onClick={() => handleQuantity("inc")}/>
//                                                         <input type="text" value={product.quantity} />
//                                                         <Remove onClick={() => handleQuantity("dec")}/>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="shoping__cart__total">
//                                                 ${order.price * order.quantity}
//                                             </td>
//                                             <td className="shoping__cart__item__close">
//                                                 <span onClick={() => handleClick(product.id)} className="icon_close"></span>
//                                             </td>
//                                         </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <div className="shoping__cart__btns">
//                                 <Link to="#" className="primary-btn cart-btn">CONTINUE SHOPPING</Link>
//                                 <Link to="#" className="primary-btn cart-btn cart-btn-right">
//                                     <span className="icon_loading"></span>
//                                     Upadate Cart</Link>
//                             </div>
//                         </div>
//                         <div className="col-lg-6">
//                             <div className="shoping__continue">
//                                 <div className="shoping__discount">
//                                     <h5>Discount Codes</h5>
//                                     <form action="#">
//                                         <input type="text" placeholder="Enter your coupon code"/>
//                                         <button type="submit" className="site-btn">APPLY COUPON</button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-6">
//                             <div className="shoping__checkout">
//                                 <h5>Cart Total</h5>
//                                 <ul>
//                                     <li>Subtotal <span>${order.totalPrice}</span></li>
//                                     <li>Total <span>${order.totalPrice}</span></li>
//                                 </ul>
//                                 <Link to="/checkout" className="primary-btn">PROCEED TO CHECKOUT</Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// };

// export default MyOrderPage;