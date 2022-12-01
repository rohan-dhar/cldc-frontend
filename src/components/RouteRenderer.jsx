import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useResource from "../hooks/useResource";
import isAuth from "../utils/isAuth";
import { FETCH_USER_URL } from "../conf/urls";
import { memo } from "react";
import { Loader } from "@mantine/core";
import useIdentity from "../hooks/useIdentity";

const RouteRenderer = memo(({ loggedIn, loggedOut, children, path }) => {
	const { user, setUser } = useIdentity();
	const auth = isAuth();

	const [{ loading, data, error }, fetchUser, reset] = useResource(
		{
			method: "GET",
			url: FETCH_USER_URL,
		},
		false
	);

	useEffect(() => {
		if (!!auth[0] && !user) {
			fetchUser();
		}
	}, [user, fetchUser, path, setUser, auth]);

	useEffect(() => {
		if (!data) {
			return;
		}
		setUser(data);
		reset();
	}, [data, reset, setUser]);

	if (loggedOut && !isAuth()[0]) {
		return children();
	} else if (loggedIn && isAuth()[0]) {
		if (user) {
			return children();
		} else if (loading) {
			return <Loader />;
		} else if (error && !error.logout) {
			return <div> Whoops! Can't fetchUser user</div>;
		} else {
			return null;
		}
	} else {
		return <Navigate to="/" />;
	}
});

export default RouteRenderer;
