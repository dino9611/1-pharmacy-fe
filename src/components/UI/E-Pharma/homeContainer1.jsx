import React from 'react';
import '../../../components/UI/adminInventory/style.css';

const HomeContainer1 = (props) => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "40vh", backgroundColor: "mistyrose", color: "var(--black-color)" }}>
            <h4>
                CHANGING THE PHARMACY AISLE. FOR GOOD.
            </h4>
            <p className="text-center">
                <br />
                It could be hard store-hopping from aisle to aisle searching for your medicine.
                <br/>
                So whenever you need help or in a medical urgency, <b style={{ fontWeight: 600 }}>you never have to risk it anymore.</b> 
                <br/>
                This is why Obatin is <b style={{ fontWeight: 600 }}>online 24/7</b>, always here whenever and wherever you need us.
                <br/>
                <br />
                No confusion, no waiting, just order and <b style={{ fontWeight: 600 }}>Obatin will immediately deliver it right into your footstep.</b>
            </p>
        </div>
	);
}

export default HomeContainer1;
