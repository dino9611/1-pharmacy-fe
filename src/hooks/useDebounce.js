import React, { useState, useEffect } from 'react';

function useDebounce({ value, delay }) {
	const [debounceValue, setDebounceValue] = useState(null);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return { debounceValue };
}

export default useDebounce;
