import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import LoginForm from '../components/section/auth/loginForm';
import Illustration from '../assets/MedicineIllustration.svg'

const Login = () => {
    return (
        <div className="authPage d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center align-items-center" style={{ width: "40vw" }}>
                <img
                    src={Illustration}
                    alt=""
                    style={{
                        width: "35vw",
                        height: "auto"
                    }}
                ></img>
            </div>
            <AuthWrapper title="Login to your account">
                <LoginForm />
            </AuthWrapper>
        </div>
    );
}

export default Login;