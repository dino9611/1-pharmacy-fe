import React from 'react';
import DetailsModal from '../../UI/adminInventory/detailsModal';

const ShippingDetailsModal = (props) => {
    return (
        props.shippingDetails.map((shippingDetail) => {
            return (
                <DetailsModal
                    size="md"
                    isOpen={props.shippingDetails.length !== 0} 
                    toggle={props.closeModal}
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
}
 
export default ShippingDetailsModal;
