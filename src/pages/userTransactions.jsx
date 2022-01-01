import React, { useState }from 'react';
import '../style.css';
import axios from 'axios';
import { API_URL } from '../constants/api'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import SquareButton from '../components/UI/authInventory/squareButton';

const UserTransactions = (props) => {
    const { history } = props;

    const fetchShippingDetails = async () => {
        try {
            setOpenModalShippingDetails(!openModalShippingDetails);
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const fetchOrderDetails = async () => {
        try {
            setOpenModalOrderDetails(!openModalOrderDetails);
        } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const [openModalShippingDetails, setOpenModalShippingDetails] = useState(false);
    const [openModalOrderDetails, setOpenModalOrderDetails] = useState(false);

    const RenderShippingDetailsModal = () => {
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
                  Recipent Name:
                </p>
                <p>
                  Recipent Phone Number: 
                </p>
                <p>
                  Shipping Address:
                </p>
                <p>
                  Shipping Method:
                </p>
                <p>
                  Shipping Cost:
                </p>
              </ModalBody>
            </Modal>
          </div>
        )
    };

    const RenderOrderDetailsModal = () => {
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
                            <td>Mark</td>
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
                        <p>Shipping Method: JNE</p>
                        <p>Shipping Cost: Rp. 123329</p>
                        <p>Total Payment: Rp. 35843942</p>
                    </div>
                </ModalFooter>
            </Modal>
          </div>
        )
    };

    return (
        <div className="m-5">
            <RenderShippingDetailsModal/>
            <RenderOrderDetailsModal/>
            <div className="d-flex flex-row">
                <div
                    className="navbarButton"
                    style={{ 
                        fontSize: 22, 
                        paddingRight: 10,
                    }}
                    onClick={() => {history.push("/admin/userHistory")}}
                >
                    <i class="fas fa-arrow-left"></i>
                </div>
                <h3 className="mb-4">User Transactions History</h3>
            </div>
            <div className="d-flex flex-row mb-3">
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "darkgray", 
                        border: "2px solid gray" 
                    }}
                >
                    Under Review
                </button>
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "var(--blue-color)", 
                        border: "2px solid steelblue" 
                    }}
                >
                    Ongoing Delivery
                </button>
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "limegreen", 
                        border: "2px solid forestgreen" 
                    }}
                >
                    Delivered & Finished
                </button>
                <button 
                    className="transactionsButton" 
                    style={{ 
                        backgroundColor: "var(--red-color)", 
                        border: "2px solid firebrick" 
                    }}
                >
                    Cancelled / Failed
                </button>
            </div>


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
                    <h5>Order No. 42838921832</h5>
                    <h5>31/12/2001</h5>
                </div>
                <hr className="mt-0"/>
                <div className="d-flex flex-row justify-content-between" style={{ fontSize: 18 }}>
                    <p>Total Payment: Rp. 482,334,344</p>
                    <div>
                        <SquareButton 
                            className="me-3" 
                            label="SHIPPING DETAILS" 
                            onClick={() => fetchShippingDetails()}
                        /> 
                        <SquareButton 
                            label="ORDER DETAILS" 
                            onClick={() => fetchOrderDetails()}
                        /> 
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default withRouter(UserTransactions);