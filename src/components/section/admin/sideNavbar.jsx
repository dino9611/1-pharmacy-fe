import React from 'react';
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import NavbarButton from '../../UI/adminInventory/navbarButton';
import SquareButton from '../../UI/authInventory/squareButton';
import { toast } from 'react-toastify'

const SideNavbar = (props) => {
    const dispatch = useDispatch();
    const { history } = props;

    const onClickLogoutButton = () => {
        try {
            localStorage.removeItem("token-access");
            dispatch({ type: "LOGOUT" });
            history.push("/");
            toast.success("Logout is successful, see you again!", {
                position: "top-right",
                icon: "👋🏼"
            });
        } catch (error) {
            toast.error("Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    return (
        <div 
            className="d-flex flex-column p-4 justify-content-between"
            style={{ 
                width: "20vw",
                backgroundColor: "white",
                borderRight: "2px solid lightgray",
                boxShadow: "1px 5px 15px -5px gray",
                WebkitBoxShadow: "1px 5px 15px -5px gray",
                MozBoxShadow: "1px 5px 15px -5px gray",
            }}
        >
            <div className="d-flex flex-column align-items-start">
                <p style={{ color: "var(--pink-color)", marginBottom: 5, fontSize: 16 }}>MENU</p>
                <NavbarButton endpoint="/admin/dashboard" icon="fas fa-home" label="Dashboard"/>
                <NavbarButton endpoint="/admin/inventory/product" icon="fas fa-prescription-bottle-alt" label="Product List"/>
                <NavbarButton endpoint="/admin/inventory/material" icon="fas fa-tablets" label="Material List"/>
                <NavbarButton endpoint="/admin/userDatas" icon="fas fa-user" label="User History"/>
                <br/>
                <p style={{ color: "var(--pink-color)", marginBottom: 5, fontSize: 16 }}>STATS</p>
                <NavbarButton endpoint="/admin/sales" icon="fas fa-credit-card" label="Sales Report"/>
                <NavbarButton endpoint="/admin/revenue" icon="fas fa-money-check-alt" label="Revenue Report"/>
                <br/>
                <p style={{ color: "var(--pink-color)", marginBottom: 5, fontSize: 16 }}>ONGOING TASKS</p>
                <NavbarButton endpoint="/admin/orderRequest" icon="fas fa-plus-square" label="Order Request"/>
            </div>
            <div className="d-flex flex-column align-items-center">
                <SquareButton className="text-center mb-2" label="LOGOUT" onClick={onClickLogoutButton}/>
            </div>
        </div>
    );
}
 
export default withRouter(SideNavbar);