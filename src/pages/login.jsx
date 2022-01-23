import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import LoginForm from '../components/section/auth/loginForm';
import Illustration from '../assets/MedicineIllustration.svg'

const Login = () => {
    return (
        <div className="authPage">
            <div className="illustrationWrapper">
                <img 
                    className="px-4"
                    src={Illustration} 
                    alt="" 
                    style={{
                        width:"100%",
                        height: "auto"
                    }}
                ></img>
            </div>
            <AuthWrapper title="Login to your account">
                <LoginForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default Login;