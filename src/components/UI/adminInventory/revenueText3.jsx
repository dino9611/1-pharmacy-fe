import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import RevenueCard from '../../section/admin/revenueCard';
import './style.css';
import { toast } from 'react-toastify';

const RevenueText3 = (props) => {
    const [potentialOrders, setPotentialOrders] = useState([]);
    const [potentialRevenue, setPotentialRevenue] = useState([]);

    useEffect(() => {
        const fetchPotentialOrders = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/revenue/potential-orders`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setPotentialOrders(response.data);
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchPotentialOrders();

        const fetchPotentialRevenue = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/revenue/total-revenue?filter=potentialRevenue`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setPotentialRevenue(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };

        fetchPotentialRevenue();
    }, []);

    const Text = (props) => {
        return (
            <div className="d-flex justify-content-between">
                <span className={props.className} style={{ fontSize: 25 }}> 
                    {props.title}
                </span>
                {
                    (props.dataSet === potentialRevenue)
                    ?
                    <span style={{ fontSize: 25, color: "darkred" }}>
                        Rp. {props.dataSet.map(data => data[props.dataField]).toLocaleString("in", "ID")}
                    </span>
                    :
                    <span style={{ fontSize: 25, color: "darkred" }}>
                        {props.dataSet.map(data => data[props.dataField])}
                    </span>
                }
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
            <Text className="mb-3" dataSet={potentialOrders} title="Current Ongoing Carts" dataField="current_carts"/>
            <Text className="mb-3" dataSet={potentialOrders} title="Current Ongoing Checkout" dataField="current_checkout"/>
            <Text dataSet={potentialRevenue} title="Total Current Potential Revenue" dataField="total_revenue"/>
        </RevenueCard>
    );
}
 
export default RevenueText3;