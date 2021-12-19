import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function SalesTable (props) {
    const [chartDatas, setChartDatas] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:2001/admin/sales/${props.endpoint}`);
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
        <div 
            className="mt-4 mb-4 p-3 text-center" 
            style={{ 
                backgroundColor: "whitesmoke", 
                border: "1px solid gainsboro"
            }}
        >
            <p style={{ 
                    color: "var(--gray-color)", 
                    fontWeight: 400, 
                    fontSize: 20 
                }}
            >
                {props.title}
            </p>
            <table 
                class="table table-bordered"
                style={{ width: "32vw", ...props.style }}
            >
            <thead style={{ backgroundColor: "gainsboro" }}>
                <tr>
                <th scope="col">No.</th>
                <th scope="col">{props.labelCategory}</th>
                <th scope="col">{props.dataCategory}</th>
                </tr>
            </thead>
            { 
                chartDatas.map((chartData, index) => {
                    return (
                        <tbody style={{ backgroundColor: "linen" }}>
                            <tr>
                            <th scope="row" style={{ backgroundColor: "antiquewhite" }}>{1 + index}</th>
                            <td>{[chartData[props.labelField]]}</td>
                            <td>{[chartData[props.dataField]]}</td>
                            </tr>
                        </tbody>
                    );
                })
            }   
            </table>
        </div>
    );
}
 
export default SalesTable;
