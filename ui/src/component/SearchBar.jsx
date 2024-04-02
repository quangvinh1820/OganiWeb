import $ from 'jquery';
import React, { useEffect } from 'react';
import Categories from './Categories';

const Searchbar = () => {
    useEffect(() => {
        $('.hero__categories__all').on('click', function(){
            $('.hero__categories ul').slideToggle(400);
        });
    }, []);

    // const onSearch = (e) => {
    //     setSearch(e.target.value)
    //     dispatch(searchProduct(e.target.value))
    //   }

    return (
        <section className="hero hero-normal">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="hero__categories">
                            <div className="hero__categories__all">
                                <i className="fa fa-bars"></i>
                                <span>All departments</span>
                            </div>
                            <Categories />
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="hero__search">
                            <div className="hero__search__form">
                                <form action="#">
                                    <div className="hero__search__categories">
                                        All Categories
                                        <span className="arrow_carrot-down"></span>
                                    </div>
                                    <input
                                    type="text"
                                    placeholder="What do yo u need?"
                                    // onChange={onSearch}
                                    />
                                    <button type="submit" className="site-btn">SEARCH</button>
                                </form>
                            </div>
                            <div className="hero__search__phone">
                                <div className="hero__search__phone__icon">
                                    <i className="fa fa-phone"></i>
                                </div>
                                <div className="hero__search__phone__text">
                                    <h5>+65 11.188.888</h5>
                                    <span>support 24/7 time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Searchbar;