import { useState, useEffect } from 'react';
import axios from 'axios';

function useAxios({ url, method, body = null, headers = null }) {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	// fetching loading = true, error = '', response = null => initial state

	const process = () => {
		axios[method](url, body, JSON.parse(headers))
			.then((res) => {
				setResponse(res.data);
				setLoading(false);
				//if nothing wrong, response = res.data, error = '', loading=false
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
				//if error, response = null, loading = false, error = err
			});
	};

	useEffect(() => {
		process();
	}, [method, url, headers, body]);

	return { response, error, loading };
}

export default useAxios;