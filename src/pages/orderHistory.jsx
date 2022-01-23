import React from 'react';
import '../style.css';
import { withRouter } from 'react-router';
import OrderHistoryTable from '../components/section/admin/orderHistoryTable';

const OrderHistory = (props) => {
    const { history } = props;
    
    return (
        <div className="m-5">
            <div className="d-flex flex-row mb-3">
                <div
                    className="navbarButton"
                    style={{ 
                        fontSize: 22, 
                        paddingRight: 10,
                    }}
                    onClick={() => {history.push("/admin/userDatas")}}
                >
                    <i class="fas fa-arrow-left"></i>
                </div>
                <h3 className="mb-4">User Transactions History</h3>
            </div>
            <OrderHistoryTable isAdmin/>
        </div>
    );
}
 
export default withRouter(OrderHistory);