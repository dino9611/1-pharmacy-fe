import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = (props) => {
    return (
        <div className="popup-box " style={{
            position: 'fixed',
            background: 'white',
            width: '100%',
            height: '100vh',
            top: '0',
            left: '0'
        }}>
            <div className="border border-dark p-2 border-rounded" style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'auto',
                width: '70%',
                margin: '0 auto',
                height: 'auto',
                maxHeight: '70vh',
                marginTop: 'calc(100vh - 85vh - 20px)'
            }}>
                <span className="border border-dark" onClick={props.handleClose} style={{
                    cursor: 'pointer',
                    position: 'fixed',
                    right: 'calc(15% - 30px)',
                    top: 'calc(100vh - 85vh - 33px)',
                    background: '#ededed',
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    lineHeight: '20px',
                    textAlign: 'center',
                    fontSize: '20px',

                }}> x </span>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputName">Name</label>
                            <input type="email" className="form-control" id="inputName" placeholder="Name" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                    </div>
                    <div className="form-group">
                        <label for="inputAddress2">Address 2</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputCity">City</label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputState">State</label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="inputZip">Zip</label>
                            <input type="text" className="form-control" id="inputZip" />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputPaymentMehtod">Payment Method</label>
                            <select id="inputPaymentMehtod" className="form-control">
                                <option selected>VISA</option>
                                <option>Mastercard</option>
                                <option>BCA</option>
                                <option>Alfamart</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="inputZip">Please input Rp {props.data.total} </label>
                            <input type="number" className="form-control" id="inputMoney" />
                        </div>
                    </div>
                    <Link to='/success'>
                        <button type="submit" className="btn btn-primary">Checkout</button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
