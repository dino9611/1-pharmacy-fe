import React from 'react';
import './style.css';

const StatusButtonWrapper = (props) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <button 
                className={props.className} 
                style={{ 
                    backgroundColor: props.backgroundColor, 
                    border: props.border,
                }}
                onClick={props.onClick}
            >
                {props.label}
            </button>
            {props.ternary}
        </div>
    );
}
 
export default StatusButtonWrapper;