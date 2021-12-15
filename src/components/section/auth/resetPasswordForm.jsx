import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxios from '../../../hooks/useAxios';
import Input from '../../UI/authInventory/input';
import RedirectButton from '../../UI/authInventory/redirectButton';

const ResetPasswordForm = (props) => {
    const [resetPassword, setResetPassword] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });


    const onFormInputChange = (value, name) => {
        setResetPassword({...resetPassword, [name]: value });
    };

    const [requestBody, setRequestBody] = useState(null);

    let { response, error, loading } = useAxios({
        url: `http://localhost:2001/resetPassword`,
        method: 'post',
        body: requestBody
    });

    const onClickResetPasswordButton = async (e) => {
        e.preventDefault();
        const { newPassword, confirmNewPassword } = resetPassword;

        if (newPassword === confirmNewPassword) {
            try {
                setRequestBody({
                    newPassword
                });
    
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