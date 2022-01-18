import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import ForgotPasswordForm from '../components/section/auth/forgotPasswordForm';
import Illustration from '../assets/MedicineIllustration3.svg'

const ForgotPassword = () => {
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
            <AuthWrapper title="Forgot your password?">
                <ForgotPasswordForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default ForgotPassword;