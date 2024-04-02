import banner1 from '../img/banner/banner-1.jpg';
import banner2 from '../img/banner/banner-2.jpg';

const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="banner__pic">
                            <img src={banner1} alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="banner__pic">
                            <img src={banner2} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;