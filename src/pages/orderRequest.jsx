import React from 'react';
import OrderRequestTable from '../components/section/admin/orderRequestTable';
import '../style.css';

const OrderRequest = () => {
    return (
        <div className="m-5">
            <h3 className="mb-4">Order Request</h3>
            <OrderRequestTable/>
        </div>
    );
}
 
export default OrderRequest;