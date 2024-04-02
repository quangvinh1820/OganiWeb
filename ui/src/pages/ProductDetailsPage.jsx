import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Humberger from '../component/HumbergerMenu';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Searchbar from '../component/SearchBar';
import Breadcrumb from '../component/Breadcrumb';
import RelatedPr from '../component/RelatedPr';
import * as ProductService from '../services/ProductService';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";

const ProductDetailsPage = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [largeImage, setLargeImage] = useState(''); // State để lưu trữ URL của ảnh lớn
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await ProductService.getDetailsProduct(id);
                setProduct(res.data);
                // Mặc định hiển thị ảnh đầu tiên
                if (res.data.image && res.data.image.length > 0) {
                    setLargeImage(res.data.image[0]);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        getProduct();
        
        return () => {
            setLargeImage('');
        }
    }, [id]);

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    // Hàm xử lý sự kiện khi nhấn vào ảnh dưới carousel
    const handleThumbnailClick = (image) => {
        setLargeImage(image);
    };

    return (
        <>
            <Humberger />
            <Header />
            <Searchbar />
            <Breadcrumb title={product.name} categories={product.type} />
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img
                                        className="product__details__pic__item--large"
                                        src={largeImage} 
                                        alt=""
                                    />
                                </div>
                                {product.image && product.image.length > 0 && (
                                    <OwlCarousel
                                        className="product__details__pic__slider"
                                        loop
                                        margin={20}
                                        items={4}
                                        dots
                                        autoplay
                                        autoHeightClass={false}
                                        smartSpeed={1200}
                                    >
                                        {product.image.map((image, index) => (
                                            <img
                                                key={index}
                                                data-imgbigurl={image}
                                                src={image}
                                                alt=""
                                                onClick={() => handleThumbnailClick(image)} 
                                            />
                                        ))}
                                    </OwlCarousel>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>{product.name}</h3>
                                <div className="product__details__rating">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-half-o"></i>
                                    <span>(18 reviews)</span>
                                </div>
                                <div className="product__details__price">${product.price}</div>
                                <p>{product.description}</p>
                                <div className="product__details__quantity">
                                    <div className="quantity">
                                        <div className="pro-qty">
                                            <RemoveIcon onClick={() => handleQuantity('dec')} />
                                            <input type="text" value={quantity} readOnly />
                                            <AddIcon onClick={() => handleQuantity('inc')} />
                                        </div>
                                    </div>
                                </div>
                                <button className="primary-btn">ADD TO CARD</button>
                                <Link to="#" className="heart-icon">
                                    <span className="icon_heart_alt"></span>
                                </Link>
                                <ul>
                                    <li>
                                        <b>Availability</b> <span>In Stock</span>
                                    </li>
                                    <li>
                                        <b>Shipping</b>{' '}
                                        <span>
                                            01 day shipping. <samp>Free pickup today</samp>
                                        </span>
                                    </li>
                                    <li>
                                        <b>Weight</b> <span>0.5 kg</span>
                                    </li>
                                    <li>
                                        <b>Share on</b>
                                        <div className="share">
                                            <Link to="#">
                                                <i className="fa fa-facebook"></i>
                                            </Link>
                                            <Link to="#">
                                                <i className="fa fa-twitter"></i>
                                            </Link>
                                            <Link to="#">
                                                <i className="fa fa-instagram"></i>
                                            </Link>
                                            <Link to="#">
                                                <i className="fa fa-pinterest"></i>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RelatedPr />
            <Footer />
        </>
    );
};

export default ProductDetailsPage;
