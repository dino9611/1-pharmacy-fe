import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../UI/authInventory/input';
import SquareButton from '../../UI/authInventory/squareButton';
import axios from 'axios';
import { API_URL } from '../../../constants/api';

const LoginForm = (props) => {
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        usernameOrEmail: "",
        password: "",
    });

    const [maskedPassword, setMaskedPassword] = useState("password");

    const onClickShowPassword = () => {
        if (maskedPassword === "password") {
            setMaskedPassword("text");
        } else {
            setMaskedPassword("password");
        }
    };

    const onFormInputChange = (value, name) => {
        setLoginData({ ...loginData, [name]: value });
    };

    const onClickLoginButton = async (e) => {
        e.preventDefault();
        const { usernameOrEmail, password } = loginData;

        try {
            let dataBody = {
                usernameOrEmail,
                password,
            };

            const response = await axios.post(`${API_URL}/auth/login`, dataBody);

            localStorage.setItem("token-access", response.data.token);
            dispatch({ type: "LOGIN", payload: response.data });

            toast.success("Login is successful!", {
                position: "top-right",
                icon: "🔓"
            });
        } catch (error) {
            console.error(error.message)
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const { Auth } = useSelector((state) => {
        return {
            Auth: state.auth,
        };
    });

    if (Auth.isAdmin && Auth.isLogin) {
        return <Redirect to="/admin/dashboard" />;
    }

    if (!Auth.isAdmin && Auth.isLogin) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <div className="mb-5 mt-4">
                <Input
                    type="text"
                    onChange={onFormInputChange}
                    name="usernameOrEmail"
                    value={loginData.usernameOrEmail}
                    placeholder="username or email"
                />
                <Input
                    type="password"
                    onChange={onFormInputChange}
                    name="password"
                    value={loginData.password}
                    placeholder="password"
                />
                <span onClick={onClickShowPassword}
                    style={{
                        position: "absolute ",
                        transform: "translateX(-15px) translateY(8px)",
                        fontSize: 20,
                        opacity: 0.7,
                        marginLeft: -25,
                    }}
                >
                </span>
                <p><Link to="/forgotPassword" style={{ color: "var(--blue-color)" }}>Forgot your password?</Link></p>
                <SquareButton label="LOGIN" className="mt-4" onClick={onClickLoginButton} />
            </div>
            <div>
                <p className="mb-0">Don't have an account? Register now!</p>
                <Link to="/register" style={{ color: "var(--pink-color)" }}>Sign Up</Link> or <Link to="/" style={{ color: "var(--pink-color)" }}>Go to Home</Link>
            </div>
        </div>
    );
}

export default withRouter(LoginForm);