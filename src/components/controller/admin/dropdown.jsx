import React, { useState } from 'react';
import '../../UI/adminInventory/style.css';

const Dropdown = (props) => {
    const [isOpen, setIsopen] = useState(false);
    const datas = props.datas;

    return (
        <div
            className={`d-flex justify-content-center align-items-center ${props.className}`}
            style={{
                width: "fit-content",
                backgroundColor: "gray",
                color: "white",
                padding: 7,
                paddingLeft: 13,
                paddingRight: 13,
                border: "1px solid transparent",
                borderRadius: 7,
                position: "relative",

            }}
            onClick={() => setIsopen(!isOpen)}
        >
            {props.label} ▾
            {
                (isOpen)
                ?
                <div
                    className="py-2"
                    style={{
                        backgroundColor: "white",
                        border: "1px solid darkgray",
                        borderRadius: 5,
                        width: 150,
                        position: "absolute",
                        top: 40,
                    }}
                >
                    <div className="d-flex flex-column ps-0">
                        {datas.map((data, index) => {
                            return (
                                <div className="dropdownItem d-flex pt-1 px-3" onClick={() => props.onClick(data, index)}>{data}</div>)}
                            )
                        }
                    </div>
                </div>
                :
                null
            }
        </div>
    );
};

export default Dropdown;