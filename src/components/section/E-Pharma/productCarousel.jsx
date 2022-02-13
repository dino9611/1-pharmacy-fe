import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../../constants/api';
import Slider from "react-slick";
import '../../../components/UI/adminInventory/style.css';
import HomeProductCard from '../../../components/UI/E-Pharma/homeProductCard';
import { withRouter } from 'react-router-dom';

const ProductCarousel = (props) => {
    const { history } = props;

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

    const addToCart = async (id) => {
		try {
			await axios.post(`${API_URL}/cart`, {
				medicineId: id,
				quantity: 1,
			}, {
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token-access')}`
				}
			});
			toast.success("Item added to cart", {
				position: "top-right",
				icon: "🤩"
			});
		} catch (error) {
			toast.error(error.response.data.data.message || "Failed to add to cart. Try again.", {
				position: "top-right",
				icon: "😭"
			});
		}
	}

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
                                onClick={() => {history.push(`/product/${data.id}`)}}
								onAddToCartClick={() => addToCart(data.id)}
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
                                onClick={() => {history.push(`/product/${data.id}`)}}
								onAddToCartClick={() => addToCart(data.id)}
                            />
                        )
                    })
                }
            </div>
        </Slider>
      </div>
    );
}


export default withRouter(ProductCarousel);