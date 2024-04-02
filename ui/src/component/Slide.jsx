import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import * as ProductService from '../services/ProductService';

const Slide = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getAllProduct();
                setProducts(res.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    return (
        <section className="categories">
            <div className="container">
                <div className="row">
                    {products && products.length >= 5 && (
                        <OwlCarousel
                            className="categories__slider"
                            loop
                            margin={10}
                            items={4}
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
                            {products.slice(0, 5).map((product) => (
                                <div className="col-lg-3" key={product._id}>
                                    <div className="categories__item set-bg" style={{backgroundImage: `url(${product.image[0] })`}}>
                                        <h5><a href="#">{product.name}</a></h5>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Slide;
