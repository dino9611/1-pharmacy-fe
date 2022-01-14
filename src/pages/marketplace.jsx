import React from 'react';
import ProductPagination from '../components/section/E-Pharma/ProductPagination';
import Sort from '../components/controller/E-pharma/Sort'
import { useState } from 'react';

const Marketplace = () => {

    const [name, setName] = useState(true)
    const [price, setPrice] = useState(true)

    return (
        <div>
            <h1>Welcome to Marketplace</h1>
            <div className='btn-group'>
                <Sort 
                    label="name"
                    sortChange = {(value) => setName(value)}
                />
                <Sort 
                    label="price"
                    sortChange = {(value) => setPrice(value)}
                />
            </div>
            <ProductPagination
                sortName={name}
                sortPrice={price}
            />
        </div>
    );
}
 
export default Marketplace;