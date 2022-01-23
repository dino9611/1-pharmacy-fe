import React from 'react';
import Logo from '../../../assets/FullNameLightmode.svg'
import { withRouter } from 'react-router';
import './style.css';

const AuthWrapper = (props) => {
    const { history } = props;

    return (
        <div className={`authWrapper ${props.className}`}>
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
            <p className="authTitle lh-1 mt-3 mb-4">
                {props.title}
            </p>
            {props.children}
        </div>
    );
}
 
export default withRouter(AuthWrapper);