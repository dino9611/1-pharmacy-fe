import React, { useState } from 'react';
import DetailsModal from '../../UI/adminInventory/detailsModal';
import SquareButton from '../../UI/authInventory/squareButton';
import SearchBar from '../../controller/SearchBar';
import { API_URL } from '../../../constants/api';

const CustomPrescriptionModal = (props) => {
    const [prescriptionsIndex, setPrescriptionsIndex] = useState(0);
    const [materials, setMaterials] = useState([]);
	const [quantity, setQuantity] = useState("");
	const [unit, setUnit] = useState("mg");
	const [serving, setServing] = useState("");
    const [prescriptionIngredients, setPrescriptionIngredients] = useState([]);

    const CustomPrescriptionFooter = () => {
        return (
            <div className="d-flex flex-row justify-content-between px-2" style={{ width: "100%" }}>
                <div className="d-flex flex-row justify-content-around">
                    {
                        (prescriptionsIndex <= 0)
                        ?
                        null
                        :
                        <div className="chevronButton me-3" onClick={() => setPrescriptionsIndex(prescriptionsIndex - 1)}>
                            <i class="fas fa-chevron-left"></i>
                        </div>
                    }
                    <p className="mb-0">{prescriptionsIndex + 1} out of {props.customPrescriptions.length}</p>
                    {
                        (prescriptionsIndex === props.customPrescriptions.length - 1)
                        ?
                        null 
                        :
                        <div className="chevronButton ms-3" onClick={() => setPrescriptionsIndex(prescriptionsIndex + 1)}>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    }
                </div>
                <div className="chevronButton">
                    SUBMIT <i class="fas fa-check-circle"></i>
                </div>
            </div>
        );
    };

    return (
        <DetailsModal
            size="xl"
            isOpen={props.customPrescriptions.length !== 0} 
            toggle={props.closeModal}
            title={`Custom Prescription Order #${prescriptionsIndex + 1}`}
            footer={<CustomPrescriptionFooter/>} 
        >
            {
                props.customPrescriptions.filter((customPrescription, index) => index === prescriptionsIndex).map(customPrescription => (
                    <div className="d-flex flex-row justify-content-around">
                        <div className="d-flex align-items-center" style={{ width: "50%", height: "60vh"}}>
                            <img src={customPrescription.custom_prescription_image} alt="" width="100%" />
                        </div>
                        <div className="d-flex flex-column" style={{ width: "50%", height: "60vh"}}>
                            <div className="px-3" style={{ width: "auto", height: "65%"}}>



                                <form>
                                    <div class="form-group">
                                        <label for="formControlMaterial">Material</label>
                                        <SearchBar
                                            url={`${API_URL}/admin/transactions/material-list`}
                                            onSearchClick={(value) => setMaterials(value)}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="formControlQuantity">Quantity</label>
                                        <input class="form-control" type="number" min="1" placeholder="0" id="formControlQuantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                                    </div>
                                    <div class="form-group">
                                        <label for="formControlUnit">Unit</label>
                                        <select class="form-control" id="formControlUnit" required value={unit} onChange={(e) => setUnit(e.target.value)}>
                                            <option selected value="mg">mg</option>
                                            <option value="gr">gr</option>
                                            <option value="ml">ml</option>
                                            <option value="cl">cl</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="fromControlServing">Serving</label>
                                        <input class="form-control" type="number" min="1" placeholder="0" id="fromControlServing" required value={serving} onChange={(e) => setServing(e.target.value)}></input>
                                    </div>
                                    <SquareButton label="ADD" className="mt-3" onClick=""/>
                                </form>


                            </div>
                            <div className="mx-3 mt-3 p-3" style={{ width: "auto", height: "35%", overflow: "scroll", backgroundColor: "seashell" }}>
                                <h5>
                                    Material List:
                                </h5>
                                <p className="m-0" style={{ color: "gray" }}>
                                    1. Adnjsjanskasnkja (5mg x 4 serving)
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </DetailsModal>
    );
};
 
export default CustomPrescriptionModal;
