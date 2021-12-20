import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';

function SalesDoughnut (props) {
    const [chartDatas, setChartDatas] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/${props.endpoint}`);
                setChartDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };

        fetchdata();
    }, []);
    
    return (
        <div className="mt-4 mb-4 p-3 text-center" 
            style={{ 
                backgroundColor: "whitesmoke", 
                border: "1px solid gainsboro"
            }}
        >
            <p 
                style={{ 
                    color: "var(--gray-color)", 
                    fontWeight: 400, 
                    fontSize: 20 
                }}
            >
                {props.title}
            </p>
            <div 
                style={{ width: "32vw" }}>
                <Doughnut
                    data={{
                        labels: chartDatas.map(chartData => chartData[props.labelField]),
                        datasets:[
                            {
                                data: chartDatas.map(chartData => chartData[props.dataField]),
                                backgroundColor: [ 
                                    "powderblue", 
                                    "thistle", 
                                    "lightsalmon", 
                                    "mediumturquoise", 
                                    "pink",
                                    "lightgreen",
                                    "burlywood",
                                    "lightcoral"
                                ],
                            },
                        ]
                    }}
                    options={{ 
                        maintainAspectRatio: true,
                    }}
                />
            </div>
        </div>
    );
};

export default SalesDoughnut;