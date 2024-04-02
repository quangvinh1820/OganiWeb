import CarouselPr from "./CarouselPr";


const LatestPr = () => {
    return(
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="latest-product__text">
                            <h4>Latest Products</h4>
                            <CarouselPr />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="latest-product__text">
                            <h4>Top Rated Products</h4>
                            <CarouselPr />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="latest-product__text">
                            <h4>Review Products</h4>
                            <CarouselPr />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestPr;