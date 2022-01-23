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
                    className="obatinLogo"
                    src={Logo} 
                    alt="" 
                ></img>
            </div>
            <p className="authTitle lh-1">
                {props.title}
            </p>
            {props.children}
        </div>
    );
}
 
export default withRouter(AuthWrapper);