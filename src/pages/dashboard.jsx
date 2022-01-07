import React from 'react';
import '../components/UI/adminInventory/style.css';
import { withRouter } from 'react-router';

const DashboardCard = (props) => {
    return (
        <div 
            className="d-flex justify-content-center align-items-center flex-row flex-wrap pe-4" 
            style={{ 
                width: "24%", 
                height: "15vh",
                boxShadow: "1px 5px 15px -5px gray",
                backgroundColor: "var(--lighter-pink-color)",
                border: "2px solid var(--pink-color)",
            }}
        >
            <div 
                className="col-4"
                style={{
                    fontSize: 40,
                    textAlign: "center",
                    color: "firebrick"
                }}
            >
                <i class={props.icon}></i>
            </div>
            <div className="col-8 flex-column">
                <h6 style={{ color: "white" }}>
                    {props.title}
                </h6>
                <h3 style={{ color: "var(--black-color)", textAlign: "start" }}>
                    {props.totalOrders}
                </h3>
            </div>
        </div>
    );
};

const RadialBar = (props) => {
    return (
        <div 
            className= "d-flex justify-content-start align-items-center flex-column py-3"
            style={{ 
                width: "34%", 
                height: "52vh",
                position: "relative",
                boxShadow: "1px 5px 15px -5px gray",
                backgroundColor: "white",
                border: "2px solid gainsboro",
            }}
        >
            <h4>{props.title}</h4>
            <div 
                className="mt-0 mb-3"
                style={{ 
                    width: "100%", 
                    height: 1, 
                    backgroundColor: "silver"
                }}
            ></div>
            <div className="px-3">
                🥳
            </div>
            <div 
                className="mt-0 mb-3" 
                style={{ 
                    width: "100%", 
                    height: 1, 
                    backgroundColor: "silver",
                    position: "absolute",
                    bottom: 30
                }}
            ></div>
            <div 
                style={{
                    fontSize: 20,
                    position: "absolute",
                    bottom: 8,
                    right: 8
                }}
                onClick={props.onClick}
            >
                <i class="fas fa-external-link-alt"></i>
            </div>
        </div>
    )
}

const Dashboard = (props) => {
    const { history } = props;

    return (
        <div className="m-5">
            <h3 className="mb-4">Welcome, Admin!</h3>
            <div className="d-flex flex-row justify-content-between mb-4">
                <DashboardCard
                    icon="fas fa-file-upload"
                    title="Orders Awaiting for Admin Review"
                    totalOrders="56"
                />
                <DashboardCard
                    icon="fas fa-shopping-cart"
                    title="Current Ongoing Orders"
                    totalOrders="56"
                />
                <DashboardCard
                    icon="fas fa-clipboard-check"
                    title="Success & Finished Orders"
                    totalOrders="56"
                />
                <DashboardCard
                    icon="fas fa-times-circle"
                    title="Failed or Cancelled Orders"
                    totalOrders="56"
                />
            </div>

            <div className="d-flex flex-row justify-content-between">
                <RadialBar
                    title="Ongoing Task"
                    onClick={() => {history.push("/admin/orderRequest")}}
                />


                
                <div className="bg-white" style={{ width: "64%", height: "52vh" }}>
                    B
                </div>
            </div>
        </div>
    );
}
 
export default withRouter(Dashboard);