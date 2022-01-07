import React, { useState, useEffect } from 'react';
import './style.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../../../constants/api';

const DashboardCard1 = (props) => {    
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/current-orders-status`);
                setDatas(response.data);
                console.log(response.data[0]);
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };

        fetchData();
    }, []);

    function getIcon(index){
        if(index === 0){
            return <i class="fas fa-file-upload"></i>;
        }else if(index === 1){
            return <i class="fas fa-shopping-cart"></i>;
        }else if(index === 2){
            return <i class="fas fa-clipboard-check"></i>;
        }else if(index === 3){
            return <i class="fas fa-times-circle"></i>;
        }
    };

    return (
        datas.map((data, index) => {
            return (
                <div 
                    className="d-flex justify-content-center align-items-center flex-row flex-wrap pe-4" 
                    style={{ 
                        width: "24%", 
                        height: "15vh",
                        boxShadow: "1px 5px 15px -5px gray",
                        backgroundColor: "var(--lighter-pink-color)",
                        border: "2px solid var(--pink-color)",
                    }}
                >
                    <div 
                        className="col-4"
                        style={{
                            fontSize: 35,
                            textAlign: "center",
                            color: "firebrick"
                        }}
                    >
                       {getIcon(index)}
                    </div>
                    <div className="col-8 flex-column">
                        <h6 style={{ color: "white" }}>
                            {data.status}
                        </h6>
                        <h3 style={{ color: "var(--black-color)", textAlign: "start" }}>
                            {data.current_orders}
                        </h3>
                    </div>
                </div>
            );
        })
    );
};

export default DashboardCard1;