import React, { useEffect, useState } from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import QuantityCount from '../components/controller/E-pharma/QuantityCount';
import Footer from '../components/UI/E-Pharma/footer';
import { API_URL } from '../constants/api';
import axios from 'axios';
import SquareButton from '../components/UI/authInventory/squareButton';
import Input from '../components/UI/authInventory/input';
import { toast } from 'react-toastify';

const Cart = () => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/cart`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token-access')}`
                    }
                });
                setCartData(data);
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.message);
                } else {
                    console.log(error.message);
                }
            }
        }

        fetchCart();
    }, []);

    const updateCart = async (medicineId, quantity) => {
        try {
            const { data } = await axios.put(`${API_URL}/cart`, {
                medicineId,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token-access')}`
                }
            });
            setCartData(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.message);
            } else {
                console.log(error.message);
            }
        }
    }

    const [shippingDetails, setShippingDetails] = useState({
        name: "",
        phoneNumber: '',
        address: "",
    });

    const onFormInputChange = (value, name) => {
        setShippingDetails({ ...shippingDetails, [name]: value });
    };

    const onCheckout = async (e) => {
        e.preventDefault();
        const { name, phoneNumber, address } = shippingDetails;

        if (name.length && phoneNumber.length && address.length) {
            try {
                

            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });
            };
        } else {
            toast.error("All fields are required!", {
                position: "top-right",
                icon: "❌"
            });
        };
    };

    return (
        <>
            <MarketplaceNavbar showVisible/>
            <div style={{ backgroundColor: 'white', minHeight: '100vh', width: '100vw' }}>
                <div className='bestSellerContainer d-flex flex-column justify-content-start align-items-center mb-5' style={{ width: '100%', height: '25vh' }}>
                    <h2 style={{ width: '90%', textAlign: 'start', transform: 'translateY(-5px)', paddingTop: '15vh' }}>
                        My Cart
                    </h2>
                </div>
                <div className='d-flex flex-row m-5'>
                    <div className='p-3 me-4' style={{ backgroundColor: 'whitesmoke', width: '70%', height: '85vh', overflowY: 'scroll', border: '2px solid gainsboro' }}>
                        <h3 style={{ color: 'var(--pink-color)' }}>Order Summary</h3>
                        <hr />
                        {(cartData.cartDetails || []).map(cartItem => (
                            <div className='d-flex'>
                                <div className='d-flex'>
                                    <img src={cartItem.Medicine.img} style={{ width: 50, height: 50 }} />
                                </div>
                                <div>
                                    <p>{cartItem.Medicine.name}</p>
                                    <p>Price: {cartItem.Medicine.price}</p>
                                </div>
                                <div>
                                    <QuantityCount
                                        quantity={cartItem.quantity}
                                        onChange={quantity => updateCart(cartItem.MedicineId, quantity)}
                                    />
                                </div>
                                <div>
                                    <button onClick={() => updateCart(cartItem.MedicineId, 0)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='p-3' style={{ backgroundColor: 'whitesmoke', width: '30%', height: '85vh', border: '2px solid gainsboro' }}>
                        <h3 style={{ color: 'var(--pink-color)' }}>Checkout Summary</h3>
                        <hr />
                        <div className='my-4'>
                            <p style={{ fontSize: 18, fontWeight: 500 }} className='mb-2'>Shipping Details</p>
                            <div className='d-flex flex-column' style={{ width: '100%' }}>
                                <Input 
                                    type='text' 
                                    style={{ 
                                        width: '100%', 
                                        borderRadius: 5, 
                                        border: '1px solid black' 
                                    }} 
                                    className='mb-2' 
                                    placeholder='name' 
                                    name='name' 
                                    onChange={onFormInputChange}
                                    value={shippingDetails.name} 
                                />
                                <Input 
                                    type='number' 
                                    style={{ 
                                        width: '100%', 
                                        borderRadius: 5, 
                                        border: '1px solid black' 
                                    }} 
                                    className='mb-2' 
                                    placeholder='phone number'
                                    name='phoneNumber' 
                                    onChange={onFormInputChange}
                                    value={shippingDetails.phoneNumber} 
                                />
                                <textarea 
                                    type='text' 
                                    style={{ 
                                        width: '100%', 
                                        borderRadius: 5, 
                                        border: '1px solid black',
                                        minHeight: '20vh', 
                                        maxHeight: '30vh',
                                        padding: 10
                                    }} 
                                    placeholder='address'
                                    onChange={(e) => onFormInputChange(e.target.value, e.target.name)}
                                    value={shippingDetails.address} 
                                    name='address'  
                                />
                            </div>
                        </div>
                        <p style={{ fontSize: 18, paddingLeft: 5}}>
                            <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Subtotal:</b> Rp. 500.000<br />
                            <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Shipping Cost:</b> Rp. 50.000<br />
                            <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Grand Total:</b> Rp. 500.000
                        </p>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <SquareButton label='CHECKOUT' onClick={onCheckout}/>
                        </div>
                    </div>
                </div>
            </div >
            <Footer/>
        </>
    )
};

export default Cart;