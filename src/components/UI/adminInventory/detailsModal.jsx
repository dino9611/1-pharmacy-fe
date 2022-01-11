import React from 'react';
import './style.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const DetailsModal = (props) => {
    return (
        <div>
            <Modal
                scrollable
                centered
                size={props.size}
                isOpen={props.isOpen} 
                toggle={props.toggle}
            >
                <ModalHeader style={{ color: "var(--pink-color)"}}>
                    <i class="fas fa-shopping-bag pe-2"></i> {props.title}
                </ModalHeader>
                <ModalBody>
                    {props.children}
                </ModalBody>
                {
                    (props.footer)
                    ?
                    <ModalFooter>
                        {props.footer}
                    </ModalFooter>
                    :
                    null
                }
            </Modal>
        </div>
    );
}
 
export default DetailsModal;