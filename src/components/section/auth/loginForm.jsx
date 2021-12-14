import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import useAxios from '../../../hooks/useAxios';
import Input from '../../UI/authInventory/input';
import RedirectButton from '../../UI/authInventory/redirectButton';

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
        setLoginData({...loginData, [name]: value });
    };

    const [requestBody, setRequestBody] = useState(null);

    let { response, error, loading } = useAxios({
        url: `http://localhost:2001/login`,
        method: 'post',
        body: requestBody
    });

    const onClickLoginButton = async (e) => {
        e.preventDefault();
        const { usernameOrEmail, password } = loginData;
        
        try {
            setRequestBody({
                usernameOrEmail,
                password,             
            });            

            localStorage.setItem("token-access", response.token);
            dispatch({ type: "LOGIN", payload: response.data });

            alert("Login is successful");
        } catch (error) {
            alert("Server Error");
        }
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
                    name="usernameOrEmail" 
                    value={loginData.usernameOrEmail} 
                    placeholder="username or email" 
                />      
                <Input 
                    type="text"
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
                    { maskedPassword === "password" ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                </span>
                <p><Link to="/forgotPassword" style={{ color: "var(--blue-color)" }}>Forgot your password?</Link></p>
                <RedirectButton label="LOGIN" className="mt-4" onClick={onClickLoginButton}/>
            </div>
            <div>
                <p className="mb-0">Don't have an account? Register now!</p>
                <Link to="/register" style={{ color: "var(--blue-color)" }}>Sign Up</Link> or <Link to="/" style={{ color: "var(--blue-color)" }}>Go to Home</Link>
            </div>
        </div>
    );
}
 
export default withRouter(LoginForm);