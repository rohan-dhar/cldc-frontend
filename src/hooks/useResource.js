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

	const startLoad = useCallback(() => setShouldLoad(true), []);

	const controllerRef = useRef(null);

	const load = useCallback(async () => {
		log("[uR]: Load called ");
		if (!shouldLoad || (!Array.isArray(options) && !options?.url)) {
			log("[uR]: Load stopped ");
			return;
		}

		if (resource.loading) {
			if (Array.isArray(controllerRef.current)) {
				controllerRef.current.forEach((controller) => controller.abort());
			} else if (controllerRef.current) controllerRef.current.abort();

			log("[uR]: Aborted previous call ");
		}

		log("[uR]: Load started ");
		setShouldLoad(false);
		let resp;
		setResource({ loading: true, error: false, data: null, headers: null });
		const axiosInstance = auth ? apiAxios : axios;
		const multiple = Array.isArray(options);

		try {
			if (multiple) {
				const controllers = [];
				for (let i = 0; i < options.length; ++i)
					controllers.push(new AbortController());

				controllerRef.current = controllers;
				resp = await Promise.all(
					options.map((req, index) =>
						axiosInstance({ ...req, controller: controllers[index].signal })
					)
				);
			} else {
				const controller = new AbortController();
				controllerRef.current = controller;
				resp = await axiosInstance({
					...options,
					controller: controller.signal,
				});
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

		controllerRef.current = null;

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
