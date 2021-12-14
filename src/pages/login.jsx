import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import LoginForm from '../components/section/auth/loginForm';
import Illustration from '../assets/MedicineIllustration.svg'

const Login = () => {
    return (
        <div className="authPage d-flex justify-content-end align-items-end">
            <img src={Illustration} 
                alt="" 
                style={{
                    maxWidth: 500,
                    height: "auto",
                    transform: "translateX(-30px) translateY(-230px)"
                }}
            ></img>
            <AuthWrapper title="Login to your account">
                <LoginForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default Login;