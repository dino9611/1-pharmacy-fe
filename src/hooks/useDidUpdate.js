import { useRef, useEffect } from 'react';

function useDidUpdate(fn, input) {
	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			return fn();
		}
		didMountRef.current = true;
	}, [input]);
}

export default useDidUpdate;
