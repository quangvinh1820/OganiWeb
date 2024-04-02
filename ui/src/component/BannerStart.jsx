import banner from "../img/hero/banner.jpg";

const BannerStart = () => {
    return(
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                    </div>
                    <div className="col-lg-9">
                        <div className="hero__item set-bg" style={{backgroundImage: `url(${banner})`}}>
                            <div className="hero__text">
                                <span>FRUIT FRESH</span>
                                <h2>Vegetable <br />100% Organic</h2>
                                <p>Free Pickup and Delivery Available</p>
                                <a href="#" className="primary-btn">SHOP NOW</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerStart;