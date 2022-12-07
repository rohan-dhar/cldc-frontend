import { useEffect } from "react";
import { FETCH_USER_URL } from "./conf/urls";
import useResource from "./hooks/useResource";

const Test = () => {
	const [{ loading, data, error }, fetchUser, reset] = useResource(
		{
			method: "GET",
			url: FETCH_USER_URL,
		},
		false,
		true,
		true
	);

	useEffect(() => {
		if (!error) fetchUser();
	}, [data, error, fetchUser]);

	return <h1>{loading ? "T" : "F"}</h1>;
};

export default Test;
