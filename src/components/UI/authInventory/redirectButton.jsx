import React from 'react';
import './style.css';

const RedirectButton = (props) => {
    return (
        <button className={`redirectButton ${props.className}`} onClick={props.onClick}>
            {props.label}
        </button>
    );
}
 
export default RedirectButton;