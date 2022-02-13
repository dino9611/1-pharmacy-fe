import React  from 'react';
import './style.css';

const HomeProductCard = (props) => {
	return (
		<div 
            className="homeProductCard d-flex flex-column justify-content-center align-items-center mx-2"
            style={{ ...props.style, position: "relative"}}
        >
            <div onClick={props.onClick} style={{ width: '100%', height: '100%' }}>
                <img 
                    alt="product" 
                    src={props.image}
                    style={{ 
                        width: "100%", 
                        height: "65%", 
                        objectFit: "cover" 
                    }}
                />
                <div 
                    className="py-2 px-3" 
                    style={{ 
                        width: "100%", 
                        height: "35%", 
                    }}
                >
                    <p className="lh-sm mb-0">
                        {props.name}
                    </p>
                    <p className="mb-0" style={{ color: "var(--blue-color)"}}>
                        Rp. {props.price}
                    </p>
                </div>
            </div>
            <button className="marketplaceIconsDark" onClick={props.onAddToCartClick}>
                <i class="fas fa-shopping-basket" style={{ position: "absolute", bottom: 12, right: 12 }}></i>
            </button>
        </div>
	);
}

export default HomeProductCard;
