import React, { useState } from 'react';

const ShowPassword = (props) => {
    const [maskedPassword, setMaskedPassword] = useState("password");
    
    const onClickShowPassword = () => {
        if (maskedPassword === "password") {
            setMaskedPassword("text");
        } else {
            setMaskedPassword("password");
        }
    };

    return (
        <span onClick={onClickShowPassword} style={props.style}>
            { maskedPassword === "password" ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
        </span>
    );
}
 
export default ShowPassword;