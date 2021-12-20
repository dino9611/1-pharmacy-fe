import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../../UI/authInventory/input';
import RedirectButton from '../../UI/authInventory/redirectButton';
import axios from 'axios';
import { API_URL } from '../../../constants/api';

const ResetPasswordForm = (props) => {
    const [resetPassword, setResetPassword] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });


    const onFormInputChange = (value, name) => {
        setResetPassword({...resetPassword, [name]: value });
    };


    const onClickResetPasswordButton = async (e) => {
        e.preventDefault();
        const { newPassword, confirmNewPassword } = resetPassword;

        if (newPassword === confirmNewPassword) {
            try {
                await axios.post(`${API_URL}/register`, { newPassword });

                toast.success("Password is reset!", {
                    position: "top-right",
                    icon: "🚀"
                });
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        } else {
            toast.error("Password and confirm password does not match", {
                position: "top-right",
                icon: "❎"
            });
        }
    }

    return (
        <div>
            <div className="mb-5 mt-4">
                <Input 
                    type="password"
                    onChange={onFormInputChange}
                    name="newPassword" 
                    value={resetPassword.newPassword} 
                    placeholder="new password"
                />
                <Input 
                    type="password"
                    onChange={onFormInputChange}
                    name="confirmNewPassword" 
                    value={resetPassword.confirmNewPassword} 
                    placeholder="confirm new password"
                />
                <RedirectButton label="SEND EMAIL" className="mt-4" onClick={onClickResetPasswordButton}/>        
            </div>
        </div>
    );
}
 
export default ResetPasswordForm;