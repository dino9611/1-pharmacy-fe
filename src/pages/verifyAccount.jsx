import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import Illustration from '../assets/MedicineIllustration3.svg'
import AccountStatus from '../components/section/auth/accountStatus';

const VerifyAccount = () => {
    return (
        <div className="authPage d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center" style={{ width: "40vw"}}>
                <img 
                    src={Illustration} 
                    alt="" 
                    style={{
                        width:"35vw",
                        height: "auto",
                    }}
                ></img>
            </div>
            <AuthWrapper>
                <AccountStatus/>
            </AuthWrapper>
        </div>
    );
}
 
export default VerifyAccount;