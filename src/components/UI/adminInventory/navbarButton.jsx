import React from 'react';
import { withRouter } from 'react-router';
import './style.css';

const NavbarButton = (props) => {
    const { history } = props;
    const selectedClass = window.location.pathname.includes(props.endpoint) ? "selectedNavbarButton" : "navbarButton";
   
    return (
        <div 
            className={`${selectedClass} d-flex flex-row p-2 ${props.className}`}
            onClick={() => {history.push(props.endpoint)}}
            style={{ marginBottom: 10 }}
        >
            <div style={{ width: 40 }}>
                <i class={props.icon}></i>
            </div>
            <div className="" style={{ fontWeight: 400, fontSize: 16 }}>
                {props.label}
            </div>
        </div>
    );

}
 
export default (withRouter(NavbarButton));