import React from 'react';
import '../style.css'
import AuthWrapper from '../components/UI/authInventory/authWrapper';
import RegisterForm from '../components/section/auth/registerForm';
import Illustration from '../assets/MedicineIllustration2.svg'

const Register = () => {
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
            <AuthWrapper title="Sign up your account">
                <RegisterForm/>
            </AuthWrapper>
        </div>
    );
}
 
export default Register;