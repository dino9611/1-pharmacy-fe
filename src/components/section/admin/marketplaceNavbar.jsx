import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router';
import Obatin from '../../../assets/FullNameDarkmode.svg';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { toast } from 'react-toastify'
import '../../UI/adminInventory/style.css';

const MarketplaceNavbar = (props) => {
    const dispatch = useDispatch();
    const { history } = props;

    const ref = useRef(null);
    const [ showProfileDropdown, setShowProfileDropdown ] = useState(false);

    useOnClickOutside(ref, () => {
        if (showProfileDropdown) {
            setShowProfileDropdown(!showProfileDropdown)
        }
    });
    
    const { Auth } = useSelector((state) => {
        return {
            Auth: state.auth,
        };
    });

    const onClickLogoutButton = () => {
        try {
            localStorage.removeItem("token-access");
            dispatch({ type: "LOGOUT" });
            history.push("/");
            toast.success("Logout is successful, see you again!", {
                position: "top-right",
                icon: "👋🏼"
            });
        } catch (error) {
            toast.error("Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.pageYOffset;
        setPrevScrollPos(currentScrollPos);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, handleScroll]);

    const visible = props.showVisible ? prevScrollPos < 0 : prevScrollPos < 70 ;

    return (
        <div 
            className="marketplaceNavbar d-flex flex-column justify-content-around px-3" 
            style={{ 
                height: "15vh", 
                width: "100vw", 
                position: "fixed", 
                zIndex: 100,
                top: visible ? '0' : '-50px',
                backgroundImage: visible ? "linear-gradient(to bottom, rgb(15, 15, 15), rgba(15, 15, 15, 0))" : "linear-gradient(to bottom, rgb(15, 15, 15), rgba(15, 15, 15, 15))",
                transition: 'top 800ms, background-image 0.75s'
            }}
        >
            <div className="d-flex flex-row justify-content-between" style={{ position: "relative" }}>
                <div className="d-flex flex-row" style={{ transform: !visible && "translateY(55px)" }}>
                    {
                        window.location.pathname === "/" ?
                        <button className="textButton" style={{ fontSize: 16 }}>ENGLISH</button>
                        :
                        <>
                            <button className="textButton" style={{ fontSize: 16 }} onClick={() => {history.push("/")}}>◂ HOME</button>
                            <button className="textButton" style={{ fontSize: 16 }}>ENG</button>
                        </>
                    }
                </div>
                {visible &&
                <div style={{ position: "absolute", left: "50%", right: "50%", transform: "translateX(-75px)"}}>
                    <img src={Obatin} alt="" width="150" onClick={() => {history.push("/")}}/>
                </div>}
                <div className="d-flex flex-row">
                    {
                        Auth.isLogin ?
                        <>
                            {
                                !Auth.isAdmin ?
                                <>
                                    <button 
                                        className="marketplaceIconsLight"  
                                        style={{ transform: !visible && "translateY(55px)" }}
                                    >
                                        <i className="fas fa-shopping-cart me-2"></i>
                                    </button>
                                    <div ref={ref} style={{ transform: !visible && "translateY(55px)" }}>
                                        <button
                                            className="marketplaceIconsLight"
                                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        >
                                            <i className="fas fa-user"/>
                                        </button>
                                        <div style={{ position: "fixed", backgroundColor: "whitesmoke", minWidth: 150, height: "auto", right: visible ? 20 : 5, top: visible ? 50 : 30 }}>
                                            {
                                                showProfileDropdown && 
                                                <><div className="profileDropdown px-3 py-2" onClick={() => history.push('/profile')}>My Profile</div>
                                                <div className="profileDropdown px-3 py-2" onClick={() => {history.push(`/orderHistory/${Auth.id}`)}}>My History</div>
                                                <div className="profileDropdown px-3 py-2" onClick={onClickLogoutButton}>Logout</div></>
                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <button className="textButton" style={{ transform: !visible && "translateY(55px)", fontSize: 16 }} onClick={onClickLogoutButton}>
                                        LOGOUT
                                    </button>
                                    <button className="textButton" style={{ transform: !visible && "translateY(55px)", fontSize: 16 }} onClick={() => {history.push("/admin")}}>
                                        DASHBOARD ▸
                                    </button>
                                </>
                            }
                        </>
                        :
                        <>
                            <button className="textButton"  style={{ transform: !visible && "translateY(55px)", fontSize: 16  }} onClick={() => {history.push("/login")}}>
                                LOGIN
                            </button>
                            <button className="textButton"  style={{ transform: !visible && "translateY(55px)", fontSize: 16  }} onClick={() => {history.push("/register")}}>
                                SIGNUP
                            </button>
                        </>
                    }
                </div>
            </div>
            <div className={`d-flex justify-content-center flex-row ${ visible ? "" : ""}`}>
                <button className="menuOptions me-4" onClick={() => {history.push("/store")}}>MEDICINE & PHARMACY</button>
                <button className="menuOptions me-4" onClick={() => {history.push('/custom')}}>CUSTOM PRESCRIPTION</button>
                <button className="menuOptions me-4">HEALTH & LIFESTYLE</button>
                <button className="menuOptions me-4" onClick={() => {history.push("/aboutUs")}}>ABOUT US</button>
                <button className="menuOptions" onClick={() => {history.push("/contactUs")}}>CONTACT US</button>
            </div>
        </div>
    );
};
 
export default withRouter(MarketplaceNavbar);