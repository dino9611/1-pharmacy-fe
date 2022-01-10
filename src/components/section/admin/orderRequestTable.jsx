import React, { useState, useEffect, useCallback } from 'react';
import OrderWrapper from '../../UI/adminInventory/orderWrapper';
import StatusButton from '../../UI/adminInventory/statusButton';
import '../../UI/adminInventory/style.css';
import { toast } from 'react-toastify'
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import DetailsModal from '../../UI/adminInventory/detailsModal';
import Swal from 'sweetalert2';
import Pagination from '../../controller/Pagination';

const OrderRequestTable = (props) => {
    const [orders, setOrders] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [status, setStatus] = useState(1);
    const [openModalShippingDetails, setOpenModalShippingDetails] = useState(false);
    const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?filter=orderRequest&status=${status}`);
            setOrders(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }, [status]);

    useEffect(() => {
        fetchData();         
    }, [fetchData]);
    
    const fetchUserDetailsData = async (transaction_number) => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?filter=userDetails&status=${status}&transaction_number=${transaction_number}`);
            setOpenModalShippingDetails(!openModalShippingDetails);
            setUserDetails(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const fetchOrderDetailsData = async (transaction_number) => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory/order-details?filter=orderRequest&status=${status}&transaction_number=${transaction_number}`);
            setOpenModalOrderDetails(!openModalOrderDetails);
            setOrderDetails(response.data);
            console.log(response.data);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const RenderShippingDetailsModal = () => {
        return (
            userDetails.map((order) => {
                return (
                    <DetailsModal
                        size="md"
                        isOpen={openModalShippingDetails} 
                        toggle={() => setOpenModalShippingDetails(!openModalShippingDetails)}
                        title="Shipping Details"
                    >
                        <p>
                            Recipent Name: {order.recipent_name}
                        </p>
                        <p>
                            Recipent Phone Number: {order.recipent_phone_number}
                        </p>
                        <p>
                            Shipping Address: {order.shipping_address}
                        </p>
                        <p>
                            Shipping Method: {order.shipping_method}
                        </p>
                        <p>
                            Shipping Cost: Rp. {order.shipping_cost.toLocaleString("in", "ID")}
                        </p>
                    </DetailsModal>
                );
            })
        );
    };

    const RenderOrderDetailsModal = () => {
        const OrderDetailsFooter = () => {
            return (
                <div className="d-flex flex-row justify-content-between" style={{ width: "100%" }}>
                    <div>
                        <img src={orderDetails.map(orderDetail => orderDetail.payment_image_proof)} alt="" height="120" width="auto"/>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <p>Shipping Method: {userDetails.map(userDetail => userDetail.shipping_method)}</p>
                        <p>Shipping Cost: Rp. {userDetails.map(userDetail => userDetail.shipping_cost.toLocaleString("in", "ID"))}</p>
                        <p>Total Payment: Rp. {orderDetails.reduce((prev, curr) => prev + curr.total_price, 0).toLocaleString("in", "ID")} </p>
                    </div>
                </div>
            );
        };

        return (
            <DetailsModal
                size="xl"
                isOpen={openModalOrderDetails} 
                toggle={() => setOpenModalOrderDetails(!openModalOrderDetails)}
                title="Order Details"
                footer={<OrderDetailsFooter/>} 
            >
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Order</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total Price</th>
                        </tr>
                    </thead>
                    {
                        orderDetails.map((orderDetail, index) => {
                            return (
                                <tbody>
                                    <tr>
                                    <th scope="row">{index + 1}.</th>
                                    <td>
                                        <img src={orderDetail.medicine_image} alt="" height="30" width="50"/>
                                    </td>
                                    <td>{orderDetail.medicine_name}</td>
                                    <td>{orderDetail.quantity}</td>
                                    <td>Rp. {orderDetail.price.toLocaleString("in", "ID")}</td>
                                    <td>Rp. {orderDetail.total_price.toLocaleString("in", "ID")}</td>
                                    </tr>
                                </tbody>
                            );
                        })
                    }
                </table>
            </DetailsModal>
        );
    };

    const StatusButtons = () => {
        const underline = <div style={{ height: 2, width: "35%", backgroundColor: "var(--black-color)", marginTop: 7 }}></div>
        
        return (
            <div className="d-flex flex-row mb-3">
                <StatusButton
                    className={`${ status === 1 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "darkgray"
                    border= "2px solid gray"
                    onClick={() => setStatus(1)}
                    label="Awaiting for Review"
                    ternary={ status === 1 ? underline : null }
                />
                <div className="mx-3" style={{ width: 1, backgroundColor: "silver" }}></div>
                <StatusButton
                    className={`${ status === 2 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "limegreen"
                    border= "2px solid forestgreen" 
                    onClick={() => setStatus(2)}
                    label="Past Accepted Orders"
                    ternary={ status === 2 ? underline : null }
                />
                <StatusButton
                    className={`${ status === 3 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "var(--red-color)"
                    border= "2px solid firebrick" 
                    onClick={() => setStatus(4)}
                    label="Past Rejected Orders"
                    ternary={ status === 4 ? underline : null }
                />
            </div>
        )
    };

    const changeOrderStatus = async (transaction_number, newStatus) => {
        try {
            const response = await axios.post(`${API_URL}/admin/transactions/orderRequest?transaction_number=${transaction_number}&newStatus=${newStatus}`);
            console.log(response.data);
            fetchData();
        } catch (error) {
            Swal.fire(
                `Error`,
                `Please try again!`,
                'error'
            );
        }
    };

    const confirmAlert = (transaction_number, newStatus) => {
        return (
            Swal.fire({
                icon: 'warning',
                title: `Accept Order No. ${transaction_number}?`,
                text: `You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonText: 'Accept',
            }).then((result) => {
                if (result.isConfirmed) {
                    changeOrderStatus(transaction_number, newStatus);
                    Swal.fire(
                        `Order is accepted!`,
                        `Order No. ${transaction_number} is now moved to<br/>Status 2: Accepted & Ongoing`,
                        'success'
                    );
                };
            })
        );
    };

    const rejectAlert = (transaction_number, newStatus) => {
        return (
            Swal.fire({
                icon: 'warning',
                title: `Reject Order No. ${transaction_number}?`,
                text: `You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonText: 'Reject',
            }).then((result) => {
                if (result.isConfirmed) {
                    changeOrderStatus(transaction_number, newStatus);
                    Swal.fire(
                        `Order is rejected!`,
                        `Order No. ${transaction_number} is now moved to<br/>Status 4: Failed / Cancelled`,
                        'success'
                    );
                };
            })
        );
    };

    return (
        <>
            <RenderShippingDetailsModal/>
            <RenderOrderDetailsModal/>
            <StatusButtons/>
            {
                (orders.length)
                ?
                orders.map((order) => {
                    return (
                        <OrderWrapper
                            transactionNumber={order.transaction_number}
                            createdAt={order.createdAt}
                            buttonLabel1="USER DETAILS"
                            onClickButton1={() => fetchUserDetailsData(order.transaction_number)}
                            buttonLabel2="ORDER DETAILS"
                            onClickButton2={() => fetchOrderDetailsData(order.transaction_number)}
                            totalPayment={order.total_payment.toLocaleString("in", "ID")}
                        >
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row" style={{ fontSize: 18 }}>
                                    Custom Prescription Request:
                                    <div className="ms-3" style={{ textAlign: "start" }}>
                                        <img src="" alt="" height="110" width="200"/>
                                    </div>
                                </div>
                                {
                                    status === 1
                                    ?
                                    <div className="d-flex flex-column mt-3">
                                        <button 
                                            className="orderRequestButton mb-2" 
                                            style={{ color: "forestgreen" }}
                                            onClick={() => confirmAlert(order.transaction_number, 2)}
                                        >
                                            <i class="fas fa-check-circle me-2"></i>
                                            Accept Order
                                        </button>
                                        <button 
                                            className="orderRequestButton" 
                                            style={{ color: "firebrick" }}
                                            onClick={() => rejectAlert(order.transaction_number, 4)}
                                        >
                                            <i class="fas fa-times-circle me-2"></i>
                                            Reject Order
                                        </button>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </OrderWrapper>
                    )
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
            <Pagination/>
        </>
    );
}
 
export default OrderRequestTable;