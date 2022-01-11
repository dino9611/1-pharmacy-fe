import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import SquareButton from '../../UI/authInventory/squareButton';
import Input from '../../UI/authInventory/input';
import { toast } from "react-toastify";
import { API_URL } from '../../../constants/api';

const ForgotPasswordForm = (props) => {

    const [forgotPasswordEmail, setforgotPasswordEmail] = useState("");

    const onFormInputChange = (value) => {
        setforgotPasswordEmail(value);
    };

    const onClickForgotPasswordButton = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(`${API_URL}/forgotPassword`, { email: forgotPasswordEmail });

            toast.success("Email is sent!", {
                position: "top-right",
                icon: "🚀"
            });
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }

    return (
        <div>
            <p style={{ color: "var(--gray-color)", marginTop: -20 }}>
                Instructions to reset your password will be sent to your email.
            </p>
            <div className="mb-5 mt-4">
                <Input 
                    type="text" 
                    onChange={onFormInputChange}
                    name="email" 
                    value={forgotPasswordEmail} 
                    placeholder="email"
                />
                <SquareButton label="SEND EMAIL" className="mt-4" onClick={onClickForgotPasswordButton}/>        
            </div>
            <div>
                <p className="mb-0">Already have an account?</p>
                <Link to="/login" style={{ color: "var(--pink-color)" }}>Login</Link> or <Link to="/register" style={{ color: "var(--pink-color)" }}>Sign Up</Link>
            </div>
        </div>
    );
}
 
export default withRouter(ForgotPasswordForm);