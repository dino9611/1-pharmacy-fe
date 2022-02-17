import React, { useEffect, useState } from 'react';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import QuantityCount from '../components/controller/E-pharma/QuantityCount';
import Footer from '../components/UI/E-Pharma/footer';
import { API_URL } from '../constants/api';
import axios from 'axios';
import SquareButton from '../components/UI/authInventory/squareButton';
import Input from '../components/UI/authInventory/input';
import { toast } from 'react-toastify';
import DetailsModal from '../components/UI/adminInventory/detailsModal';
import { withRouter } from 'react-router-dom';

const Cart = (props) => {
    const [cartData, setCartData] = useState([]);
    const { history} = props;
    
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

    const total = (cartData.cartDetails || []).map(cartItem => (
        (cartItem.Medicine.price * cartItem.quantity)
    )).reduce((prev, curr) => prev  + curr, 0).toLocaleString('in', 'ID');

    const grandTotal = (cartData.cartDetails || []).map(cartItem => (
        (cartItem.Medicine.price * cartItem.quantity)
    )).reduce((prev, curr) => prev  + curr, 50000).toLocaleString('in', 'ID')
    
    const [openModalCheckout, setOpenModalCheckout] = useState(false);

    const onCheckout = async (e) => {
        e.preventDefault();
        const { name, phoneNumber, address } = shippingDetails;

        try {
            let dataBody = {
                name,
                phoneNumber,
                address,
                grandTotal,
            };

            
            toast.success("Order is confirmed!", {
                position: "top-right",
                icon: "🤗"
            });
            
            setOpenModalCheckout(false);
            setCartData([]);
            history.push('/');

            await axios.post(`${API_URL}/checkout`, dataBody, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                }
            });
        } catch (error) {
            toast.error(error.response.data.message || "Server Error", {
                position: "top-right",
                icon: "😵"
            });
        };
    };
    

    const RenderCheckoutModal = () => {
        return (
          <DetailsModal
            isOpen={openModalCheckout} 
            toggle={() => setOpenModalCheckout(!openModalCheckout)}
            title="Confirm Checkout"
            size="lg"
            scrollable
          >
            <div className='d-flex flex row mb-4'>
                <div className='d-flex flex-column' style={{ width: '50%'}}>
                    <p style={{ fontSize: 18, paddingLeft: 5}}>
                        <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Total:</b> Rp. {total}<br />
                        <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Shipping Cost:</b> Rp. 50.000<br />
                        <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Grand Total:</b> Rp. {grandTotal}
                    </p>
                    <div>

                    </div>
                </div>
                <div className='me-2 p-2' style={{ width: '48%', backgroundColor: 'whitesmoke' }}>
                    <p>
                        <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Shipping To:</b> {shippingDetails.name}
                    </p>
                    <p>
                        <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Phone Number:</b> {shippingDetails.phoneNumber}
                    </p>
                    <p>
                    <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Address:</b> {shippingDetails.address}
                    </p>
                </div>
            </div>
            <hr />
            <p style={{ textAlign: 'center' }}>Make sure your order, total, and shipping details are all correct.</p>
            <p style={{ textAlign: 'center' }}>Please transfer <b style={{ fontWeight: 500, color: 'var(--pink-color)'}}>Rp. {grandTotal}</b> to this bank account:<br/>
            <b style={{ fontWeight: 500, color: 'var(--pink-color)'}}>BCA 42740127427 a/n Obatin Pharmaceuticals.</b></p>
            <p style={{ textAlign: 'center' }}>Don't forget to <b style={{ fontWeight: 500, color: 'var(--pink-color)'}}>screenshoot the payment proof</b>, and<br/>attach it in <b style={{ fontWeight: 500, color: 'var(--pink-color)'}}>My History page</b>. Click confirm to create this order.</p>
            <div className='d-flex justify-content-center'>
                <SquareButton label='CANCEL ORDER' onClick={() => setOpenModalCheckout(false)} className='me-3' style={{ backgroundColor: 'gainsboro', color: 'gray' }} />
                <SquareButton label='CONFIRM ORDER' onClick={onCheckout}/>
            </div>
          </DetailsModal>
        )
    }

    return (
        <>
            <RenderCheckoutModal />
            <MarketplaceNavbar showVisible/>
            <div style={{ backgroundColor: 'white', minHeight: '100vh', width: '100vw' }}>
                <div className='bestSellerContainer d-flex flex-column justify-content-start align-items-center mb-5' style={{ width: '100%', height: '25vh' }}>
                    <h2 style={{ width: '90%', textAlign: 'start', transform: 'translateY(-5px)', paddingTop: '15vh' }}>
                        My Cart
                    </h2>
                </div>
                <div className='d-flex flex-row m-5'>
                    <div className='d-flex flex-column' style={{ width: '70%', backgroundColor: 'whitesmoke', marginRight: '25px', height: '85vh', border: '2px solid gainsboro' }}>
                        <div style={{ width: '100%', height: '18%', }}>
                            <h3 className='ps-3 pt-3' style={{ color: 'var(--black-color)' }}>Order Summary</h3>
                            <hr className='mb-0' />
                            <div 
                                className='d-flex flex-row justify-content-between mb-4 ps-4 pe-5'
                                style={{ 
                                    backgroundColor: 'var(--lighter-pink-color)',
                                    paddingTop: 10,
                                    color: 'white',
                                }}
                            >
                                <p className='pe-5'>Product</p>
                                <p className='ps-5'>Quantity</p>
                                <p className='pe-5'>Subtotal</p>
                            </div>
                        </div>
                        <div className='p-3 me-4' style={{  width: '100%', height: '74%', overflowY: 'scroll' }}>
                            {(cartData.cartDetails || []).map(cartItem => (
                                <div className='d-flex mb-3'>
                                    <div className='d-flex me-3'>
                                        <img src={cartItem.Medicine.img} alt='medicine' style={{ width: 80, height: 80, border: '1px solid lightgray' }} />
                                    </div>
                                    <div style={{ width: 300 }}>
                                        <p className='mb-0 mt-3'>{cartItem.Medicine.name}</p>
                                        <p>Price: Rp. {cartItem.Medicine.price.toLocaleString("in", "ID")}</p>
                                    </div>
                                    <div className='mt-4 me-3'>
                                        <QuantityCount
                                            quantity={cartItem.quantity}
                                            onChange={quantity => updateCart(cartItem.MedicineId, quantity)}
                                            style={{ width: 70, textAlign: 'center', paddingLeft: 30 }}
                                        />
                                    </div>
                                    <div className='mt-4 pt-1 me-5'>
                                        <button 
                                            onClick={() => updateCart(cartItem.MedicineId, 0)}
                                            style={{
                                                backgroundColor: 'mistyrose',
                                                color: 'black',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div className='mt-4 pt-2 ms-4'>
                                        Rp. {(cartItem.Medicine.price * cartItem.quantity).toLocaleString('in', 'ID')}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div 
                            className='d-flex justify-content-end pe-5 pt-2' 
                            style={{ 
                                width: '100%', 
                                height: '8%',
                                fontSize: 20,
                            }}
                        >
                            <p>
                                <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>
                                Total:</b> Rp. {total}
                            </p>
                        </div>
                    </div>
                    <div className='p-3' style={{ backgroundColor: 'whitesmoke', width: '30%', height: '85vh', border: '2px solid gainsboro' }}>
                        <h3 style={{ color: 'var(--black-color)' }}>Checkout Summary</h3>
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
                            <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Total:</b> Rp. {
                                    (cartData.cartDetails || []).map(cartItem => (
                                        (cartItem.Medicine.price * cartItem.quantity)
                                    )).reduce((prev, curr) => prev  + curr, 0).toLocaleString('in', 'ID')
                                }<br />
                            <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Shipping Cost:</b> Rp. 50.000<br />
                            <b style={{ fontWeight: 500, color: 'var(--blue-color)'}}>Grand Total:</b> Rp. {grandTotal}
                        </p>
                        {
                            (shippingDetails.name.length && shippingDetails.phoneNumber.length && shippingDetails.address.length) ?
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <SquareButton label='CHECKOUT' onClick={() => setOpenModalCheckout(!openModalCheckout)}/>
                            </div>
                            :
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <SquareButton label='CHECKOUT' disabled disabledMessage="*please input all shipping details fields!" />
                            </div>
                        }
                    </div>
                </div>
            </div >
            <Footer/>
        </>
    )
};

export default withRouter(Cart);