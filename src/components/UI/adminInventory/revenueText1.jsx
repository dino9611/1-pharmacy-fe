import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';
import RevenueCard from '../../section/admin/revenueCard';
import './style.css';

const RevenueText1 = (props) => {
    const renderDate = (date) => {
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        return new Date(date).toLocaleString("en-EN", options);
    };

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/revenue/total-revenue`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });;
            }
        };
        fetchData();
    }, []);

    return (
        <RevenueCard 
            style={{ 
                width: "58%", 
                height: "45vh"
                }}
            >
            <p 
                style={{ 
                    fontSize: 35, 
                    marginBottom: 0,
                    color: "var(--black-color)" 
                }}
            >
                Grand Total Revenue
            </p>
            <p 
                style={{ 
                    fontSize: 20,
                    color: "whitesmoke", 
                    backgroundColor: "var(--lighter-pink-color)", 
                    width: "fit-content",
                    borderRadius: 15, 
                    padding: 3, 
                    paddingLeft: 10,
                    paddingRight: 10  
                }}
            >
                {renderDate(Date())}
            </p>
            <p 
                style={{ 
                    fontSize: 50,
                    textAlign: "end", 
                    color: "darkred",         
                }}
            >
                Rp. {datas.map(data => data.total_revenue).toLocaleString("in", "ID")}
            </p>
        </RevenueCard>
    );
}
 
export default RevenueText1;