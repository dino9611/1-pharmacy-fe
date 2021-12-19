import React from 'react';
import SalesChart from '../components/UI/adminInventory/salesChart';
import SalesDoughnut from '../components/UI/adminInventory/salesDoughnut';
import SalesTable from '../components/UI/adminInventory/salesTable';

const AdminDashboard = (props) => {
    return (
        <div className="text-center">
            <h3>Real Time Sales Report Year 2021</h3>
            <SalesChart/>
            <br />
            <h3>Real Time Order Report Year 2021</h3>
            <div className="d-flex flex-row justify-content-between">
                <SalesDoughnut 
                    endpoint="orders-by-gender" 
                    title="Total Orders Categorized by Gender" 
                    labelField="gender" 
                    dataField="total_orders"
                />
                <SalesTable
                    endpoint="orders-by-age-range"
                    title="Total Orders Categorized by Age"
                    style={{ height: "85%" }}
                    labelCategory="Age Range"
                    dataCategory="Orders"
                    labelField="age"
                    dataField="total_orders"
                />
            </div>
            <div className="d-flex flex-row justify-content-between">
                <SalesDoughnut 
                   endpoint="current-orders-status" 
                   title="Current Active Orders Categorized by Status" 
                   labelField="status" 
                   dataField="current_orders"
               />
                <SalesTable
                    endpoint="medicine-orders"
                    title="Top 10 Medicine Orders"
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