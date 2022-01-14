import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';

function RevenueChart (props) {
    const [revenueDatas, setRevenueDatas] = useState([]);
    const [potentialRevenueDatas, setPotentialRevenueDatas] = useState([]);

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/${props.endpoint}?year=${props.year}`);
                setRevenueDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchRevenue();

        const fetchPotentialRevenue = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/${props.endpoint}?year=${props.year}&filter=potentialRevenue`);
                setPotentialRevenueDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };
        fetchPotentialRevenue();
    }, [props.endpoint, props.year, props.filter]);
    
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
                        labels: revenueDatas.map(revenueData => revenueData[props.labelField]),
                        datasets:[
                            {
                                label: "Revenue - Rp",
                                data: revenueDatas.map(revenueData => revenueData[props.dataField]),
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
                            {
                                label: "Potential Revenue - Rp",
                                data: potentialRevenueDatas.map(potentialRevenueData => potentialRevenueData[props.dataField]),
                                backgroundColor: [
                                    "mediumturquoise", 
                                    "pink",
                                    "powderblue", 
                                    "thistle", 
                                    "palevioletred",
                                    "lightgreen",
                                    "khaki",
                                    "burlywood",
                                    "lightsalmon", 
                                    "lightcoral",
                                ]
                            }
                        ],
                    }}
                    options={{ maintainAspectRatio: true }}
                />
                <br/>
                <p 
                    style={{ 
                        color: "var(--pink-color)", 
                        fontWeight: 400, 
                        fontSize: 20,
                        marginBottom: 0
                    }}
                >
                    {props.subTitle}: Rp. {revenueDatas.reduce((prev, curr) => prev + curr[props.dataField], 0).toLocaleString("in", "ID")}
                </p>
                <p 
                    style={{ 
                        color: "var(--pink-color)", 
                        fontWeight: 400, 
                        fontSize: 20 
                    }}
                >
                    {props.subTitle2}: Rp. {potentialRevenueDatas.reduce((prev, curr) => prev + curr[props.dataField], 0).toLocaleString("in", "ID")}
                </p>
            </div>
        </div>
    );
};

export default RevenueChart;