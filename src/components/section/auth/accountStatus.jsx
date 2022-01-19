import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import qs from 'query-string';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import { Link } from 'react-router-dom';

const AccountStatus = () => {
    const [status, setStatus] = useState(1);

    const fetchData = async (e) => {
        const { token } = qs.parse(window.location.search);

        try {
            const response = await axios.post(`${API_URL}/auth/verifyAccount`, null, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });

            setStatus(2);
            toast.success("Account is verified!", {
                position: "top-right",
                icon: "🚀"
            });
        } catch (error) {
            setStatus(3);
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        };
    };

    useEffect(() => {
        fetchData()
    }, []);

    if (status === 1) {
        return (
        <div>
            <h1>Account is not verified</h1>
        </div>
        );
    };

    if (status === 2) {
        return (
        <div>
            <h1>Account is verified</h1>
            <Link to="/" style={{ color: "var(--pink-color)", fontSize: 18 }}>Go to Home</Link>
        </div>
        );
    };

    return (
        <div>
            <h1>Account verification failed</h1>
            <Link to="/" style={{ color: "var(--pink-color)", fontSize: 18 }}>Go to Home</Link>
        </div>
    );
}
 
export default AccountStatus;