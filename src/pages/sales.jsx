import React, { useState } from 'react';
import SalesChart from '../components/UI/adminInventory/salesChart';
import SalesDoughnut from '../components/UI/adminInventory/salesDoughnut';
import SalesTable from '../components/UI/adminInventory/salesTable';
import StatsHeader from '../components/UI/adminInventory/statsHeader';

const AdminDashboard = (props) => {
    const [year, setYear] = useState(2021); // useState(new Date().getFullYear());
    const years = [ 2020, 2021, 2022 ];

    return (
        <div className="text-center m-5">
            <StatsHeader
                title={`Real Time Sales Report Year ${year}`}
                label="Filter by Year" 
                onClick={(value, index) => setYear(value)} 
                datas={years}
            />
            <SalesChart
                endpoint="/sales/monthly-sales"
                year={year}
                title={`Total Sales per Month Year ${year}`}
                subTitle="Current Gross Sales"
                labelField="month"
                dataField="total_sales"
            />
            <div className="d-flex flex-row justify-content-between">
                <SalesDoughnut 
                    endpoint="orders-by-gender" 
                    year={year}
                    title={`Total Orders Categorized by Gender Year ${year}`}
                    labelField="gender" 
                    dataField="total_orders"
                />
                <SalesTable
                    endpoint="orders-by-age-range"
                    year={year}
                    title={`Total Orders Categorized by Age Year ${year}`}
                    labelCategory="Age Range"
                    dataCategory="Orders"
                    labelField="age"
                    dataField="total_orders"
                />
            </div>
            <div className="d-flex flex-row justify-content-between">
                <SalesDoughnut 
                    endpoint="current-orders-status" 
                    year={year}
                    title={`Total Orders Categorized by Status Year ${year}`}
                    labelField="status" 
                    dataField="current_orders"
            />
                <SalesTable
                    endpoint="top-medicine-orders"
                    year={year}
                    title={`Top 10 Medicine Orders Year ${year}`}
                    labelStyle={{ textAlign: "left" }}
                    labelCategory="Medicine Name"
                    dataCategory="Orders"
                    labelField="medicine"
                    dataField="total_medicine_orders"
                />
            </div>
        </div>
    );
}
 
export default AdminDashboard;