import React from 'react';
import NavbarButton from '../../UI/adminInventory/navbarButton';

const SideNavbar = (props) => {
    return (
        <div 
            className="d-flex flex-column p-4 align-items-start"
            style={{ 
                width: "20vw",
                backgroundColor: "white",
                borderRight: "2px solid lightgray",
                boxShadow: "1px 5px 15px -5px gray",
                WebkitBoxShadow: "1px 5px 15px -5px gray",
                MozBoxShadow: "1px 5px 15px -5px gray",
            }}
        >
            <p style={{ color: "var(--pink-color)", marginBottom: 5, fontSize: 16 }}>MENU</p>
            <NavbarButton endpoint="/admin/dashboard" icon="fas fa-home" label="Dashboard"/>
            <NavbarButton endpoint="/admin/productList" icon="fas fa-prescription-bottle-alt" label="Product List"/>
            <NavbarButton endpoint="/admin/materialList" icon="fas fa-tablets" label="Material List"/>
            <NavbarButton endpoint="/admin/userDatas" icon="fas fa-user" label="User History"/>
            <br/>
            <p style={{ color: "var(--pink-color)", marginBottom: 5, fontSize: 16 }}>STATS</p>
            <NavbarButton endpoint="/admin/sales" icon="fas fa-credit-card" label="Sales Report"/>
            <NavbarButton endpoint="/admin/revenue" icon="fas fa-money-check-alt" label="Revenue Report"/>
            <br/>
            <p style={{ color: "var(--pink-color)", marginBottom: 5, fontSize: 16 }}>ONGOING TASKS</p>
            <NavbarButton endpoint="/admin/orderRequest" icon="fas fa-plus-square" label="Order Request"/>
        </div>
    );
}
 
export default SideNavbar;