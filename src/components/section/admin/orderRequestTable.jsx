import React, { useState, useEffect, useCallback } from 'react';
import OrderWrapper from '../../UI/adminInventory/orderWrapper';
import StatusButton from '../../UI/adminInventory/statusButton';
import '../../UI/adminInventory/style.css';
import { toast } from 'react-toastify'
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import DetailsModal from '../../UI/adminInventory/detailsModal';
import Swal from 'sweetalert2';
// import Pagination from '../../controller/Pagination';

const OrderRequestTable = (props) => {
    const [orders, setOrders] = useState([]);
    const [shippingDetails, setShippingDetails] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [customPrescription, setCustomPrescription] = useState([]);
    const [status, setStatus] = useState(1);
    const [openModalShippingDetails, setOpenModalShippingDetails] = useState(false);
    const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);
    const [openModalCustomPrescription, setOpenModalCustomPrescription] = useState(false);
    // const [page, setPage] = useState(1);
    // const limit = 10;
    // const [total, setTotal] = useState(0);

    // const changePageHandler = (value) => {
	// 	setPage(value);
	// };

    const [shippingMethod, setShippingMethod] = useState();
    const [shippingCost, setShippingCost] = useState();

    const fetchOrdersData = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?filter=all&status=${status}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setOrders(response.data.data);
            // setTotal(response.data.meta.total);
        } catch (error) {
            toast.error(error.response?.data.message || error.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }, [status]);

    
    useEffect(() => {
        fetchOrdersData();         
    }, [fetchOrdersData]);
    
    const fetchShippingDetailsData = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?status=${status}&id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setShippingDetails(response.data.data);
            console.log(response.data)
            setOpenModalShippingDetails(!openModalShippingDetails);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };
    
    
    const fetchOrderDetailsData = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory/order-details?filter=all&status=${status}&id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setOrderDetails(response.data);
            setShippingMethod(response.data[0].shipping_method);
            setShippingCost(response.data[0].shipping_cost);
            setOpenModalOrderDetails(!openModalOrderDetails);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const fetchCustomPrescriptionData = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?order-details?filter=customPrescription&status=${status}&id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
            setCustomPrescription(response.data.data);
            setOpenModalCustomPrescription(!openModalCustomPrescription);
        } catch (error) {
            toast.error(error.response?.data.message || error.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };
    
    const RenderShippingDetailsModal = () => {
        return (
            shippingDetails.map((shippingDetail) => {
                return (
                    <DetailsModal
                        size="md"
                        isOpen={openModalShippingDetails} 
                        toggle={() => setOpenModalShippingDetails(!openModalShippingDetails)}
                        title="Shipping Details"
                    >
                        <p>
                            Recipent Name: {shippingDetail.recipent_name}
                        </p>
                        <p>
                            Recipent Phone Number: {shippingDetail.recipent_phone_number}
                        </p>
                        <p>
                            Shipping Address: {shippingDetail.shipping_address}
                        </p>
                        <p>
                            Shipping Method: {shippingDetail.shipping_method}
                        </p>
                        <p>
                            Shipping Cost: Rp. {shippingDetail.shipping_cost.toLocaleString("in", "ID")}
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
                        <p>Shipping Method: {shippingMethod}</p>
                        <p>Shipping Cost: Rp. {shippingCost}</p>
                        <p>Total Payment: Rp. {orderDetails.reduce((prev, curr) => prev + curr.total_price, 0).toLocaleString("in", "ID")}</p>
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

    const RenderCustomPrescriptionModal = () => {
        return (
            <DetailsModal
                size="xl"
                isOpen={openModalCustomPrescription} 
                toggle={() => setOpenModalCustomPrescription(!openModalCustomPrescription)}
                title="Custom Prescription Order"
            >
                
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

    const changeOrderStatus = async (id, newStatus) => {
        try {
            const response = await axios.post(`${API_URL}/admin/transactions/orderRequest?id=${id}&newStatus=${newStatus}`);
            console.log(response.data);
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
                    changeOrderStatus(id, newStatus);
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
                    changeOrderStatus(id, newStatus);
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
            <RenderCustomPrescriptionModal/>
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
                            onClickButton1={() => fetchShippingDetailsData(order.id)}
                            buttonLabel2="ORDER DETAILS"
                            onClickButton2={() => fetchOrderDetailsData(order.id)}
                            totalPayment={order.total_payment.toLocaleString("in", "ID")}
                        >
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row" style={{ fontSize: 18 }}>
                                    Custom Prescription Request:
                                    <div 
                                        className="ms-3 container" 
                                        style={{ textAlign: "start", paddingLeft: 0, width: 200, height: 110 }} 
                                        onClick={() => fetchCustomPrescriptionData(order.id, order.custom_prescription_id, order.custom_prescription_image)}>
                                        <img className="customPrescriptionImage" src="https://www.researchgate.net/profile/Sandra-Benavides/publication/228331607/figure/fig4/AS:667613038387209@1536182760366/Indicate-why-the-prescription-is-not-appropriate-as-written.png" alt="" width="200" height="110"/>
                                        <p className="centered">EDIT</p>
                                    </div>
                                </div>
                                {
                                    status === 1
                                    ?
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
            {/* <Pagination
                className="mt-4"
                onPageChange={changePageHandler}
                totalCount={total}
                siblingCount={2}
                currentPage={page}
                pageSize={limit}
            /> */}
        </>
    );
}
 
export default OrderRequestTable;