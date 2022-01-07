import React from 'react';
import '../components/UI/adminInventory/style.css';
import { withRouter } from 'react-router';
import DashboardCard1 from '../components/UI/adminInventory/dashboardCard1';
import DashboardCard2 from '../components/UI/adminInventory/dashboardCard2';

const Dashboard = (props) => {
    const { history } = props;

    return (
        <div className="m-5">
            <h3 className="mb-4">Welcome, Admin!</h3>
            <div className="d-flex flex-row justify-content-between mb-4">
                <DashboardCard1/>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <DashboardCard2
                    title="Ongoing Task"
                    onClick={() => {history.push("/admin/orderRequest")}}
                    style={{ width: "34%"}}
                />
                <DashboardCard2
                    title="Gatauapaan wkwk"
                    onClick=""
                    style={{ width: "63%"}}
                />
            </div>
        </div>
    );
}
 
export default withRouter(Dashboard);