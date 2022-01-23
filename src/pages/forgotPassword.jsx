import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import ForgotPasswordForm from '../components/section/auth/forgotPasswordForm';
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
            <AuthWrapper title="Forgot your password?">
                <ForgotPasswordForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default ForgotPassword;