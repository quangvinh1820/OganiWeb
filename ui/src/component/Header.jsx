import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import lg from "../img/language.png";
import logo from "../img/logo.png";

import * as UserService from '../services/UserService';
import { resetUser } from '../redux/userRedux';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [activeLink, setActiveLink] = useState('');
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')


    const user = useSelector(state => state.user)
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigateLogin = () => {
        navigate('/sign-in')
      }

    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        navigate('/')
        setLoading(false)
      }

    useEffect(() => {
        setLoading(true);
        setUserName(user?.name);
        setUserAvatar(user?.avatar);
        setActiveLink(location.pathname);
        setLoading(false);
    }, [location, user?.name, user?.avatar]);
   
    return(
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__left">
                                <ul>
                                    <li><i className="fa fa-envelope"></i> vinhquangtran1820@gmail.com</li>
                                    <li>Free Shipping for all Order of $99</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="header__top__right">
                                <div className="header__top__right__social">
                                    <Link to="#"><i className="fa fa-facebook"></i></Link>
                                    <Link to="#"><i className="fa fa-twitter"></i></Link>
                                    <Link to="#"><i className="fa fa-linkedin"></i></Link>
                                    <Link to="#"><i className="fa fa-pinterest-p"></i></Link>
                                </div>
                                <div className="header__top__right__language">
                                    <img src={lg} alt=""/>
                                    <div>English</div>
                                    <span className="arrow_carrot-down"></span>
                                    <ul>
                                        <li><Link to="#">Spanis</Link></li>
                                        <li><Link to="#">English</Link></li>
                                    </ul>
                                </div>
                                <div className="header__top__right__auth">
                                    <Link >
                                        {userAvatar ? (
                                            <img src={userAvatar} alt="avatar"/>
                                        ) : (
                                            <i className="fa fa-user"></i>
                                        )}
                                        {user?.access_token ? (
                                            <>
                                                {userName?.length ? userName : user?.email}
                                                <span className="arrow_carrot-down"></span>
                                                <ul>
                                                    {user?.isAdmin && (
                                                        <>
                                                            <li><Link to="/admin/orders">Manage system</Link></li>
                                                        </>
                                                    )}
                                                    <li><Link to="/profile-user">Profile</Link></li>
                                                    <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
                                                </ul>
                                            </>
                                        ) : <Link to='/sign-in'>Login</Link>}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="header__logo">
                            <Link to="/"><img src={logo} alt=""/></Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                <li className={activeLink === "/" ? "active" : ""}><Link to="/">Home</Link></li>
                                <li className={activeLink === "/shop" ? "active" : ""}><Link to="/shop">Shop</Link></li>
                                <li onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                                    <Link to="#">Pages</Link>
                                    <ul className={`header__menu__dropdown ${isDropdownOpen ? 'show' : ''}`}>
                                        <li className={activeLink === "/cart" ? "active" : ""}><Link to="/cart">Shoping Cart</Link></li>
                                        <li className={activeLink === "/checkout" ? "active" : ""}><Link to="/checkout">Check Out</Link></li>
                                        <li className={activeLink === "/blog" ? "active" : ""}><Link to="/blog">Blog Details</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3">
                        <div className="header__cart">
                            <ul>
                                <li><Link to="#"><i className="fa fa-heart"></i> <span>1</span></Link></li>
                                <li><Link to="/cart"><i className="fa fa-shopping-bag"></i> <span>2</span></Link></li>
                            </ul>
                            <div className="header__cart__price">item: <span>$150</span></div>
                        </div>
                    </div>
                </div>
                <div className="humberger__open">
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </header>
    );
};

export default Header;