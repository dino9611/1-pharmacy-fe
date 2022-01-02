import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';

function SalesTable (props) {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/${props.endpoint}?year=${props.year}`);
                setDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };

        fetchData();
    }, [props.endpoint, props.year]);
    
    return (
        <div 
            className="mt-4 mb-4 p-3 text-center" 
            style={{ 
                backgroundColor: "whitesmoke", 
                border: "1px solid lightgray",
                width: "48%"
            }}
        >
            <p style={{ 
                    color: "var(--gray-color)", 
                    fontWeight: 400, 
                    fontSize: 20,
                }}
            >
                {props.title}
            </p>
            <table 
                class="table table-bordered"
                style={{ height: "85%" }}
            >
            <thead style={{ backgroundColor: "lightgray" }}>
                <tr>
                <th scope="col">No.</th>
                <th scope="col">{props.labelCategory}</th>
                <th scope="col">{props.dataCategory}</th>
                </tr>
            </thead>
            { 
                datas.map((data, index) => {
                    return (
                        <tbody style={{ backgroundColor: "linen" }}>
                            <tr>
                            <th scope="row" style={{ backgroundColor: "antiquewhite" }}>{1 + index}</th>
                            <td style={{ ...props.labelStyle }}>{[data[props.labelField]]}</td>
                            <td>{[data[props.dataField]]}</td>
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
