import React, { useState } from 'react';

const Input = (props) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const onClickEyeIcon = () => {
        setIsPasswordShown(!isPasswordShown);
    }

    const type = props.type === "password" && isPasswordShown ? "text" : props.type;

    return (
        <>
            <input 
                type={type}
                onChange={(e) => props.onChange(e.target.value, e.target.name)}
                name={props.name} 
                value={props.value} 
                placeholder={props.placeholder}
                className="mb-2" 
                style={{ 
                    width: "40vw", 
                    padding: 10, 
                    borderRadius: 30, 
                    border: "1.5px solid black",
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