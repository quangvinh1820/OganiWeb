import Header from '../component/Header';
import Footer from '../component/Footer';
import Searchbar from '../component/SearchBar';
import BannerStart from '../component/BannerStart';
import Slide from '../component/Slide';
import Feature from '../component/FeaturePr';
import Banner from '../component/Banner';
import LatestPr from '../component/LatestPr';
import Blog from '../component/Blog';
import Humberger from '../component/HumbergerMenu';

const HomePage = () => {
    return (
        <>
            <Humberger />
            <Header />
            <Searchbar />
            <BannerStart />
            <Slide />
            <Feature />
            <Banner />
            <LatestPr />
            <Blog />
            <Footer />
        </>
    );
};

export default HomePage;