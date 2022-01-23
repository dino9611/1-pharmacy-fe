import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';
import Slider from "react-slick";
import '../../../components/UI/adminInventory/style.css';
import HomeProductCard from '../../../components/UI/E-Pharma/homeProductCard';

const ProductCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/admin/top-medicine-orders?year=2021`, {
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
      <div>
        <Slider {...settings}>
            <div className="d-flex flex-row">
                {
                    datas.filter((item, idx) => idx < 5).map((data) => {
                        return (
                            <HomeProductCard
                                image={data.image}
                                name={data.medicine}
                                price={parseInt(data.price).toLocaleString("in", "ID")}
                            />
                        )
                    })
                }
            </div>
            <div className="d-flex flex-row">
                {
                    datas.filter((item, idx) => idx >= 5).map((data) => {
                        return (
                            <HomeProductCard
                                image={data.image}
                                name={data.medicine}
                                price={parseInt(data.price).toLocaleString("in", "ID")}
                            />
                        )
                    })
                }
            </div>
        </Slider>
      </div>
    );
}


export default ProductCarousel;