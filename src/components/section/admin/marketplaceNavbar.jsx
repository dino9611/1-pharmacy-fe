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

    const visible = prevScrollPos < 70;

    return (
        <div 
            className="marketplaceNavbar d-flex justify-content-center flex-column px-3" 
            style={{ 
                height: "15vh", 
                width: "100vw", 
                overflow: "hidden", 
                position: "fixed", 
                zIndex: 10,
                top: visible ? '0' : '-50px',
                backgroundImage: visible ? "linear-gradient(to bottom, rgb(15, 15, 15), rgba(15, 15, 15, 0))" : "linear-gradient(to bottom, rgb(15, 15, 15), rgba(15, 15, 15, 15))",
                transition: 'top 800ms, background-image 0.75s'
            }}
        >
            <div className="d-flex flex-row justify-content-between" style={{ position: "relative" }}>
                <div className="d-flex flex-row" style={{ transform: !visible && "translateY(40px)" }}>
                    <button className="marketplaceIconsLight"><i className="fas fa-bars"></i></button>
                    <p className="textButton ms-2" style={{ transform: "translateY(8px)" }}>ENG</p>
                </div>
                {visible &&
                <div className="" style={{ position: "absolute", left: "50%", right: "50%", transform: "translateX(-75px)"}}>
                    <img src={Obatin} alt="" width="150" />
                </div>}
                <div className="d-flex flex-row">
                    {
                        Auth.isLogin ?
                        <>
                            {
                                !Auth.isAdmin ?
                                <>
                                    <button className="marketplaceIconsLight"  style={{ transform: !visible && "translateY(40px)" }}><i className="fas fa-shopping-cart me-2"></i></button>
                                    <div ref={ref} style={{ transform: !visible && "translateY(40px)" }}>
                                        <button
                                            className="marketplaceIconsLight"
                                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                        >
                                            <i className="fas fa-user" style={{ transform: "translateY(5px)" }} />
                                        </button>
                                        <div style={{ position: "fixed", backgroundColor: "whitesmoke", minWidth: 150, height: "auto", right: 20, top: 50 }}>
                                            {
                                                showProfileDropdown && 
                                                <><div className="profileDropdown px-3 py-2">My Profile</div>
                                                <div className="profileDropdown px-3 py-2">My History</div>
                                                <div className="profileDropdown px-3 py-2" onClick={onClickLogoutButton}>Logout</div></>
                                            }
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    <button className="textButton" style={{ transform: !visible && "translateY(40px)", fontSize: 14 }} onClick={onClickLogoutButton}>
                                        LOGOUT
                                    </button>
                                    <button className="textButton" style={{ transform: !visible && "translateY(40px)", fontSize: 14 }} onClick={() => {history.push("/admin")}}>
                                        ADMIN DASHBOARD ▸
                                    </button>
                                </>
                            }
                        </>
                        :
                        <>
                            <button className="textButton"  style={{ transform: !visible && "translateY(40px)", fontSize: 14  }} onClick={() => {history.push("/login")}}>
                                LOGIN
                            </button>
                            <button className="textButton"  style={{ transform: !visible && "translateY(40px)", fontSize: 14  }} onClick={() => {history.push("/signup")}}>
                                SIGNUP
                            </button>
                        </>
                    }
                </div>
            </div>
            <div className={`d-flex justify-content-center flex-row ${ visible ? "mt-4" : "mt-2"}`}>
                <button className="menuOptions me-4" onClick={() => {history.push("/")}}>BUY MEDICINE</button>
                <button className="menuOptions me-4">CUSTOM PRESCRIPTION</button>
                <button className="menuOptions me-4">HEALTH & LIFESTYLE</button>
                <button className="menuOptions me-4">ABOUT US</button>
                <button className="menuOptions">CONTACT US</button>
            </div>
            
        </div>
    );
};
 
export default withRouter(MarketplaceNavbar);