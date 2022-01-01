import React from 'react';
import './style.css';

const StatsHeader = (props) => {
    return (
        <div 
            className="
                d-flex 
                flex-row 
                justify-content-between
                mb-4
                "
            >
            <h3>{props.title}</h3>
            <div 
                class="dropdown"
            >
                <button 
                    class="
                        btn btn-secondary 
                        dropdown-toggle
                    " 
                    type="button" 
                    id="dropdownMenuButton1" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    style={{ backgroundColor: "var(--gray-color)"}}
                >
                    Filter by Year
                </button>
                <ul class="dropdown-menu">
                    <li><div className="dropdown-item" onClick={() => props.setYear(2020)}>2020</div></li>
                    <li><div className="dropdown-item" onClick={() => props.setYear(2021)}>2021</div></li>
                    <li><div className="dropdown-item" onClick={() => props.setYear(2022)}>2022</div></li>
                </ul>
            </div>
        </div>
    );
}
 
export default StatsHeader;