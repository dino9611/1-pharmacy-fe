import React from 'react';
import DetailsModal from './detailsModal';

const OrderDetailsModal = (props) => {
    const OrderDetailsFooter = () => {
        return (
            <div className="d-flex flex-row justify-content-between" style={{ width: "100%" }}>
                <div>
                    <img src={props.orderDetails.map(orderDetail => orderDetail.payment_image_proof)} alt="" height="120" width="auto"/>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <p>Shipping Method: {props.shippingMethod}</p>
                    <p>Shipping Cost: Rp. {parseInt(props.shippingCost).toLocaleString("in", "ID")}</p>
                    <p>Total Payment: Rp. {props.orderDetails.reduce((prev, curr) => prev + curr.total_price, 0).toLocaleString("in", "ID")}</p>
                </div>
            </div>
        );
    };

    return (
        <DetailsModal
            size="xl"
            isOpen={props.orderDetails.length !== 0} 
            toggle={props.closeModal}
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
                    props.orderDetails.map((orderDetail, index) => {
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
 
export default OrderDetailsModal;
