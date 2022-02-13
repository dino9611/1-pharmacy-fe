import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QuantityCount from '../components/controller/E-pharma/QuantityCount';
import MarketplaceNavbar from '../components/section/admin/marketplaceNavbar';
import { API_URL } from '../constants/api';
import useAxios from '../hooks/useAxios';
import Footer from '../components/UI/E-Pharma/footer';
import SquareButton from '../components/UI/authInventory/squareButton';
import { toast } from 'react-toastify';

function ProductDetailPage() {
	let [quantity, setQuantity] = useState(1);
	let { id } = useParams();
	
	let { response, error, loading } = useAxios({
		url: `${API_URL}/inventory/${id}`,
		method: 'get',
	});

	const addToCart = async () => {
		const medicineId = response.id;
		try {
			await axios.post(`${API_URL}/cart`, {
				medicineId,
				quantity,
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

	const descriptionStyle = { color: 'var(--blue-color)', fontWeight: 600 }

	return (
		<div>
			<MarketplaceNavbar showVisible/>
			{loading && <h4>loading ...</h4>}
			{response && (
				<>
					<div
						className='d-flex flex-column justify-content-center align-items-center'
						style={{
							minHeight: '100vh',
							width: '100vw',
							backgroundColor: 'white',
							paddingTop: '15vh',
						}}
					>
						<div style={{ width: '90%', textAlign: 'start' }}>
							<nav aria-label="breadcrumb bg-success">
								<ol class="breadcrumb">
									<li class="breadcrumb-item"><a href="/">Home</a></li>
									<li class="breadcrumb-item"><a href="/store">Medicines & Pharmacy</a></li>
									<li class="breadcrumb-item active" aria-current="page">{response.name}</li>
								</ol>
							</nav>
						</div>
						<div 
							className='d-flex flex-row justify-content-center align-items-center'
							style={{
								width: '80%',
								height: '65vh',
								backgroundColor: 'whitesmoke',
								boxShadow: "1px 5px 15px -5px gray",
								WebkitBoxShadow: "1px 5px 15px -5px gray",
								MozBoxShadow: "1px 5px 15px -5px gray",
								border: "1px solid lightgray",
							}}
						>
							<div className='d-flex flex-column align-items-center' style={{ width: '40%' }}>
								<div style={{ width: '350px', }}>
									<img alt='' src={response.image} className='img-thumbnail' />
								</div>
							</div>
							<div className='d-flex flex-column align-items-start' style={{ width: '60%' }}>
								<h2 style={{ color: 'var(--black-color)' }}>{response.name}</h2>
								<h4 className='mb-5' style={{ color: 'var(--pink-color)' }}>Rp. {response.price.toLocaleString('in', 'ID')} per bottle</h4>
								<p style={{ width: '85%' }}>
									<b style={descriptionStyle}>Description:</b> {response.name} is the medicine intended in the use for the {response.description}
								</p>
								<p>
									<b style={descriptionStyle}>Dosage:</b> {response.serving}x serving per day or may vary according to doctor's instructions
								</p>
								<div className='d-flex flex-row mt-4'>
									<QuantityCount
										quantity={quantity}
										onChange={(value) => setQuantity(value)}
									/>
									<SquareButton label="ADD TO CART" onClick={addToCart} style={{ height: '38px', marginLeft: 30 }} />
								</div>
							</div>
						</div>
						<div className='d-flex flex-row justify-content-between my-5' style={{ width: '80%' }}>
							<div style={{ width: '75%' }}>
								<p>
									<b style={descriptionStyle}>General Indication: </b>
									THIS DRUG INFORMATION IS FOR MEDICAL ONLY.<br/>
									Restore electrolyte balance in a dehydrated state.
								</p>
								<hr width={500}/>
								<p>
									<b style={descriptionStyle}>Attention: </b>
									USE WISELY ON MEDICAL PRESCRIPTION. Use with caution in patients with hypertension,<br/>
									congestive heart failure, peripheral and pulmonary oedema, impaired renal function,<br />
									pre-eclampsia, pediatric patients and the elderly. Always check the compatibility of additional<br />
									medications with this solution before use. Store at temperatures below 30 degrees Celsius.
								</p>
								<hr width={500}/>
								<p>
									<b style={descriptionStyle}>No. Registration: </b>
									BPOM: GKL2012431149A1* *) This drug is a generic drug.<br/>
									Registration number can be different according to the availability of pharmacy stock.
								</p>
								<hr width={500}/>
								<p>
									<b style={descriptionStyle}>Manufacture: </b>
									Generic Manufacturer under the evaluation by ©Obatin Pharmaceuticals
								</p>
							</div>
							<div className='d-flex flex-column' style={{ width: '25%' }}>
								<div className='d-flex flex-row mb-4'>
									<img alt='' src="https://www.halodoc.com/assets/svg/safepackaging.webp" width={70} height={70} />
									<p className='ms-3'>Safe & personalized packaging</p>
								</div>
								<div className='d-flex flex-row mb-4'>
									<img alt='' src="https://www.halodoc.com/assets/svg/24x7Delivery.webp" width={70} height={70} />
									<p className='ms-3'>Ready to deliver 24 hours everyday</p>
								</div>
								<div className='d-flex flex-row'>
									<img alt='' src="https://www.halodoc.com/assets/svg/authStores.webp" width={70} height={70} />
									<p className='ms-3'>Sent directly from our warehouse and pharmacy</p>
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</>
			)}
			{error && <h1>ERROR </h1>}
		</div>
	);
}

export default ProductDetailPage;