import React from 'react';

const Illustration = (props) => {
    return (
        <img src={props.src} 
        alt={props.alt}
        style={{
            maxWidth: 500,
            height: "auto",
            transform: "translateX(-30px) translateY(-250px)"
        }}
        ></img>
    );
}
 
export default Illustration;