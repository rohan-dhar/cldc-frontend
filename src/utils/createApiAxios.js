import axios from "axios";
import tokenHasExpired from "./tokenHasExpired";
import tokenStorage from "./tokenStorage";
import { BASE_URL, REFRESH_TOKEN_URL } from "../conf/urls";

const getNewAccessToken = async (refreshToken) => {
	if (!refreshToken) {
		tokenStorage.clear();
		return Promise.reject({ logout: true });
	}

	const data = {
		refresh: refreshToken,
	};

	let resp;

	try {
		resp = await axios.post(REFRESH_TOKEN_URL, data);
	} catch (error) {
		if (error.response) {
			tokenStorage.clear();
			return Promise.reject({ logout: true });
		} else {
			return Promise.reject({ logout: false });
		}
	}

	if (resp.data.access) {
		tokenStorage.set(resp.data.access);
		return resp.data.access;
	} else {
		tokenStorage.clear();
		return Promise.reject({ status: "logout" });
	}
};

export const getValidTokens = async () => {
	const { accessToken, refreshToken } = tokenStorage.get();
	if (!accessToken && !refreshToken) {
		tokenStorage.clear();
		return Promise.reject({ logout: true });
	}

	let token = accessToken;

	if (tokenHasExpired(accessToken)) {
		try {
			token = await getNewAccessToken(refreshToken);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	return { token };
};

export const axiosRequestInterceptor = async (config) => {
	const { token } = await getValidTokens();
	config.headers.Authorization = `Bearer ${token}`;
	return config;
};

const createApiAxios = () => {
	const apiAxios = axios.create({
		baseURL: BASE_URL,
	});

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
