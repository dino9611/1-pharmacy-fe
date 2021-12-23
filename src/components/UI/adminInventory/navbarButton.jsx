import React from 'react';
import { withRouter } from 'react-router';
import './style.css';

const NavbarButton = (props) => {
    const { history } = props;

    return (
        <button 
            className={`navbarButton d-flex flex-row p-2 ${props.className}`}
            onClick={() => {history.push(props.endpoint)}}
            style={{ marginBottom: 10 }}
        >
            <i class={props.icon} style={{ transform: "translateY(3px)" }}></i>
            <div className="ms-4" style={{ fontWeight: 400, fontSize: 16 }}>
                {props.label}
            </div>
        </button>
    );
}
 
export default (withRouter(NavbarButton));