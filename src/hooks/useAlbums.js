import { useEffect, useState } from "react";

import { FETCH_ALBUMS_URL } from "../conf/urls";

import useResource from "./useResource";

const useAlbums = () => {
	const [{ loading, error, data }, reload, reset] = useResource({
		url: FETCH_ALBUMS_URL,
	});
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		if (!data) return;
		setAlbums(
			data.albums.map((album) => ({
				...album,
			}))
		);
		reset();
	}, [data, reset]);

	useEffect(() => {
		console.log("albums here :>> ");
	}, [error]);

	return { loading, error, albums, setAlbums, reload };
};

export default useAlbums;
