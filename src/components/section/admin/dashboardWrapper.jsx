import React, { useState, useEffect } from 'react';
import '../../UI/adminInventory/style.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { withRouter } from 'react-router';
import { API_URL } from '../../../constants/api';
import DashboardTable from '../../section/admin/dashboardTable';
import DashboardCard from '../../UI/adminInventory/dashboardCard';
import CircleProgressBar from '../../UI/adminInventory/circleProgressBar';

const DashboardCard1 = (props) => {  
    const { history } = props;
    const [datas, setDatas] = useState([]);
    const [orderStatus1, setOrderStatus1] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/current-orders-status`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setDatas(response.data);
                setOrderStatus1(response.data[0].current_orders);
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

    const totalOrders = datas.reduce((prev, curr) => prev + curr.current_orders, 0).toLocaleString("in", "ID");
    const completedTask = totalOrders - orderStatus1;
    const completedTaskPercentage = ((completedTask / totalOrders) * 100).toFixed(2)

    return (
        <>
            <div className="d-flex flex-row justify-content-between mb-4">
                {datas.map((data, index) => {
                    return (
                        <div 
                            className="d-flex justify-content-center align-items-center flex-row flex-wrap pe-4" 
                            style={{ 
                                width: "24%", 
                                height: "15vh",
                                boxShadow: "1px 5px 15px -5px gray",
                                WebkitBoxShadow: "1px 5px 15px -5px gray",
                                MozBoxShadow: "1px 5px 15px -5px gray",
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
                })}
            </div>
            <div className="d-flex justify-content-between">
                <DashboardCard
                    title="Ongoing Task"
                    onClick={() => {history.push("/admin/orderRequest")}}
                    style={{ width: "34%"}}
                >
                    <CircleProgressBar percentage={completedTaskPercentage}/>
                    <p className="mt-3 mb-0" style={{ color: "var(--blue-color)" }}>
                        Orders Awaiting for Admin Review:
                    </p>
                    <p>
                        {completedTask} out of {totalOrders} is Done Reviewed ✔️
                    </p>
                </DashboardCard>
                <DashboardTable/>
            </div>
        </>
    );
};

export default withRouter(DashboardCard1);