import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';

function SalesTable (props) {
    const [tableDatas, setTableDatas] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/${props.endpoint}`);
                setTableDatas(response.data)
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
                style={{ ...props.style }}
            >
            <thead style={{ backgroundColor: "lightgray" }}>
                <tr>
                <th scope="col">No.</th>
                <th scope="col">{props.labelCategory}</th>
                <th scope="col">{props.dataCategory}</th>
                </tr>
            </thead>
            { 
                tableDatas.map((tableData, index) => {
                    return (
                        <tbody style={{ backgroundColor: "linen" }}>
                            <tr>
                            <th scope="row" style={{ backgroundColor: "antiquewhite" }}>{1 + index}</th>
                            <td>{[tableData[props.labelField]]}</td>
                            <td>{[tableData[props.dataField]]}</td>
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
