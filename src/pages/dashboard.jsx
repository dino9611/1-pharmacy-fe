import React from "react";
import DashboardWrapper from "../components/section/admin/dashboardWrapper";

const Dashboard = (props) => {
    return (
        <div className="m-5">
            <h3 className="mb-4">Welcome, Admin!</h3>
            <DashboardWrapper/>
        </div>
    );
}
 
export default Dashboard;