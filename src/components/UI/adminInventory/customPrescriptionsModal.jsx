import React, { useState } from 'react';
import DetailsModal from './detailsModal';
import SquareButton from '../authInventory/squareButton';
import SearchBar from '../../controller/SearchBar';
import { API_URL } from '../../../constants/api';
import { toast } from 'react-toastify';
import './style.css';

const units = ['gr', 'ml', 'kg', 'L'];

const CustomPrescriptionsModal = (props) => {
    const [prescriptionsIndex, setPrescriptionsIndex] = useState(0);
    const [material, setMaterial] = useState(null);
	const [quantity, setQuantity] = useState(null);
	const [unit, setUnit] = useState(units[0]);
	const [serving, setServing] = useState(null);

    const [prescriptionIngredients, setPrescriptionIngredients] = useState([]);
    const [price, setPrice] = useState(0);

    const [prescriptionsData, setPrescriptionsData] = useState([]);
    const [isDone, setIsDone] = useState(false);

    const onSubmitButtonClick = () => {
        try{
            const datas = [...prescriptionsData, {
                orderID: props.customPrescriptions.map(customPrescription => customPrescription.id)[prescriptionsIndex],
                prescriptionDetails: prescriptionIngredients,
                price
            }];
            setPrescriptionsData(datas);
            setIsDone(false);
            clearForm();
            clearForNextItem();

            if(props.customPrescriptions.length === datas.length){
                setPrescriptionsIndex(0);
                props.closeModal(datas);
                setPrescriptionsData([]);
            } else {
                setPrescriptionsIndex(prescriptionsIndex + 1);
            }
        } catch (err){
            toast.error("Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    };

    const CustomPrescriptionFooter = () => {
        return (
            <div className="d-flex flex-row justify-content-between px-2" style={{ width: "100%" }}>
                <p className="mt-1 mb-0" style={{fontSize: 17}}>{prescriptionsIndex + 1} out of {props.customPrescriptions.length}</p>
                <button className={isDone || price === 0? "disabledSubmitButton" : "submitButton"} onClick={onSubmitButtonClick} disabled={isDone || price === 0 }>
                    SUBMIT PRESCRIPTION <i class="fas fa-check-circle"></i>
                </button>
            </div>
        );
    };

    const clearForNextItem = () => {
        setPrescriptionIngredients([]);
        setPrice(0);
    };

    const clearForm = () => {
        setMaterial(null);
        setQuantity(null);
        setUnit(units[0]);
        setServing(null);
    };
    
    const closeModal = () => {
        clearForm();
        clearForNextItem();
        setPrescriptionsIndex(0);
        if(props.customPrescriptions.length === prescriptionsData.length){
            props.closeModal(prescriptionsData);
        } else {
            props.closeModal([]);
        }
    };

    const onAddButtonClick = () => {
        const newPrescriptionIngredients = [...prescriptionIngredients, {
            material,
            quantity,
            unit,
            serving,
        }];
        const generatePrice = newPrescriptionIngredients.reduce((prev, curr) => prev += ((curr.material.price / curr.material.quantity_per_bottle) * curr.quantity) * curr.serving, 50000).toFixed();
        clearForm();
        setPrescriptionIngredients(newPrescriptionIngredients);
        setPrice(parseInt(generatePrice));
    }

    return (
        <DetailsModal
            size="xl"
            isOpen={props.customPrescriptions.length !== 0} 
            toggle={closeModal}
            title={`Custom Prescription Order #${prescriptionsIndex + 1}`}
            footer={<CustomPrescriptionFooter/>} 
        >
            {props.customPrescriptions.filter((customPrescription, index) => index === prescriptionsIndex).map(customPrescription => (
                    <div className="d-flex flex-row justify-content-around">
                        <div className="d-flex align-items-center" style={{ width: "50%", height: "60vh", overflow: "scroll" }} >
                            <img src={customPrescription.custom_prescription_image} alt="" width="100%"/>
                        </div>
                        <div className="d-flex flex-column" style={{ width: "50%", height: "65vh"}}>
                            <div className="px-3" style={{ width: "auto", height: "65%"}}>
                                <form>
                                    <div>
                                        <label for="a">Material</label>
                                        <SearchBar
                                            url={`${API_URL}/admin/transactions/material-list`}
                                            onSearchClick={(e) => setMaterial(e[0])}
                                        />
                                        <label for="quantity">Quantity</label>
                                        <input class="form-control" type="number" min="1" placeholder="0" id="quantity" name="quantity" required value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}></input>
                                        <label for="unit">Unit</label>
                                        <select class="form-control" id="unit" name="unit" required value={unit} onChange={(e) => setUnit(e.target.value)}>
                                            {units.map(u => (
                                                <option selected={unit === u} value={u}>{u}</option>
                                            ))}
                                        </select>
                                        <label for="serving">Serving</label>
                                        <input class="form-control" id="serving" name="serving" type="number" min="1" placeholder="0" required value={serving} onChange={(e) => setServing(parseInt(e.target.value))}></input>
                                    </div>
                                    {
                                        isDone ?
                                        <SquareButton 
                                            label="ADD" 
                                            className="mt-3" 
                                            disabled
                                            disabledMessage="*you have already submitted this form"
                                        />
                                        :
                                        <SquareButton 
                                            label="ADD" 
                                            className="mt-3" 
                                            onClick={onAddButtonClick} 
                                            disabled={(serving <= 0 || quantity <= 0 || material === null ) ? true : false}
                                        />
                                    }
                                </form>
                            </div>
                            <div className="mt-2 mx-3 p-3" style={{ width: "auto", height: "25%", overflow: "scroll", backgroundColor: "seashell" }}>
                                <h5>
                                    Material List:
                                </h5>
                                {
                                    prescriptionIngredients.map((prescriptionIngredient, index) => {
                                        return (
                                            <p className="m-0" style={{ color: "gray" }}>
                                                {index + 1}. {prescriptionIngredients[index].material.name} ({prescriptionIngredient.quantity}{prescriptionIngredient.unit} x {prescriptionIngredient.serving} serving)
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            <div className="d-flex align-items-center mx-3 mt-2 p-3" style={{ width: "auto", height: "10%", backgroundColor: "seashell" }}>
                                <h5 className="mb-0">
                                    Generate Price: Rp. {parseInt(price).toLocaleString("in", "ID")}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))
            }
        </DetailsModal>
    );
};
 
export default CustomPrescriptionsModal;
