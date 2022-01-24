import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';import SquareButton from '../authInventory/squareButton';
import { withRouter } from 'react-router-dom';
import './style.css';
import HomeProductCard from './homeProductCard';

const HomeContainer4 = (props) => {
    const { history } = props;

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/top-medicine-orders?year=2021&filter=noLimit`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token-access")}`
                    }
                });
                setDatas(response.data)
            } catch (error) {
                toast.error(error.response.data.message || "Server Error", {
                    position: "top-right",
                    icon: "😵"
                });;
            }
        };
        fetchData();
    }, []);

	return (
		<div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "110vh", backgroundColor: "whitesmoke" }}>
            <div className="d-flex flex-row justify-content-center flex-wrap mt-4" style={{ height: "90vh", width: "85vw" }}>
                {
                    datas.filter((item, idx) => idx > 10 && idx <= 20).map((data) => {
                        return (
                            <HomeProductCard
                                image={data.image}
                                name={data.medicine}
                                price={parseInt(data.price).toLocaleString("in", "ID")}
                                onClick={() => {history.push(`/product/${data.id}`)}}
                            />
                        )
                    })
                }
            </div>
            <SquareButton label="BUY MEDICINE ▸" onClick={() => {history.push("/store")}}/>
        </div>
	);
}

export default withRouter(HomeContainer4);
