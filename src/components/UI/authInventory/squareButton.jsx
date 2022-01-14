import React from 'react';
import './style.css';

const SquareButton = (props) => {
    return (
        <button className={`squareButton ${props.className}`} onClick={props.onClick} style={{ ...props.style }}>
            {props.label}
        </button>
    );
}
 
export default SquareButton;