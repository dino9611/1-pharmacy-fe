import React from 'react';
import './style.css';

const SquareButton = (props) => {
    return (
        props.disabled ?
        <>
            <button className={`squareButtonDisabled ${props.className}`} disabled>
                {props.label}
            </button>
            <p style={{ color: "var(--red-color)", fontSize: 14, paddingTop: 5 }}>{props.disabledMessage}</p>
        </>
        :
        <button className={`squareButton ${props.className}`} onClick={props.onClick} style={{ ...props.style }} disabled={props.disabled}>
            {props.label}
        </button>
    );
}
 
export default SquareButton;