import React from 'react';
import { withRouter } from 'react-router';
import StatusButtonWrapper from './statusButtonWrapper';
import './style.css';

const StatusButtons = (props) => {
    const underline = <div style={{ height: 2, width: "35%", backgroundColor: "var(--black-color)", marginTop: 7 }}></div>
    
    return (
        <div className="d-flex flex-row mb-3">
            <StatusButtonWrapper
                className={`${ props.status === 1 ? "selectedStatusButton" : "statusButton"}`} 
                backgroundColor= "darkgray"
                border= "2px solid gray"
                onClick={() => props.onClick(1)}
                label={props.user ?"Awaiting for Review" : "Awaiting for Review / Payment"}
                ternary={ props.status === 1 ? underline : null }
            />
            {
                (props.showStatus3) ? null : <div className="mx-3" style={{ width: 1, backgroundColor: "silver" }}></div>
            }
            <StatusButtonWrapper
                className={`${ props.status === 2 ? "selectedStatusButton" : "statusButton"}`} 
                backgroundColor= "limegreen"
                border= "2px solid forestgreen" 
                onClick={() => props.onClick(2)}
                label="Past Accepted Orders"
                ternary={ props.status === 2 ? underline : null }
            />
            {
                (props.showStatus3)
                ?
                <StatusButtonWrapper
                    className={`${ props.status === 3 ? "selectedStatusButton" : "statusButton"}`} 
                    backgroundColor= "var(--blue-color)"
                    border= "2px solid steelblue"
                    onClick={() => props.onClick(3)}
                    label="Delivered & Finished"
                    ternary={ props.status === 3 ? underline : null }
                />
                :
                null
            }
            <StatusButtonWrapper
                className={`${ props.status === 4 ? "selectedStatusButton" : "statusButton"}`} 
                backgroundColor= "var(--red-color)"
                border= "2px solid firebrick" 
                onClick={() => props.onClick(4)}
                label="Past Rejected Orders"
                ternary={ props.status === 4 ? underline : null }
            />
        </div>
    )
};
 
export default (withRouter(StatusButtons));