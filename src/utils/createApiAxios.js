import axios from "axios";
import tokenStorage from "./tokenStorage";

export const getValidTokens = async () => {
	const { accessToken } = tokenStorage.get();
	if (!accessToken) {
		tokenStorage.clear();
		return Promise.reject({ logout: true });
	}

	let token = accessToken;

	return { token };
};

const createApiAxios = () => {
	const apiAxios = axios.create();

	apiAxios.interceptors.request.use(async (config) => {
		const { token } = await getValidTokens();
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	});

	apiAxios.interceptors.response.use(
		async (response) => response,
		(error) => {
			if (error.response && error.response.status === 401) {
				tokenStorage.clear();
			}
			return Promise.reject(error);
		}
	);

	return apiAxios;
};

export default createApiAxios;
