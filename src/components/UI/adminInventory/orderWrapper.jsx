import React from 'react';
import './style.css';
import SquareButton from '../authInventory/squareButton';

const OrderWrapper = (props) => {
    return (
        <div 
            className="d-flex justify-content-center flex-column mb-3 p-4"
            style={{ 
                width: "100%",
                minHeight: "20vh",
                backgroundColor: "seashell",
                color: "var(--black-color)",
                border: "2px solid var(--black-color)",
                boxShadow: "1px 5px 15px -5px gray",
                WebkitBoxShadow: "1px 5px 15px -5px gray",
                MozBoxShadow: "1px 5px 15px -5px gray",
                borderRadius: 20,
            }}
        >
            <div className="d-flex flex-row justify-content-between">
                <h5>Order No. {props.transactionNumber}</h5>
                <h5>{props.createdAt}</h5>
            </div>
            <div className="mt-0 mb-3" style={{ width: "100%", height: 1, backgroundColor: "silver" }}></div>
            <div className="d-flex flex-row justify-content-between" style={{ fontSize: 18 }}>
                <p>Total Payment: Rp. {props.totalPayment}</p>
                <div>
                    <SquareButton 
                        className="me-3" 
                        label={props.buttonLabel1}
                        onClick={props.onClickButton1}
                    /> 
                    <SquareButton 
                        label={props.buttonLabel2}
                        onClick={props.onClickButton2}
                    /> 
                </div>
            </div>
            {props.children}
        </div>
    );
}
 
export default OrderWrapper;