import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router';
import Obatin from '../../../assets/FullNameDarkmode.svg';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { toast } from 'react-toastify'
import '../../UI/adminInventory/style.css';
import { debounce } from '../../controller/E-pharma/debounce';

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
    const [visible, setVisible] = useState(true);

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;
        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

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
                backgroundImage: visible ? "linear-gradient(to bottom, rgb(15, 15, 15), rgba(15, 15, 15, 0))" : "linear-gradient(to bottom, rgb(15, 15, 15), rgba(15, 15, 15, 15))"
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
                                                <><div className="profileDropdown px-3 py-2" onClick={() => history.push('/profile')}>My Profile</div>
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
            <ul className={`d-flex justify-content-center flex-row ${ visible ? "mt-4" : "mt-2"}`} style={{listStyle:'none'}}>
                <li className="menuOptions me-4" onClick={() => {history.push("/store")}}>BUY MEDICINE</li>
                <li className="menuOptions me-4" onClick={() => {history.push('/custom')}}>CUSTOM ORDER</li>
                <li className="menuOptions me-4">HEALTH & LIFESTYLE</li>
                <li className="menuOptions me-4">ABOUT US</li>
                <li className="menuOptions">CONTACT US</li>
            </ul>
            
        </div>
    );
};
 
export default withRouter(MarketplaceNavbar);