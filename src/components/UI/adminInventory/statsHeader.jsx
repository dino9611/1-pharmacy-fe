import React from 'react';
import './style.css';
import Dropdown from '../../controller/dropdown';

const StatsHeader = (props) => {
    return (
        <div className="d-flex flex-row justify-content-between mb-3">
            <h3>{props.title}</h3>
            <Dropdown 
                label={props.label} 
                onClick={props.onClick}
                datas={props.datas}
            />
        </div>
    );
}
 
export default StatsHeader;