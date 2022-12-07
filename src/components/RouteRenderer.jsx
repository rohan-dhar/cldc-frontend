import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useResource from "../hooks/useResource";
import isAuth from "../utils/isAuth";
import { FETCH_USER_URL } from "../conf/urls";
import { memo } from "react";
import { Loader } from "@mantine/core";
import useIdentity from "../hooks/useIdentity";
import ErrorPage from "../pages/ErrorPage";

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
		if (!!auth && !user && !error) {
			fetchUser();
		}
	}, [user, fetchUser, auth, error]);

	useEffect(() => {
		if (!error) return;
		setUser({
			name: "Rohan Dhar",
			email: "rohan.offi@gmail.com",
			image:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQucSpYhkGEuW3ROj0tuENavZD3UgKVJMTjTKLjVPcad2WP4z5eBQdHKotjXqrTG8cLtCU&usqp=CAU",
		});
	}, [error, setUser]);

	useEffect(() => {
		if (!data) {
			return;
		}
		setUser(data);
		reset();
	}, [data, reset, setUser]);

	if (loggedOut && !isAuth()) {
		return children;
	} else if (loggedIn && isAuth()) {
		if (user) {
			return children;
		} else if (loading) {
			return <Loader className="loader" />;
		} else if (error && !error.logout) {
			return (
				<ErrorPage>
					We could not load your account. Please try again later.
				</ErrorPage>
			);
		} else {
			return null;
		}
	} else {
		return <Navigate to="/" />;
	}
});

export default RouteRenderer;
