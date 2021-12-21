import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/api';
import RevenueCard from '../../section/admin/revenueCard';
import './style.css';
import { toast } from 'react-toastify';

const RevenueText4 = (props) => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/revenue/potential-revenue`);
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

    const style1 = { 
        fontSize: 40, 
        textAlign: "end", 
        color: "darkred",
        paddingRight: 15
    };

    const style2 = { 
        fontSize: 25, 
    };

    return (
        <RevenueCard
            style={{ 
                width: "53%", 
                height: "70vh",
                color: "var(--black-color)"
            }}
        >
            <p className="mb-0" style={style2}> 
                Current Ongoing Carts 
            </p>
            <p style={style1}>
                {datas.map(data => data.current_carts)}
            </p>
            <p className="mb-3" style={style2}> 
                Current Ongoing Checkout 
            </p>
            <p style={style1}>
                {datas.map(data => data.current_checkout)}
            </p>
            <p className="mb-3" style={style2}> 
                Total Current Potential Revenue 
            </p>
            <p style={style1}>
                Rp. ???
            </p>
        </RevenueCard>
    );
}
 
export default RevenueText4;