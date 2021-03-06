import React from 'react';
import medicine from '../../../assets/medicine.png';
import prescription from '../../../assets/prescription.png';
import healthAndLifestyle from '../../../assets/healthAndLifestyle.png';
import '../../../components/UI/adminInventory/style.css';
import { useHistory } from 'react-router-dom';
import './style.css';

const HomeContainer2 = (props) => {
    let history = useHistory();
    
	return (
		<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "75vh", backgroundColor: "whitesmoke", color: "var(--black-color)" }}>
            <h2>
                HERE'S WHERE TO START
            </h2>
            <div className="d-flex flex-row justify-content-center align-items-center my-4">
                <button className="mainMenus ms-3 me-3 px-4" onClick={() => {history.push("/store")}}>
                    <img
                        src={medicine}
                        alt="medicine"
                        height="50%"
                        className="mb-4"
                    />
                    <h4>
                        Medicine & Pharmacy
                    </h4>
                </button>
                <button className="mainMenus ms-3 me-3 px-4" onClick={() => {history.push('/custom')}}>
                    <img
                        src={prescription}
                        alt="prescription"
                        height="50%"
                        className="mb-4"
                    />
                    <h4>
                        Order Custom<br/>Prescription
                    </h4>
                </button>
                <button className="mainMenus ms-3 me-3 px-4" onClick="">
                    <img
                        src={healthAndLifestyle}
                        alt="healthAndLifestyle"
                        height="50%"
                        className="mb-4"
                    />
                    <h4>
                        Health & Lifestyle Tips
                    </h4>
                </button>
            </div>
        </div>
	);
}

export default HomeContainer2;
