import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import RegisterForm from '../components/section/auth/registerForm';
import Illustration from '../assets/MedicineIllustration2.svg'

const Register = () => {
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
            <AuthWrapper title="Sign up your account">
                <RegisterForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default Register;