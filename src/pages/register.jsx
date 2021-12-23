import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import RegisterForm from '../components/section/auth/registerForm';
import Illustration from '../assets/MedicineIllustration2.svg'

const Register = () => {
    return (
        <div className="authPage d-flex justify-content-end align-items-end">
            <img 
                src={Illustration} 
                alt="" 
                style={{
                    maxWidth: 500,
                    height: "auto",
                    transform: "translateX(-30px) translateY(-230px)"
                }}
            ></img>
            <AuthWrapper title="Sign up your account">
                <RegisterForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default Register;