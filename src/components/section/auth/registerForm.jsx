import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../UI/authInventory/input';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import SquareButton from '../../UI/authInventory/squareButton';

const RegisterForm = (props) => {
    const dispatch = useDispatch();

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onFormInputChange = (value, name) => {
        setRegisterData({ ...registerData, [name]: value });
    };

    const onClickRegisterButton = async (e) => {
        e.preventDefault();
        const { firstName, lastName, username, email, password, confirmPassword } = registerData;

        if (password === confirmPassword) {
            try {
                let dataBody = {
                    firstName, 
                    lastName,
                    username,
                    email,
                    password                
                };
                

                const response = await axios.post(`${API_URL}/auth/register`, dataBody);

                // localStorage.setItem("token-access", response.headers["x-access-token"]);
                localStorage.setItem("token-access", response.data.token);
                dispatch({ type: "LOGIN", payload: response.data });

                toast.success("Registration is successful! Check your email for account verification.", {
                    position: "top-right",
                    icon: "🔐"
                });
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            };
        } else {
            toast.error("Password and confirm password does not match", {
                position: "top-right",
                icon: "❌"
            });
        };
    };

    const { Auth } = useSelector((state) => {
        return {
            Auth: state.auth,
        };
    });

    if (Auth.isLogin) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <div className="mb-5 mt-4">
                <Input
                    type="text" 
                    onChange={onFormInputChange}
                    name="firstName" 
                    value={registerData.firstName} 
                    placeholder="first name"
                    style={{width: "19.5vw", marginRight: "0.5vw" }}
                />
                <Input
                    type="text" 
                    onChange={onFormInputChange}
                    name="lastName" 
                    value={registerData.lastName} 
                    placeholder="last name"
                    style={{width: "19.5vw", marginLeft: "0.5vw" }}
                />
                <Input
                    type="text" 
                    onChange={onFormInputChange}
                    name="username" 
                    value={registerData.username} 
                    placeholder="username" 
                />
                <Input
                    type="text" 
                    onChange={onFormInputChange}
                    name="email" 
                    value={registerData.email} 
                    placeholder="email"
                />
                <Input
                    type="password"
                    onChange={onFormInputChange}
                    name="password" 
                    value={registerData.password} 
                    placeholder="password" 
                />
                <Input
                    type="password"
                    onChange={onFormInputChange}
                    name="confirmPassword" 
                    value={registerData.confirmPassword} 
                    placeholder="confirm password" 
                />
                <SquareButton label="SIGNUP" className="mt-4" onClick={onClickRegisterButton}/>        
            </div>
            <div>
                <p className="mb-0">Already have an account?</p>
                <Link to="/login" style={{ color: "var(--pink-color)" }}>Login</Link> or <Link to="/" style={{ color: "var(--pink-color)" }}>Go to Home</Link>
            </div>
        </div>
    );
}
 
export default withRouter(RegisterForm);