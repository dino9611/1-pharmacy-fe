import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import ResetPasswordForm from '../components/section/auth/resetPasswordForm';
import Illustration from '../assets/MedicineIllustration3.svg'

const ForgotPassword = () => {
    return (
        <div className="authPage d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center" style={{ width: "40vw"}}>
                <img 
                    src={Illustration} 
                    alt="" 
                    style={{
                        maxWidth: 450,
                        height: "auto",
                        transform: "translateX(-60px) translateY(-230px)"
                    }}
                ></img>
            </div>
            <AuthWrapper title="Reset your password">
                <ResetPasswordForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default ForgotPassword;