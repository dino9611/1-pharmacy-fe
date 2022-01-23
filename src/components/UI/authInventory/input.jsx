import React, { useState } from 'react';
import './style.css';

const Input = (props) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const onClickEyeIcon = () => {
        setIsPasswordShown(!isPasswordShown);
    }

    const type = props.type === "password" && isPasswordShown ? "text" : props.type;

    return (
        <>
            <input 
                className="authInput mb-2"
                type={type}
                onChange={(e) => props.onChange(e.target.value, e.target.name)}
                name={props.name} 
                value={props.value} 
                placeholder={props.placeholder}
                style={{ 
                    ...props.style
                }}
            />
            {props.type === "password" && (
                <span onClick={onClickEyeIcon}
                    style={{
                        position: "absolute ",
                        transform: "translateX(-15px) translateY(8px)",
                        fontSize: 20,
                        opacity: 0.7,
                        marginLeft: -25,
                    }}
                >
                    {isPasswordShown ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                </span>
            )}
        </>
    );
}
 
export default Input;
// const onFieldChange = (value, name) => {
//   setState({ ...state, [name]: value });
// }
// <Input onChange={(value) => onFieldChange(value, 'firstName')} />
// <Input onChange={(value) => onFieldChange(value, 'lastName')} />