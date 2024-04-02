import React from 'react';
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#fff',
        borderRadius: 0,
        border: 'none',
        display: 'inline-flex', // Sử dụng inline-flex để có thể căn chỉnh nút mũi tên và chữ "Select" trên cùng một hàng
        alignItems: 'center', // Căn chỉnh các phần tử theo chiều dọc
        height: 'auto', // Sử dụng chiều cao tự động để phù hợp với nội dung
        lineHeight: 'normal', // Căn chỉnh đường kính của nút mũi tên và chiều cao của select
        paddingLeft: '18px',
        paddingRight: '30px',
        fontSize: '16px',
        color: '#1c1c1c',
        fontWeight: 700,
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#1c1c1c', // Thêm hiệu ứng hover nếu cần
        },
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#1c1c1c',
    }),
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: 'none',
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: '#1c1c1c',
        '&:after': {
            borderBottom: '1.5px solid #1c1c1c',
            borderRight: '1.5px solid #1c1c1c',
            height: '8px',
            marginTop: 0,
            right: '16px',
            width: '8px',
            top: '-5px',
            transform: state.selectProps.menuIsOpen ? 'rotate(-135deg)' : 'rotate(45deg)',
            transition: 'transform 0.2s ease',
        },
    }),
    menu: (provided, state) => ({
        ...provided,
        borderRadius: 0,
        marginTop: 0,
        top: '15px',
    }),
    option: (provided, state) => ({
        ...provided,
        lineHeight: '20px',
        minHeight: '20px',
    }),
};

const Sort = () => {
    const options = [
        { value: 'default', label: 'Default' },
        { value: 'priceLowToHigh', label: 'Low to High' },
        { value: 'priceHighToLow', label: 'High to Low' },
        // Thêm các tùy chọn sắp xếp khác tại đây nếu cần
    ];

    return (
        <div className="filter__item">
            <div className="row">
                <div className="col-lg-4 col-md-5">
                    <div className="filter__sort d-flex align-items-center"> {/* Sử dụng flexbox để căn chỉnh nút mũi tên và chữ "Select" */}
                        <span className="mr-2">Sort By</span> {/* Sử dụng margin right để tạo khoảng cách giữa chữ và select */}
                        <Select
                            options={options}
                            styles={customStyles}
                            hideSelectedOptions={false} // Thêm hoặc đảm bảo không có thuộc tính này
                        />
                    </div>
                </div>
                <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                        <h6><span>16</span> Products found</h6>
                    </div>
                </div>
                <div className="col-lg-4 col-md-3">
                    <div className="filter__option">
                        <span className="icon_grid-2x2"></span>
                        <span className="icon_ul"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sort;
