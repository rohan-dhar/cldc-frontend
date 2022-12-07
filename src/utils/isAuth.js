import tokenStorage from "./tokenStorage";
const isAuth = () => {
	const { accessToken } = tokenStorage.get();
	return !!accessToken;
};

export default isAuth;
