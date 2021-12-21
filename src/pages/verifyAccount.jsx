import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import Illustration from '../assets/MedicineIllustration3.svg'
import AccountStatus from '../components/section/auth/accountStatus';

const VerifyAccount = () => {
    return (
        <div className="authPage d-flex justify-content-end align-items-end">
            <img 
                src={Illustration} 
                alt="" 
                style={{
                    maxWidth: 450,
                    height: "auto",
                    transform: "translateX(-60px) translateY(-230px)"
                }}
            ></img>
            <AuthWrapper title="Profile">
                <AccountStatus/>
            </AuthWrapper>
        </div>
    );
}
 
export default VerifyAccount;