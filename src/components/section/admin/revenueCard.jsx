import React from 'react';
const RevenueCard = (props) => {

    return (
        <div className="d-flex flex-column justify-content-center p-5"
            style={{
                backgroundColor: "seashell",
                border: "2px solid var(--black-color)",
                boxShadow: "1px 5px 15px -5px gray",
                WebkitBoxShadow: "1px 5px 15px -5px gray",
                MozBoxShadow: "1px 5px 15px -5px gray",
                borderRadius: 20,
                ...props.style
            }}
        >
            {props.children}
        </div>
    );
}
 
export default RevenueCard;