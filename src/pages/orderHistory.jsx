import React, { useState }from 'react';
import '../style.css';
import axios from 'axios';
import { API_URL } from '../constants/api'
import { toast } from 'react-toastify'
import { withRouter, useParams } from 'react-router';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import SquareButton from '../components/UI/authInventory/squareButton';
import { useEffect } from 'react';

const OrderHistory = (props) => {
    const { history } = props;
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(1);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/transactions/userDatas/orderHistory?id=${id}&status=${status}`);
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                    toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchData();
    }, [id, status])

    const [openModalShippingDetails, setOpenModalShippingDetails] = useState(false);
    const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);

    const RenderShippingDetailsModal = () => {
        return (
            orders.map((order) => {
                return (
                    <div>
                        <Modal
                        centered
                        size="md"
                        isOpen={openModalShippingDetails} 
                        toggle={() => setOpenModalShippingDetails(!openModalShippingDetails)}
                        >
                        <ModalHeader style={{ color: "var(--pink-color)"}}>
                            <i class="fas fa-shipping-fast pe-2"></i> Shipping Details
                        </ModalHeader>
                        <ModalBody>
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
                        </ModalBody>
                        </Modal>
                    </div>
                );
            })
        );
    };

    const RenderOrderDetailsModal = () => {
        return (
            orders.map((order) => {   
                return (
                  <div>
                    <Modal
                        scrollable
                        centered
                        size="lg"
                        isOpen={openModalOrderDetails} 
                        toggle={() => setOpenModalOrderDetails(!openModalOrderDetails)}
                    >
                        <ModalHeader style={{ color: "var(--pink-color)"}}>
                            <i class="fas fa-shopping-bag pe-2"></i> Order Details
                        </ModalHeader>
                        <ModalBody>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Order</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">1</th>
                                    <td>foto</td>
                                    <td>{order.recipent_name}</td>
                                    <td>4</td>
                                    <td>Rp. 429393</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">2</th>
                                    <td>foto</td>
                                    <td>Jacob</td>
                                    <td>3</td>
                                    <td>Rp. 429393</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">3</th>
                                    <td>foto</td>
                                    <td>Larry the Bird</td>
                                    <td>23</td>
                                    <td>Rp. 429393</td>
                                    </tr>
                                </tbody>
                            </table>
                        </ModalBody>
                        <ModalFooter className="d-flex flex-row justify-content-between">
                            <div>
                                <p>PAYMENT PROOF HERE</p>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                                <p>Shipping Method: {order.shipping_method}</p>
                                <p>Shipping Cost: Rp. {order.shipping_cost.toLocaleString("in", "ID")}</p>
                                <p>Total Payment: Rp. xxxx</p>
                            </div>
                        </ModalFooter>
                    </Modal>
                  </div>
                );
            })
        );
    };

    return (
        <div className="m-5">
            <RenderShippingDetailsModal/>
            <RenderOrderDetailsModal/>
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


            <div className="d-flex flex-row mb-4">
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "darkgray", 
                        border: "2px solid gray" 
                    }}
                    onClick={() => setStatus(1)}
                >
                    Under Review
                </button>
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "var(--blue-color)", 
                        border: "2px solid steelblue" 
                    }}
                    onClick={() => setStatus(2)}
                >
                    Ongoing Delivery
                </button>
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "limegreen", 
                        border: "2px solid forestgreen" 
                    }}
                    onClick={() => setStatus(3)}
                >
                    Delivered & Finished
                </button>
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "var(--red-color)", 
                        border: "2px solid firebrick" 
                    }}
                    onClick={() => setStatus(4)}
                >
                    Cancelled / Failed
                </button>
            </div>


            {
                orders.map((order) => {
                    return (
                        <div 
                            className="d-flex justify-content-center flex-column mb-3 p-4"
                            style={{ 
                                width: "100%",
                                height: "20vh",
                                backgroundColor: "seashell",
                                color: "var(--black-color)",
                                border: "2px solid var(--black-color)",
                                boxShadow: "1px 5px 15px -5px gray",
                                borderRadius: 20,
                            }}
                        >
                            <div className="d-flex flex-row justify-content-between">
                                <h5>Order No. {order.transaction_number}</h5>
                                <h5>{order.createdAt}</h5>
                            </div>
                            <hr className="mt-0"/>
                            <div className="d-flex flex-row justify-content-between" style={{ fontSize: 18 }}>
                                <p>Total Payment: Rp. xxx</p>
                                <div>
                                    <SquareButton 
                                        className="me-3" 
                                        label="SHIPPING DETAILS" 
                                        onClick={() => setOpenModalShippingDetails(!openModalShippingDetails)}
                                    /> 
                                    <SquareButton 
                                        label="ORDER DETAILS" 
                                        onClick={() => setOpenModalOrderDetails(!openModalOrderDetails)}
                                    /> 
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
 
export default withRouter(OrderHistory);