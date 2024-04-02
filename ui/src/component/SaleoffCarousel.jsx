import pd1 from "../img/product/discount/pd-1.jpg";
import pd2 from "../img/product/discount/pd-2.jpg";
import pd3 from "../img/product/discount/pd-3.jpg";
import pd4 from "../img/product/discount/pd-4.jpg";
import pd5 from "../img/product/discount/pd-5.jpg";
import pd6 from "../img/product/discount/pd-6.jpg";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";

const Saleoff = () => {
    return (
        <div className="product__discount">
            <div className="section-title product__discount__title">
                <h2>Sale Off</h2>
            </div>
            <div className="row">
                <OwlCarousel
                className="product__discount__slider"
                loop
                margin={0}
                items={3}
                dots={true}
                autoHeightClass={false}
                autoplay
                smartSpeed={1200}
                >
                    <div className="col-lg-4">
                        <div className="product__discount__item">
                            <div className="product__discount__item__pic set-bg"
                                style={{backgroundImage: `url(${pd1})`}}>
                                <div className="product__discount__percent">-20%</div>
                                <ul className="product__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="product__discount__item__text">
                                <span>Dried Fruit</span>
                                <h5><a href="#">Raisin’n’nuts</a></h5>
                                <div className="product__item__price">$30.00 <span>$36.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product__discount__item">
                            <div className="product__discount__item__pic set-bg"
                                style={{backgroundImage: `url(${pd2})`}}>
                                <div className="product__discount__percent">-20%</div>
                                <ul className="product__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="product__discount__item__text">
                                <span>Vegetables</span>
                                <h5><a href="#">Vegetables’package</a></h5>
                                <div className="product__item__price">$30.00 <span>$36.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product__discount__item">
                            <div className="product__discount__item__pic set-bg"
                                style={{backgroundImage: `url(${pd3})`}}>
                                <div className="product__discount__percent">-20%</div>
                                <ul className="product__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="product__discount__item__text">
                                <span>Dried Fruit</span>
                                <h5><a href="#">Mixed Fruitss</a></h5>
                                <div className="product__item__price">$30.00 <span>$36.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product__discount__item">
                            <div className="product__discount__item__pic set-bg"
                                style={{backgroundImage: `url(${pd4})`}}>
                                <div className="product__discount__percent">-20%</div>
                                <ul className="product__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="product__discount__item__text">
                                <span>Dried Fruit</span>
                                <h5><a href="#">Raisin’n’nuts</a></h5>
                                <div className="product__item__price">$30.00 <span>$36.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product__discount__item">
                            <div className="product__discount__item__pic set-bg"
                                style={{backgroundImage: `url(${pd5})`}}>
                                <div className="product__discount__percent">-20%</div>
                                <ul className="product__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="product__discount__item__text">
                                <span>Dried Fruit</span>
                                <h5><a href="#">Raisin’n’nuts</a></h5>
                                <div className="product__item__price">$30.00 <span>$36.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product__discount__item">
                            <div className="product__discount__item__pic set-bg"
                                style={{backgroundImage: `url(${pd6})`}}>
                                <div className="product__discount__percent">-20%</div>
                                <ul className="product__item__pic__hover">
                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div className="product__discount__item__text">
                                <span>Dried Fruit</span>
                                <h5><a href="#">Raisin’n’nuts</a></h5>
                                <div className="product__item__price">$30.00 <span>$36.00</span></div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </div>
    );
};

export default Saleoff;