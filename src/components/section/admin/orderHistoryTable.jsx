import React, { useState, useEffect }from 'react';
import '../../UI/adminInventory/style.css';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import { toast } from 'react-toastify'
import { useParams } from 'react-router';
import DetailsModal from '../../UI/adminInventory/detailsModal';
import OrderWrapper from '../../UI/adminInventory/orderWrapper';
import StatusButton from '../../UI/adminInventory/statusButton';

const OrderHistoryTable = (props) => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(1);
    const [openModalShippingDetails, setOpenModalShippingDetails] = useState(false);
    const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        const fetchOrderHistoryData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?filter=orderHistory&id=${id}&status=${status}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setOrders(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                    toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchOrderHistoryData();

        const fetchOrderDetailsData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory/order-details?filter=orderHistory&id=${id}&status=${status}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setOrderDetails(response.data);
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchOrderDetailsData();
    }, [id, status])

    const RenderShippingDetailsModal = () => {
        return (
            orders.map((order) => {
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
                        <p>Shipping Method: {orders.map(order => order.shipping_method)}</p>
                        <p>Shipping Cost: Rp. {orders.map(order => order.shipping_cost.toLocaleString("in", "ID"))}</p>
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
  
    const StatusButtons = () => {
        const underline = <div style={{ height: 2, width: "35%", backgroundColor: "var(--black-color)", marginTop: 7 }}></div>
        
        return (
            <div className="d-flex flex-row mb-3">
                <StatusButton
                    className={`${ status === 1 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "darkgray"
                    border= "2px solid gray"
                    onClick={() => setStatus(1)}
                    label="Under Review"
                    ternary={ status === 1 ? underline : null }
                />
                <StatusButton
                    className={`${ status === 2 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "var(--blue-color)"
                    border= "2px solid steelblue"
                    onClick={() => setStatus(2)}
                    label="Ongoing Delivery"
                    ternary={ status === 2 ? underline : null }
                />
                <StatusButton
                    className={`${ status === 3 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "limegreen"
                    border= "2px solid forestgreen" 
                    onClick={() => setStatus(3)}
                    label="Delivered & Finished"
                    ternary={ status === 3 ? underline : null }
                />
                <StatusButton
                    className={`${ status === 4 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "var(--red-color)"
                    border= "2px solid firebrick" 
                    onClick={() => setStatus(4)}
                    label="Cancelled / Failed"
                    ternary={ status === 4 ? underline : null }
                />
            </div>
        )
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
                            totalPayment={orderDetails.reduce((prev, curr) => prev + curr.total_price, 0).toLocaleString("in", "ID")}
                            buttonLabel1="SHIPPING DETAILS" 
                            onClickButton1={() => setOpenModalShippingDetails(!openModalShippingDetails)}
                            buttonLabel2="ORDER DETAILS" 
                            onClickButton2={() => setOpenModalOrderDetails(!openModalOrderDetails)}
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
}
 
export default OrderHistoryTable;