import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';

function SalesChart (props) {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/${props.endpoint}?year=${props.year}`);
                setDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });;
            }
        };
        fetchdata();
    }, [props.endpoint, props.year]);
    
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
                {props.title}
            </p>
            <div>
                <Bar
                    data={{
                        labels: datas.map(data => data[props.labelField]),
                        datasets:[
                            {
                                label: "Rp",
                                data: datas.map(data => data[props.dataField]),
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
                    {props.subTitle}: Rp. {datas.reduce((prev, curr) => prev + curr.total_payment, 0)}
                </p>
            </div>
        </div>
    );
};

export default SalesChart;