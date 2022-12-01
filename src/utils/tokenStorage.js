const tokenStorage = {
	ACCESS_TOKEN_KEY: "accessToken",
	REFRESH_TOKEN_KEY: "refreshToken",

	get() {
		const res = {};
		res.accessToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
		res.refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);

		return res;
	},

	set(accessToken = null, refreshToken = null) {
		if (accessToken && typeof accessToken === "string") {
			localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
		}
		if (refreshToken && typeof refreshToken === "string") {
			localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
		}
	},
	clear() {
		localStorage.clear();
	},
};

export default tokenStorage;
