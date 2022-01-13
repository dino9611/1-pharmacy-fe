import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import RevenueCard from '../../section/admin/revenueCard';
import './style.css';
import { toast } from 'react-toastify';

const RevenueText2 = (props) => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/revenue/total-orders`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setDatas(response.data);
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchData();
    }, []);

    return (
        <RevenueCard 
            style={{ 
                width: "38%", 
                height: "45vh" 
                }}
            >
            <p 
                className="mb-0" 
                style={{ 
                    fontSize: 27, 
                    color: "var(--black-color)"
                    }}
                >
                Successfully Delivered and Finished Orders
            </p>
            <p 
                style={{ 
                    fontSize: 50,
                    textAlign: "end", 
                    color: "darkred", 
                }}
            >
                {datas.map(data => data.total_orders)}
            </p>
        </RevenueCard>
    );
}
 
export default RevenueText2;