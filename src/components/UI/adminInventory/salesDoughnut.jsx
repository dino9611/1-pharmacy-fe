import React, { useState, useEffect } from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';

function SalesDoughnut (props) {
    const [doughnutDatas, setDoughnutDatas] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/${props.endpoint}`);
                setDoughnutDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };

        fetchdata();
    }, [props.endpoint]);
    
    return (
        <div className="mt-4 mb-4 p-3 text-center" 
            style={{ 
                backgroundColor: "whitesmoke", 
                border: "1px solid lightgray",
                width: "48%"
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
                <Doughnut
                    data={{
                        labels: doughnutDatas.map(doughnutdata => doughnutdata[props.labelField]),
                        datasets:[
                            {
                                data: doughnutDatas.map(doughnutdata => doughnutdata[props.dataField]),
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