import React from 'react';
import DetailsModal from './detailsModal';

const OrderDetailsModal = (props) => {
    const customPrescriptions = props.orderDetails.filter(od => od.price === 0);
    const nonCustomPrescriptions = props.orderDetails.filter(od => od.price !== 0);
    const orderDetails = [...customPrescriptions, ...nonCustomPrescriptions];
    const totalPayment = orderDetails.reduce((prev, curr, i) => {
        if(curr.price === 0 && props.prescriptions[i]){
            return (
                prev += props.prescriptions[i].price
            )
        } else if (curr.price === 0){
            return (
                prev += 0
            )
        } else {
            return (
                prev += curr.total_price
            )
        }
    }, 0);

    const OrderDetailsFooter = () => {
        return (
            <div className="d-flex flex-row justify-content-between px-3" style={{ width: "100%" }}>
                <div style={{ border: "1px solid black", height: "auto", width: "auto" }}>
                    <img src={props.orderDetails.map(orderDetail => orderDetail.payment_image_proof)} alt="" height="180" width="auto"/>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-end">
                    <p>Shipping Method: {props.shippingMethod}</p>
                    <p>Shipping Cost: Rp. {parseInt(props.shippingCost).toLocaleString("in", "ID")}</p>
                    {totalPayment === 0 ?
                        <p>Total Payment: Rp. <span style={{ color: "var(--red-color) "}}>...</span></p>
                        :
                        <p>Total Payment: Rp. {(parseInt(totalPayment)+parseInt(props.shippingCost)).toLocaleString("in", "ID")}</p>
                    }         
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
                {orderDetails.map((orderDetail, index) => {
                    const prescriptionHasPrice = orderDetail.price === 0 && props.prescriptions[index];
                    const prescriptionPriceDisplay = prescriptionHasPrice
                        ? `Rp. ${props.prescriptions[index].price.toLocaleString("in", "ID")}`
                        : 'Rp. 0';
 
                    return (
                        <tbody>
                            <tr>
                            <th scope="row">{index + 1}.</th>
                            <td>
                                <img src={orderDetail.medicine_image} alt="" height="30" width="50"/>
                            </td>
                            <td>{orderDetail.medicine_name}</td>
                            <td>{orderDetail.quantity}</td>
                            {
                                prescriptionHasPrice ?
                                <td>{prescriptionPriceDisplay}</td>
                                :
                                <td>Rp. {orderDetail.price.toLocaleString("in", "ID")}</td>
                            }
                            {
                                prescriptionHasPrice ?
                                <td>{prescriptionPriceDisplay}</td>
                                :
                                <td>Rp. {orderDetail.total_price.toLocaleString("in", "ID")}</td>
                            }
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </DetailsModal>
    );
};
 
export default OrderDetailsModal;
