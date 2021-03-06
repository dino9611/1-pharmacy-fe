import React, { useState, useEffect, useCallback }from 'react';
import '../../UI/adminInventory/style.css';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import { toast } from 'react-toastify'
import { useParams } from 'react-router';
import OrderWrapper from '../../UI/adminInventory/orderWrapper';
import StatusButtons from '../../UI/adminInventory/statusButtons';
import OrderDetailsModal from '../../UI/adminInventory/orderDetailsModal';
import ShippingDetailsModal from '../../UI/adminInventory/shippingDetailsModal';
import DashboardLoading from '../../../pages/dashboardLoading';

const UserOrderHistoryTable = (props) => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchOrderHistoryData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/orderHistory?filter=byUser&id=${id}&status=${status}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setOrders(response.data.data);
            setLoading(false);
        } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }, [id, status]);

    useEffect(() => {
        fetchOrderHistoryData();
    }, [fetchOrderHistoryData])

    const [shippingDetails, setShippingDetails] = useState([]);
    const fetchShippingDetailsData = async (orderId) => {
        try {
            const response = await axios.get(`${API_URL}/orderHistory?filter=user&id=${orderId}&status=${status}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setShippingDetails(response.data.data);
            setLoading(false);
        } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }
    
    const [orderDetails, setOrderDetails] = useState([]);
    const fetchOrderDetailsData = async (orderId) => {
        try {
            const response = await axios.get(`${API_URL}/orderHistory/order-details?filter=byOrder&id=${orderId}&status=${status}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setOrderDetails(response.data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };
    
    return (
        <>
            <ShippingDetailsModal
                shippingDetails={shippingDetails}
                closeModal={() => setShippingDetails([])}
            />
            <OrderDetailsModal 
                orderDetails={orderDetails} 
                closeModal={() => setOrderDetails([])}
                shippingMethod={orders.map(order => order.shipping_method)}
                shippingCost={orders.map(order => order.shipping_cost)}
                User
            />
            <StatusButtons
                user={props.user}
                status={status}
                onClick={(value) => setStatus(value)}
                showStatus3
            />
            { loading && <DashboardLoading/> }
            {   
                (orders.length) && !loading
                ?
                orders.map((order, index) => {
                    return (
                        <OrderWrapper
                            transactionNumber={order.transaction_number}
                            createdAt={order.createdAt}
                            totalPayment={parseInt(order.total_payment).toLocaleString("in", "ID")}
                            buttonLabel1="SHIPPING DETAILS" 
                            onClickButton1={() => fetchShippingDetailsData(order.id)}
                            buttonLabel2="ORDER DETAILS" 
                            onClickButton2={() => fetchOrderDetailsData(order.id)}
                        />
                    );
                })
                :
                <div 
                    className="d-flex justify-content-center align-items-center" 
                    style={{ 
                        height: "100%", 
                        color: "var(--pink-color)",
                        fontSize: 18
                    }}
                >
                    <i class="fas fa-info-circle pe-2"></i> No Data Available
                </div>
            }
        </>
    );
};
 
export default UserOrderHistoryTable;