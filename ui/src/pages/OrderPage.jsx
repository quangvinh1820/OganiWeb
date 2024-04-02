// import Humberger from '../component/HumbergerMenu';
// import Header from '../component/Header';
// import Footer from '../component/Footer';
// import Searchbar from '../component/SearchBar';
// import Breadcrumb from '../component/Breadcrumb';
// import { useSelector } from "react-redux";
// import { useState, useEffect } from 'react';
// import { handleTransaction } from '../redux/apiCalls';
// import { useNavigate } from 'react-router-dom';
// import { useRef } from "react"

// const OrderPage = () => {
//     const cart = useSelector((state) => state.cart);
//     const [selectedPaymentType, setSelectedPaymentType] = useState("");
//     const paymentTypeRef = useRef();
//     const navigate = useNavigate(); // Sử dụng useNavigate thay vì useHistory

//     const handleSubmit = async () => {
//         if (selectedPaymentType === "bank") {
//             const result = await handleTransaction.bank(cart.total);
//             navigate(result); // Sử dụng navigate thay vì router.push
//         } else {
//             navigate("/success"); // Sử dụng navigate thay vì router.push
//         }
//     };

//     return (
//         <>
//             <Humberger />
//             <Header />
//             <Searchbar />
//             <Breadcrumb 
//             title={"Checkout"}
//             categories={"Pages"}
//             />
//             <section className="checkout spad">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-12">
//                             <h6><span className="icon_tag_alt"></span> Have a coupon? <a href="#">Click here</a> to enter your code
//                             </h6>
//                         </div>
//                     </div>
//                     <div className="checkout__form">
//                         <h4>Billing Details</h4>
//                         <form onClick={handleSubmit}>
//                             <div className="row">
//                                 <div className="col-lg-8 col-md-6">
//                                     <div className="row">
//                                         <div className="col-lg-6">
//                                             <div className="checkout__input">
//                                                 <p>Fist Name<span>*</span></p>
//                                                 <input type="text"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6">
//                                             <div className="checkout__input">
//                                                 <p>Last Name<span>*</span></p>
//                                                 <input type="text"/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="checkout__input">
//                                         <p>Country<span>*</span></p>
//                                         <input type="text"/>
//                                     </div>
//                                     <div className="checkout__input">
//                                         <p>Address<span>*</span></p>
//                                         <input type="text" placeholder="Street Address" className="checkout__input__add"/>
//                                         <input type="text" placeholder="Apartment, suite, unite ect (optinal)"/>
//                                     </div>
//                                     <div className="checkout__input">
//                                         <p>Town/City<span>*</span></p>
//                                         <input type="text"/>
//                                     </div>
//                                     <div className="checkout__input">
//                                         <p>Country/State<span>*</span></p>
//                                         <input type="text"/>
//                                     </div>
//                                     <div className="checkout__input">
//                                         <p>Postcode / ZIP<span>*</span></p>
//                                         <input type="text"/>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-lg-6">
//                                             <div className="checkout__input">
//                                                 <p>Phone<span>*</span></p>
//                                                 <input type="text"/>
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6">
//                                             <div className="checkout__input">
//                                                 <p>Email<span>*</span></p>
//                                                 <input type="text"/>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="checkout__input__checkbox">
//                                         <label for="acc">
//                                             Create an account?
//                                             <input type="checkbox" id="acc"/>
//                                             <span className="checkmark"></span>
//                                         </label>
//                                     </div>
//                                     <p>Create an account by entering the information below. If you are a returning customer
//                                         please login at the top of the page</p>
//                                     <div className="checkout__input">
//                                         <p>Account Password<span>*</span></p>
//                                         <input type="text"/>
//                                     </div>
//                                     <div className="checkout__input__checkbox">
//                                         <label for="diff-acc">
//                                             Ship to a different address?
//                                             <input type="checkbox" id="diff-acc"/>
//                                             <span className="checkmark"></span>
//                                         </label>
//                                     </div>
//                                     <div className="checkout__input">
//                                         <p>Order notes<span>*</span></p>
//                                         <input type="text"
//                                             placeholder="Notes about your order, e.g. special notes for delivery."/>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 col-md-6">
//                                     <div className="checkout__order">
//                                         <h4>Your Order</h4>
//                                         <div className="checkout__order__products">Products <span>Total</span></div>
//                                         <ul>
//                                             {cart.products.map((product) => (
//                                                 <li key={product.id}>{product.title} <span>${product.price * product.quantity}</span></li>
//                                             ))}
//                                         </ul>
//                                         <div className="checkout__order__subtotal">Subtotal <span>${cart.total}</span></div>
//                                         <div className="checkout__order__total">Total <span>${cart.total}</span></div>
//                                         <div className="checkout__input__checkbox">
//                                             <label for="acc-or">
//                                                 Create an account?
//                                                 <input type="checkbox" id="acc-or"/>
//                                                 <span className="checkmark"></span>
//                                             </label>
//                                         </div>
//                                         <p>Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod tempor incididunt
//                                             ut labore et dolore magna aliqua.</p>
//                                         <div className="checkout__input__checkbox">
//                                             <label htmlFor="cash">
//                                                 Thanh toán khi nhận hàng
//                                                 <input
//                                                     type='checkbox'
//                                                     value='cash'
//                                                     id='cash'
//                                                     checked={selectedPaymentType === "cash"}
//                                                     onChange={() => {
//                                                         setSelectedPaymentType("cash")
//                                                         paymentTypeRef.current.focus()
//                                                     }}
//                                                 />
//                                                 <span className="checkmark"></span>
//                                             </label>
//                                         </div>
//                                         <div className="checkout__input__checkbox">
//                                             <label htmlFor="bank">
//                                                 Chuyển khoản ngân hàng
//                                                 <input
//                                                     type="checkbox"
//                                                     value='bank'
//                                                     id="bank"
//                                                     checked={selectedPaymentType === "bank"}
//                                                     onChange={() => {
//                                                         setSelectedPaymentType("bank")
//                                                         paymentTypeRef.current.focus()
//                                                     }}
//                                                     ref={paymentTypeRef}
//                                                 />
//                                                 <span className="checkmark"></span>
//                                             </label>
//                                         </div>
//                                         <button type="submit" className="site-btn">PLACE ORDER</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// };

// export default OrderPage;