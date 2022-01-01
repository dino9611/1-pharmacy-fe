import React, { useState } from 'react';
import SalesChart from '../components/UI/adminInventory/salesChart';
import SalesDoughnut from '../components/UI/adminInventory/salesDoughnut';
import SalesTable from '../components/UI/adminInventory/salesTable';
import StatsHeader from '../components/UI/adminInventory/statsHeader';

const AdminDashboard = (props) => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(2021);

    return (
        <div className="text-center m-5">
            <StatsHeader
                title={`Real Time Sales Report Year ${year}`}
                setYear={setYear}
            />
            <SalesChart
                endpoint="monthly-sales"
                year={year}
                title="Total Sales per Month"
                subTitle="Current Gross Sales"
                labelField="month"
                dataField="total_payment"
            />
            <div className="d-flex flex-row justify-content-between">
                <SalesDoughnut 
                    endpoint="orders-by-gender" 
                    year={year}
                    title="Total Orders Categorized by Gender" 
                    labelField="gender" 
                    dataField="total_orders"
                />
                <SalesTable
                    endpoint="orders-by-age-range"
                    year={year}
                    title="Total Orders Categorized by Age"
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
                    title="Current Ongoing Orders Categorized by Status" 
                    labelField="status" 
                    dataField="current_orders"
               />
                <SalesTable
                    endpoint="medicine-orders"
                    year={year}
                    title="Top 10 Medicine Orders"
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