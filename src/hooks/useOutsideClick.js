import React, { useState, useEffect, useRef } from 'react';

function useOutsideClick() {
	const [isVisible, setIsVisible] = useState(false);
	const ref = useRef();
	const handleOutsideClick = () => {
		if (ref.current) {
			setIsVisible(true);
		}
	};
	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.addEventListener('click', handleOutsideClick);
		};
	}, []);

	return [ref, isVisible, setIsVisible];
}

export default useOutsideClick;
