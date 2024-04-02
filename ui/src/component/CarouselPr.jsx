import lp1 from "../img/latest-product/lp-1.jpg";
import lp2 from "../img/latest-product/lp-2.jpg";
import lp3 from "../img/latest-product/lp-3.jpg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";

const CarouselPr = () => {
    return (
        <OwlCarousel
            className="latest-product__slider"
            loop
            margin={10}
            items={1}
            dots={false}
            autoplay
            smartSpeed={1500}
            nav
            navClass
            navText={[
                '<span class="fa fa-angle-left"></span>',
                '<span class="fa fa-angle-right"></span>',
            ]}
        >
            <div className="latest-prdouct__slider__item">
                <a href="#" className="latest-product__item">
                    <div className="latest-product__item__pic">
                        <img src={lp1} alt=""/>
                    </div>
                    <div className="latest-product__item__text">
                        <h6>Crab Pool Security</h6>
                        <span>$30.00</span>
                    </div>
                </a>
                <a href="#" className="latest-product__item">
                    <div className="latest-product__item__pic">
                        <img src={lp2} alt=""/>
                    </div>
                    <div className="latest-product__item__text">
                        <h6>Crab Pool Security</h6>
                        <span>$30.00</span>
                    </div>
                </a>
                <a href="#" className="latest-product__item">
                    <div className="latest-product__item__pic">
                        <img src={lp3} alt=""/>
                    </div>
                    <div className="latest-product__item__text">
                        <h6>Crab Pool Security</h6>
                        <span>$30.00</span>
                    </div>
                </a>
            </div>
            <div className="latest-prdouct__slider__item">
                <a href="#" className="latest-product__item">
                    <div className="latest-product__item__pic">
                        <img src={lp1} alt=""/>
                    </div>
                    <div className="latest-product__item__text">
                        <h6>Crab Pool Security</h6>
                        <span>$30.00</span>
                    </div>
                </a>
                <a href="#" className="latest-product__item">
                    <div className="latest-product__item__pic">
                        <img src={lp2} alt=""/>
                    </div>
                    <div className="latest-product__item__text">
                        <h6>Crab Pool Security</h6>
                        <span>$30.00</span>
                    </div>
                </a>
                <a href="#" className="latest-product__item">
                    <div className="latest-product__item__pic">
                        <img src={lp3} alt=""/>
                    </div>
                    <div className="latest-product__item__text">
                        <h6>Crab Pool Security</h6>
                        <span>$30.00</span>
                    </div>
                </a>
            </div>
        </OwlCarousel>
    );
};

export default CarouselPr;