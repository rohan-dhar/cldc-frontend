const decodeJWT = (token) => {
	if (!token || typeof token !== "string") {
		return false;
	}
	const payload = token.split(".")[1];
	if (!payload) {
		return false;
	}
	try {
		return JSON.parse(atob(payload));
	} catch (error) {
		return false;
	}
};
export default decodeJWT;
