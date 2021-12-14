import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import useAxios from '../../../hooks/useAxios';
import Input from '../../UI/authInventory/input';
import RedirectButton from '../../UI/authInventory/redirectButton';

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

    const [requestBody, setRequestBody] = useState(null);

    let { response, error, loading } = useAxios({
        url: `http://localhost:2001/register`,
        method: 'post',
        body: requestBody
    });

    const onClickRegisterButton = async (e) => {
        e.preventDefault();
        const { firstName, lastName, username, email, password, confirmPassword } = registerData;

        if (password === confirmPassword) {
            try {
                setRequestBody({
                    firstName, 
                    lastName,
                    username,
                    email,
                    password                
                });
                
                localStorage.setItem("token-access", response.token);
                dispatch({ type: "LOGIN", payload: response.data });

                alert("Registration is successful");
            } catch (error) {
                alert("Server Error");
            };
        } else {
            alert("Password and confirm password does not match");
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
                <RedirectButton label="SIGNUP" className="mt-4" onClick={onClickRegisterButton}/>        
            </div>
            <div>
                <p className="mb-0">Already have an account?</p>
                <Link to="/login" style={{ color: "var(--blue-color)" }}>Login</Link> or <Link to="/" style={{ color: "var(--blue-color)" }}>Go to Home</Link>
            </div>
        </div>
    );
}
 
export default withRouter(RegisterForm);