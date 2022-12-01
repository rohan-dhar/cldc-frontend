import tokenStorage from "./tokenStorage";
const isAuth = () => {
	const { accessToken, refreshToken, isSuper } = tokenStorage.get();
	return [!!(accessToken || refreshToken), isSuper];
};

export default isAuth;
