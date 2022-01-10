import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';
import PlainTable from '../../UI/adminInventory/plainTable';
import Dropdown from '../../controller/dropdown';
import DashboardCard from '../../UI/adminInventory/dashboardCard';

const DashboardTable = (props) => {
    const years = [ 2020, 2021, 2022 ];
    const months = [ "All Months", "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const [year, setYear] = useState(2021) // useState(new Date().getFullYear());
    const [month, setMonth] = useState(0) // useState(new Date().getMonth());
    const [datas, setDatas] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/sales/top-buyers?year=${year}&month=${month}`);
                setDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            }
        };

        fetchData();
    }, [year, month]);

    return (
        <DashboardCard
            title={`Top Buyers ${months[month]} ${year}`}
            style={{ width: "63%" }}
        >
            <div className="d-flex flex-row mb-3">
                <Dropdown 
                    className="me-2"
                    label="Filter by Year" 
                    onClick={(value, index) => setYear(value)} 
                    datas={years}
                />
                <Dropdown 
                    label="Filter by Months" 
                    onClick={(value, index) => setMonth(index)} 
                    datas={months}
                />
            </div>
            <PlainTable
                style={{ width: "90%" }}
                labelCategory="Username"
                dataCategory="Total Orders"
                dataCategory2="Total Sales"
            >
                { 
                    datas.map((data, index) => {
                        return (
                            <tr>
                                <th scope="row" style={{ backgroundColor: "antiquewhite" }}>{1 + index}</th>
                                <td style={{ ...props.labelStyle }}>{data.username}</td>
                                <td>{data.total_orders}</td>
                                <td>{data.total_sales}</td>
                            </tr>
                        );
                    })
                } 
            </PlainTable>
        </DashboardCard>
    );
}
 
export default DashboardTable;