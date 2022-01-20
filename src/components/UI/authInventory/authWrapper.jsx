import React from 'react';
import Logo from '../../../assets/FullNameLightmode.svg'
import { withRouter } from 'react-router';

const AuthWrapper = (props) => {
    const { history } = props;

    return (
        <div    
            className={`d-flex 
            justify-content-center 
            align-items-center 
            text-center 
            flex-column
            ${props.className}`}
            style={{ 
                backgroundColor: "whitesmoke", 
                height: "100vh", 
                width: "60vw", 
                borderTopLeftRadius: 30, 
                borderBottomLeftRadius: 30, 
                padding: 70 
            }}
        >
            <div onClick={() => {history.push("/")}}>
                <img    
                    src={Logo} 
                    alt="" 
                    style={{
                        maxWidth: 150,
                        height: "auto",
                    }}
                ></img>
            </div>
            <p 
                style={{
                color: "var(--black-color)", 
                fontWeight: 700, 
                fontSize: 45,
                }}
            >
                {props.title}
            </p>
            {props.children}
        </div>
    );
}
 
export default withRouter(AuthWrapper);