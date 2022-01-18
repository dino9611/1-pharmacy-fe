import React from 'react';
import Prescriptions from '../components/section/customOrder/Prescriptions';
import ProductPagination from '../components/section/E-Pharma/ProductPagination';

const Marketplace = () => {

    return (
        <div>
            <h1>Welcome to Marketplace</h1>
            <Prescriptions />
            <ProductPagination />
        </div>
    );
}

export default Marketplace;