import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import ResetPasswordForm from '../components/section/auth/resetPasswordForm';
import Illustration from '../assets/MedicineIllustration3.svg'

const ForgotPassword = () => {
    return (
        <div className="authPage">
            <div className="illustrationWrapper">
                <img 
                    className="px-4"
                    src={Illustration} 
                    alt="" 
                    style={{
                        width:"100%",
                        height: "auto",
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