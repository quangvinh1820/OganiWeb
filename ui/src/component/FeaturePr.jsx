import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as ProductService from '../services/ProductService';

const Feature = () => {
    const [typeProducts, setTypeProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeType, setActiveType] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const typeRes = await ProductService.getAllTypeProduct();
                setTypeProducts(typeRes.data);
                if (typeRes.data.length > 0) {
                    setActiveType(typeRes.data[0]);
                    const productRes = await ProductService.getProductType(typeRes.data[0]);
                    setProducts(productRes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleTypeClick = async (type) => {
        try {
            setActiveType(type);
            const productRes = await ProductService.getProductType(type);
            const filteredProducts = productRes.data.filter(product => product.rating >= 5);
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Featured Products</h2>
                        </div>
                        <div className="featured__controls">
                            <ul>
                                {typeProducts.map((item) => (
                                    <li key={item} className={activeType === item ? 'active' : ''} onClick={() => handleTypeClick(item)}> 
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row featured__filter">
                    {products.map(product => (
                        <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                            <div className="featured__item">
                                <div className="featured__item__pic set-bg" style={{backgroundImage: `url(${product.image[0]})`}}>
                                    <ul className="featured__item__pic__hover">
                                        <li><Link to="#"><i className="fa fa-heart"></i></Link></li>
                                        <li><Link to="#"><i className="fa fa-retweet"></i></Link></li>
                                        <li><Link to={`/product-details/${product._id}`}><i className="fa fa-shopping-cart"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><Link to={`/product-details/${product._id}`}>{product.name}</Link></h6>
                                    <h5>${product.price}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* {products.map(product => {
                        return (
                            <RelatedPr
                            id={product._id}
                            name={product.name}
                            image={product.image[0]}
                            price={product.price}
                            />
                        )
                    })} */}
                </div>
            </div>
        </section>
    );
};

export default Feature;
