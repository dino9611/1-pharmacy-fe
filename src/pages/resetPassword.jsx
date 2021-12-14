import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import ResetPasswordForm from '../components/section/auth/resetPasswordForm';
import Illustration from '../assets/MedicineIllustration3.svg'

const ForgotPassword = () => {
    return (
        <div className="authPage d-flex justify-content-end align-items-end">
            <img src={Illustration} 
                alt="" 
                style={{
                    maxWidth: 450,
                    height: "auto",
                    transform: "translateX(-60px) translateY(-230px)"
                }}
            ></img>
            <AuthWrapper title="Reset your password">
                <ResetPasswordForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default ForgotPassword;