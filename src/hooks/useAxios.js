import { useState, useEffect } from 'react';
import axios from 'axios';

function useAxios({ url, method, body = null, headers = null, params = null }) {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	// fetching loading = true, error = '', response = null => initial state
	const process = () => {
		axios[method](url, { body, headers, params })
			.then((res) => {
				setLoading(false);
				setResponse(res.data);
				//if nothing wrong, response = res.data, error = '', loading=false
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
				//if error, response = null, loading = false, error = err
			});
	};

	useEffect(() => {
		if (method === 'get' || method === 'delete') {
			process();
		} else {
			if (!body) {
				return;
			}
			process();
		}
	}, [method, url, body]);

	return { response, error, loading };
}

export default useAxios;
