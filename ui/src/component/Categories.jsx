import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ProductService from '../services/ProductService';

const Categories = () => {
    const [types, setTypes] = useState([]);
    const navigate = useNavigate();

    const handleNavigatetype = (type) => {
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, {state: type});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getAllTypeProduct();
                setTypes(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return ( 
        <ul>
            {types.map((item, index) => (
                <li key={index} onClick={() => handleNavigatetype(item)}>
                    <Link>{item}</Link>
                </li>
            ))}
        </ul>    
    );
};

export default Categories;
