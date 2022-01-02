import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import RevenueCard from '../../section/admin/revenueCard';
import './style.css';
import { toast } from 'react-toastify';

const RevenueText3 = (props) => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/revenue/potential-revenue`);
                setDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchData();
    }, []);

    const Text = (props) => {
        return (
            <div className="d-flex justify-content-between">
                <span className={props.className} style={{ fontSize: 25 }}> 
                    {props.title}
                </span>
                <span style={{ fontSize: 25, color: "darkred" }}>
                    {datas.map(data => data[props.dataField])}
                </span>
            </div>
        )
    }

    return (
        <RevenueCard
            style={{ 
                width: "100%", 
                height: "100%",
                color: "var(--black-color)"
            }}
        >
            <Text className="mb-3" title="Current Ongoing Carts" dataField="current_carts"/>
            <Text className="mb-3" title="Current Ongoing Checkout" dataField="current_checkout"/>
            <Text title="Total Current Potential Revenue" dataField=""/>
        </RevenueCard>
    );
}
 
export default RevenueText3;