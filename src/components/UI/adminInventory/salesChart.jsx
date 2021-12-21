import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';

function SalesChart () {
    const [totalSales, setTotalSales] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/monthly-sales`);
                setTotalSales(response.data)
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
        <div 
            className="mt-4 mb-4 p-3 text-center" 
            style={{ 
                backgroundColor: "whitesmoke", 
                border: "1px solid lightgray",
                width: "100%"
            }}
        >
            <p 
                style={{ 
                    color: "var(--gray-color)", 
                    fontWeight: 400, 
                    fontSize: 20 
                }}
            >
                Total Sales per Month
            </p>
            <div>
                <Bar
                    data={{
                        labels: totalSales.map(totalSale => totalSale.month),
                        datasets:[
                            {
                                label: "Rp",
                                data: totalSales.map(totalSale => totalSale.total_payment),
                                backgroundColor: [
                                    "powderblue", 
                                    "thistle", 
                                    "lightsalmon", 
                                    "mediumturquoise", 
                                    "pink",
                                    "lightgreen",
                                    "burlywood",
                                    "lightcoral",
                                    "khaki",
                                    "palevioletred"
                                ]
                            },
                        ]
                    }}
                    options={{ maintainAspectRatio: true }}
                />
                <br/>
                <p 
                    style={{ 
                        color: "var(--pink-color)", 
                        fontWeight: 400, 
                        fontSize: 20 
                    }}
                >
                    Current Gross Sales: Rp. {totalSales.reduce((prev, curr) => prev + curr.total_payment, 0)}
                </p>
            </div>
        </div>
    );
};

export default SalesChart;