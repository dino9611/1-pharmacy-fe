import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Checkout from '../components/UI/utility/Checkout';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import Footer from '../components/UI/E-Pharma/footer';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    console.log(cart);
    // const dispatch = useDispatch()
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const handlePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <MarketplaceNavbar showVisible/>
            <div className='wrapper px-5' style={{ paddingTop: 100, backgroundColor: 'whitesmoke', minHeight: '70vh', width: '100vw' }}>
                <h1 className="title fw-bolder" style={{ textAlign: 'center' }}>YOUR CART</h1>
                <div className='top d-flex p-2' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to='/'>
                        <button className="btn p-2 m-2 btn-primary text-light btn-lg">
                            BACK TO HOME
                        </button>
                    </Link>
                    <div className='top-text m-2' style={{ cursor: 'pointer', fontSize: '30px' }}>Cart ({cart.total})</div>
                </div>
                <div className='btn' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='info' style={{ display: 'flex', flex: '3' }}>
                        {cart.medicines.map((medicine) => (
                            <div className="product" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className='details p-2' style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-around' }}>
                                    <img src={medicine.img} style={{ width: '200px' }} />
                                    <span className='title'>
                                        <b>Product:</b> {medicine.name}
                                    </span>
                                </div>
                                <div className='price-detail' style={{
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <div className='d-flex p-2 m-2 flex-row'>
                                        <button className="bi bi-bag-dash-fill p-2 m-2"></button>
                                        <div className='quantity p-2 m-2 fw-light h4'>{medicine.quantity}</div>
                                        <button className="bi bi-bag-plus-fill p-2 m-2"></button>
                                    </div>
                                    <div className='price fw-bolder p-2 m-2 h4'>
                                        Rp. {medicine.price * medicine.quantity}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border p-2 border-dark border-rounder" style={{
                        flex: '1',
                        height: '250px',
                    }}>
                        <div className='order-summary fw-bolder'>ORDER SUMMARY</div>
                        <div className='summary-item fw-lighter' style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span>Subtotal</span>
                            <span>Rp. {cart.total}</span>
                        </div>
                        <div className='summary-item fw-lighter' style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span>Estimated Shipping</span>
                            <span>Rp 10.000</span>
                        </div>
                        <div className='summary-item fw-lighter' style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <span>Shipping Discount</span>
                            <span>Rp -10.000</span>
                        </div>
                        <div type="total">
                            <span>Total  </span>
                            <span>Rp {cart.total}</span>
                        </div>
                        <input
                            type="button"
                            value="CHECKOUT"
                            className='btn p-2 m-2 btn-primary text-light btn-lg'
                            onClick={handlePopup}
                        />
                        {isOpen && <Checkout handleClose={handlePopup} data={cart} />}
                    </div>
                </div>
            </div >
            <Footer/>
        </>
    )
};

export default Cart;
