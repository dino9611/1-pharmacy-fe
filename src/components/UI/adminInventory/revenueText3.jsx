import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import RevenueCard from '../../section/admin/revenueCard';
import './style.css';
import { toast } from 'react-toastify';

const RevenueText3 = (props) => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/current-orders-status`);
                setDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });;
            }
        };
        fetchdata();
    }, []);

    return (
        <RevenueCard 
            style={{ 
                width: "43%", 
                height: "70vh",
            }}
        >
            <p 
                className="text-center mb-4" 
                style={{ 
                    fontSize: 25, 
                    lineHeight: 1.2,
                    color: "var(--black-color)"
                }}
            >
                Current Ongoing Orders Categorized by Status
            </p>
            {
                datas.map((data) => {
                    return (
                        <div>
                            <p 
                                style={{
                                    fontSize: 17,
                                    marginBottom: 0, 
                                    color: "whitesmoke", 
                                    backgroundColor: "var(--pink-color)", 
                                    borderRadius: 15, 
                                    padding: 3, 
                                    paddingLeft: 10 
                                }}
                            >
                                {data.status}
                            </p>
                            <p 
                                style={{
                                    fontSize: 30, 
                                    textAlign: "end",
                                    paddingRight: 15, 
                                    color: "darkred"
                                }}
                            >
                                {data.current_orders}
                            </p>
                        </div>
                    );
                })
            }            
        </RevenueCard>
    );
}
 
export default RevenueText3;