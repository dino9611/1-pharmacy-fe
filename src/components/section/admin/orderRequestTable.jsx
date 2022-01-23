import React, { useState, useEffect, useCallback } from 'react';
import OrderWrapper from '../../UI/adminInventory/orderWrapper';
import '../../UI/adminInventory/style.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import Swal from 'sweetalert2';
import ShippingDetailsModal from '../../UI/adminInventory/shippingDetailsModal';
import CustomPrescriptionsModal from '../../UI/adminInventory/customPrescriptionsModal';
import OrderDetailsModal from '../../UI/adminInventory/orderDetailsModal';
import StatusButtons from '../../UI/adminInventory/statusButtons';
import Pagination from '../../controller/Pagination';
import DashboardLoading from '../../../pages/dashboardLoading';

const OrderRequestTable = (props) => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(1);

    const [page, setPage] = useState(1);
    const limit = 10;
    const [total, setTotal] = useState(0);

    const [customPrescriptions, setCustomPrescriptions] = useState([]);
    const [shippingDetails, setShippingDetails] = useState([]);

    const [orderDetails, setOrderDetails] = useState([]);
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingCost, setShippingCost] = useState(null);

    const [orderHasPrescriptionServed, setOrderHasPrescriptionServed] = useState({});
    const [orderHasPrescriptionPrice, setOrderHasPrescriptionPrice] = useState({});
    const [prescriptionsToBeSubmitted, setPrescriptionsToBeSubmitted] = useState([]);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);

    const [loading, setLoading] = useState(true);

    const changePageHandler = (value) => {
		setPage(value);
	};

    const fetchOrdersData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?filter=byOrder&status=${status}&limit=${limit}&page=${page}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setOrders(response.data.data);
            setTotal(response.data.meta.total[0].total_data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data.message || error.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }, [page, status]);

    useEffect(() => {
        fetchOrdersData();         
    }, [fetchOrdersData]);

    const fetchCustomPrescriptionData = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory/order-details?filter=byOrder&page=customPrescription&status=${status}&id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setCustomPrescriptions(response.data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data.message || error.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }
    
    const fetchShippingDetailsData = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?status=${status}&id=${id}`, {
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
    };
    
    const fetchOrderDetailsData = async (id, index) => {
        setSelectedOrderIndex(index);
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory/order-details?filter=byOrder&status=${status}&id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setOrderDetails(response.data);
            setShippingMethod(response.data[0].shipping_method);
            setShippingCost(response.data[0].shipping_cost);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const acceptOrRejectAction = async (id, newStatus) => {
        try {
            let dataBody = {
                prescriptionsToBeSubmitted
            };

            await axios.post(`${API_URL}/admin/transactions/orderRequest?id=${id}&newStatus=${newStatus}`, dataBody, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            fetchOrdersData();
        } catch (error) {
            Swal.fire(
                `Error`,
                `Please try again!`,
                'error'
            );
        }
    };

    const confirmAlert = (transaction_number, id, newStatus) => {
        return (
            Swal.fire({
                icon: 'warning',
                title: `Accept Order No. ${transaction_number}?`,
                text: `You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonText: 'Accept',
            }).then((result) => {
                if (result.isConfirmed) {
                    acceptOrRejectAction(id, newStatus);
                    Swal.fire(
                        `Order is accepted!`,
                        `Order No. ${transaction_number} is now moved to<br/>Status 2: Accepted & Ongoing`,
                        'success'
                    );
                };
            })
        );
    };

    const rejectAlert = (transaction_number, id, newStatus) => {
        return (
            Swal.fire({
                icon: 'warning',
                title: `Reject Order No. ${transaction_number}?`,
                text: `You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonText: 'Reject',
            }).then((result) => {
                if (result.isConfirmed) {
                    acceptOrRejectAction(id, newStatus);
                    Swal.fire(
                        `Order is rejected!`,
                        `Order No. ${transaction_number} is now moved to<br/>Status 4: Failed / Cancelled`,
                        'success'
                    );
                };
            })
        );
    };

    const closeCustomPrescriptionsModal = (prescriptionDatas) => {
        setCustomPrescriptions([]);
        const newPrescriptionsToBeSubmitted = [...prescriptionsToBeSubmitted,
            ...prescriptionDatas
        ];
        setPrescriptionsToBeSubmitted(newPrescriptionsToBeSubmitted);

        const newOrderHasPrescriptionServed = {
            ...orderHasPrescriptionServed
        };

        newPrescriptionsToBeSubmitted.forEach((prescriptionToBeSubmitted) => {
            newOrderHasPrescriptionServed[prescriptionToBeSubmitted.orderID] = true;
        });
        setOrderHasPrescriptionServed(newOrderHasPrescriptionServed);

        const newOrderHasPrescriptionPrice = {
            ...orderHasPrescriptionPrice
        };
        
        newPrescriptionsToBeSubmitted.forEach((prescriptionToBeSubmitted) => {
            if(newOrderHasPrescriptionPrice[prescriptionToBeSubmitted.orderID]){
                newOrderHasPrescriptionPrice[prescriptionToBeSubmitted.orderID] += prescriptionToBeSubmitted.price;
            } else {
                newOrderHasPrescriptionPrice[prescriptionToBeSubmitted.orderID] = prescriptionToBeSubmitted.price;
            }
        });
        setOrderHasPrescriptionPrice(newOrderHasPrescriptionPrice);

        setSelectedOrderIndex(null);
    };

    return (
        <>
            <ShippingDetailsModal 
                shippingDetails={shippingDetails} 
                closeModal={() => setShippingDetails([])}
            />
            <OrderDetailsModal 
                orderDetails={orderDetails} 
                shippingMethod={shippingMethod} 
                shippingCost={shippingCost} 
                closeModal={() => setOrderDetails([])}
                prescriptions={selectedOrderIndex != null ? prescriptionsToBeSubmitted.filter(prescriptionToBeSubmitted => prescriptionToBeSubmitted.orderID === orders[selectedOrderIndex].id) : []}
            />
            <CustomPrescriptionsModal 
                customPrescriptions={customPrescriptions} 
                closeModal={(prescriptionDatas) => closeCustomPrescriptionsModal(prescriptionDatas)}
            />
            <StatusButtons
                status={status}
                onClick={(value) => setStatus(value)}
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
                            buttonLabel1="USER DETAILS"
                            onClickButton1={() => fetchShippingDetailsData(order.id)}
                            buttonLabel2="ORDER DETAILS"
                            onClickButton2={() => fetchOrderDetailsData(order.id, index)}
                            totalPayment={
                                (orderHasPrescriptionPrice[order.id]) ?
                                (parseInt(orderHasPrescriptionPrice[order.id]) + parseInt(order.total_payment) + parseInt(order.shipping_cost)).toLocaleString("in", "ID")
                                : 
                                <span style={{ color: "var(--red-color)" }}>...</span>
                            }
                        >
                            <div className="d-flex flex-row" style={{ fontSize: 18 }}>
                                Custom Prescription Request:
                                {orderHasPrescriptionServed[order.id] || status === 2 || status === 3 || status === 4
                                    ?
                                    <div 
                                        className="ms-3" 
                                        style={{ fontSize: 23, textAlign: "start", paddingLeft: 0, width: 200, height: 110, marginTop: 10, position:"relative" }}>
                                        <img className="customPrescriptionImage" src="https://www.researchgate.net/profile/Sandra-Benavides/publication/228331607/figure/fig4/AS:667613038387209@1536182760366/Indicate-why-the-prescription-is-not-appropriate-as-written.png" alt="" width="200" height="110"/>
                                        <i class="fas fa-check-circle" style={{ fontSize: 30, color: "var(--pink-color)", position:"absolute", top: -10, right: -10 }}></i>
                                        <p className="centered">DONE</p>
                                    </div>
                                    :
                                    <div 
                                        className="ms-3 container" 
                                        style={{ textAlign: "start", paddingLeft: 0, width: 200, height: 110, marginTop: 10, position:"relative" }} 
                                        onClick={() => fetchCustomPrescriptionData(order.id)}
                                    >
                                        <img className="customPrescriptionImage" src="https://www.researchgate.net/profile/Sandra-Benavides/publication/228331607/figure/fig4/AS:667613038387209@1536182760366/Indicate-why-the-prescription-is-not-appropriate-as-written.png" alt="" width="200" height="110"/>
                                        <p className="centered">EDIT</p>
                                    </div>
                                }
                            </div>
                            {
                                status === 1
                                &&
                                <div className="d-flex flex-column mt-3">
                                    <button 
                                        className="orderRequestButton mb-2" 
                                        style={{ color: "forestgreen" }}
                                        onClick={() => confirmAlert(order.transaction_number, order.id, 2)}
                                    >
                                        <i class="fas fa-check-circle me-2"></i>
                                        Accept Order
                                    </button>
                                    <button 
                                        className="orderRequestButton" 
                                        style={{ color: "firebrick" }}
                                        onClick={() => rejectAlert(order.transaction_number, order.id, 4)}
                                    >
                                        <i class="fas fa-times-circle me-2"></i>
                                        Reject Order
                                    </button>
                                </div>
                            }
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
            <Pagination
                className="mt-4"
                onPageChange={changePageHandler}
                totalCount={total}
                siblingCount={2}
                currentPage={page}
                pageSize={limit}
            />
        </>
    );
}
 
export default OrderRequestTable;