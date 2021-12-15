import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import useAxios from '../../../hooks/useAxios';
import RedirectButton from '../../UI/authInventory/redirectButton';
import Input from '../../UI/authInventory/input';
import { toast } from "react-toastify";

const ForgotPasswordForm = (props) => {

    const [forgotPasswordEmail, setforgotPasswordEmail] = useState("");

    const onFormInputChange = (value) => {
        setforgotPasswordEmail(value);
    };

    const [requestBody, setRequestBody] = useState(null);

    let { response, error, loading } = useAxios({
        url: `http://localhost:2001/forgotPassword`,
        method: 'post',
        body: requestBody
    });

    const onClickForgotPasswordButton = async (e) => {
        e.preventDefault();
        
        try {
            setRequestBody({
                email: forgotPasswordEmail
            });

            toast.success("Email is sent!", {
                position: "top-right",
                icon: "🚀"
            });
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵‍💫"
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
                <RedirectButton label="SEND EMAIL" className="mt-4" onClick={onClickForgotPasswordButton}/>        
            </div>
            <div>
                <p className="mb-0">Already have an account?</p>
                <Link to="/login" style={{ color: "var(--blue-color)" }}>Login</Link> or <Link to="/register" style={{ color: "var(--blue-color)" }}>Sign Up</Link>
            </div>
        </div>
    );
}
 
export default withRouter(ForgotPasswordForm);