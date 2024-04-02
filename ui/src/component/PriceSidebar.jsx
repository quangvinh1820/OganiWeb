import $ from 'jquery';
import React, { useEffect } from 'react';

const PriceSB = () => {
    // useEffect(() => {
    //     var rangeSlider = $(".price-range"),
    //         minamount = $("#minamount"),
    //         maxamount = $("#maxamount"),
    //         minPrice = rangeSlider.data('min'),
    //         maxPrice = rangeSlider.data('max');

    //     rangeSlider.slider({
    //         range: true,
    //         min: minPrice,
    //         max: maxPrice,
    //         values: [minPrice, maxPrice],
    //         slide: function (event, ui) {
    //             minamount.val('$' + ui.values[0]);
    //             maxamount.val('$' + ui.values[1]);
    //         }
    //     });

    //     minamount.val('$' + rangeSlider.slider("values", 0));
    //     maxamount.val('$' + rangeSlider.slider("values", 1));
    // }, []);
    
    return (
        <div className="sidebar__item">
            <h4>Price</h4>
            <div className="price-range-wrap">
                <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                    data-min="10" data-max="540">
                    <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                    <span tabindex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                    <span tabindex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                </div>
                <div className="range-slider">
                    <div className="price-input">
                        <input type="text" id="minamount"/>
                        <input type="text" id="maxamount"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceSB;

