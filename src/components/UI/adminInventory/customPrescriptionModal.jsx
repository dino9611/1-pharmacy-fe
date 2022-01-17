import React, { useState } from 'react';
import DetailsModal from '../../UI/adminInventory/detailsModal';
import SquareButton from '../../UI/authInventory/squareButton';
import SearchBar from '../../controller/SearchBar';
import { API_URL } from '../../../constants/api';
import { toast } from 'react-toastify';
import './style.css';

const units = ['gr', 'ml', 'kg', 'L'];

const CustomPrescriptionModal = (props) => {
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
                prescriptionID: props.customPrescriptions.map(customPrescription => customPrescription.custom_prescription_id)[prescriptionsIndex],
                prescriptionDetails: prescriptionIngredients,
                price
            }];
            console.log(datas);
            // nanti ini dikirim ke backend:
            //[
            //    { prescriptionID: 132, prescription:prescriptioningredients, price:price },    --> alias prescription 1
            //    { prescriptionID: 352, prescription:prescriptioningredients, price:price },    --> alias prescription 2
            //    { prescriptionID: 421, prescription:prescriptioningredients, price:price }     --> alias prescription 3
            // ]
            // nanti page prescription yang udah kelar, buttonnya bakal ke disable krn isDone
            setIsDone(true);
            setPrice(0);
            setPrescriptionsData(datas);
        } catch (err){
            toast.error("Server Error", {
                position: "top-right",
                icon: "😵"
            });
        }
    }
    console.log(material, quantity, unit, serving, isDone)
    console.log(prescriptionIngredients)
    console.log(prescriptionsData)

    const onNextButton = () => {
        setIsDone(false);
        setPrescriptionIngredients([]);
        setPrescriptionsIndex(prescriptionsIndex + 1)
    }

    const CustomPrescriptionFooter = () => {
        return (
            <div className="d-flex flex-row justify-content-between px-2" style={{ width: "100%" }}>
                <div className="d-flex flex-row justify-content-around">
                    {
                        (prescriptionsIndex <= 0) ? null :
                        <button className="chevronButton me-3" onClick={() => setPrescriptionsIndex(prescriptionsIndex - 1)} disabled={true}>
                            <i class="fas fa-chevron-left"></i>
                        </button>
                    }
                    <p className="mt-1 mb-0" style={{fontSize: 17}}>{prescriptionsIndex + 1} out of {props.customPrescriptions.length}</p>
                    {
                        (prescriptionsIndex === props.customPrescriptions.length - 1) ? null :
                        <button className="chevronButton ms-3" onClick={onNextButton} disabled={isDone ? false : true}>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    }
                </div>
                <button className={isDone || price === 0? "disabledSubmitButton" : "submitButton"} onClick={onSubmitButtonClick} disabled={isDone || price === 0 }>
                    SUBMIT PRESCRIPTION <i class="fas fa-check-circle"></i>
                </button>
            </div>
        );
    };

    const closeModal = () => {
        setPrescriptionsIndex(0);
        props.closeModal();
    }

    const onAddButtonClick = () => {
        const newPrescriptionIngredients = [...prescriptionIngredients, {
            material,
            quantity,
            unit,
            serving,
        }];
        setPrescriptionIngredients(newPrescriptionIngredients);
        const generatePrice = newPrescriptionIngredients.reduce((prev, curr) => prev += ((curr.material.price / curr.material.quantity_per_bottle) * curr.quantity) * curr.serving, 50000).toFixed();
        //seharusnya, quantity * serving = hasil ==> quantity_left - hasil. kalo someday quantity_left habis total, dia ambil stok dari bottle_quantity dan kurangin jd -1
        setPrice(generatePrice);
        setMaterial({});
        setQuantity(null);
        setUnit("");
    }

    return (
        <DetailsModal
            size="xl"
            isOpen={props.customPrescriptions.length !== 0} 
            toggle={closeModal}
            title={`Custom Prescription Order #${prescriptionsIndex + 1}`}
            footer={<CustomPrescriptionFooter/>} 
        >
            {
                props.customPrescriptions.filter((customPrescription, index) => index === prescriptionsIndex).map(customPrescription => (
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
                                            disabledMessage="*please fill in all fields & enter a valid number"
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
 
export default CustomPrescriptionModal;
