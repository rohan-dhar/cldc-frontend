import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import createApiAxios from "../utils/createApiAxios";

const initialResource = {
	loading: false,
	error: false,
	data: null,
	headers: null,
};

const apiAxios = createApiAxios();

const useResource = (options, autoLoad = true, auth = true, debug = false) => {
	const [shouldLoad, setShouldLoad] = useState(autoLoad);
	const [resource, setResource] = useState(initialResource);
	const log = useCallback(
		(msg) => {
			if (debug) console.log(msg);
		},
		[debug]
	);

	const reset = useCallback(() => {
		console.log("[uR] Load reset");
		setResource(initialResource);
		setShouldLoad(false);
	}, []);

	const mounted = useRef(true);

	useEffect(() => {
		mounted.current = true;
		return () => (mounted.current = false);
	}, []);

	console.log("resource.error :>> ", resource.error);

	const startLoad = useCallback(() => setShouldLoad(true), []);

	const load = useCallback(async () => {
		log("[uR]: Load called ");
		if (
			resource.loading ||
			!shouldLoad ||
			(!Array.isArray(options) && !options?.url)
		) {
			log("[uR]: Load stopped ");
			return;
		}
		log("[uR]: Load started ");
		setShouldLoad(false);
		let resp;
		setResource({ loading: true, error: false, data: null, headers: null });
		const axiosInstance = auth ? apiAxios : axios;
		const multiple = Array.isArray(options);

		try {
			if (multiple) {
				resp = await Promise.all(options.map((req) => axiosInstance(req)));
			} else {
				resp = await axiosInstance(options);
			}
		} catch (error) {
			log("[uR]: Load error! ");
			return setResource({
				loading: false,
				error,
				data: null,
				headers: null,
			});
		}

		if (mounted.current) {
			log("[uR]: Load complete: " + options.url);
			setResource({
				loading: false,
				error: false,
				data: multiple
					? resp.map((resp) => resp.data ?? true)
					: resp.data || true,
				headers: resp?.headers || false,
			});
		} else {
			log("[uR]: Load complete but NOT MOUNTED ");
		}
	}, [options, resource.loading, shouldLoad, auth, log]);

	useEffect(() => {
		if (!resource.loading && shouldLoad) {
			load();
		}
	}, [resource.loading, shouldLoad, load]);

	return [resource, startLoad, reset];
};

export default useResource;
