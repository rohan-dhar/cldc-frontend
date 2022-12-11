import { useEffect, useState } from "react";

import { FETCH_ALBUMS_URL, FETCH_SHARED_ALBUMS_URL } from "../conf/urls";
import genImageS3Src from "../utils/genImageS3Src";

import useResource from "./useResource";

const useAlbums = (shared) => {
	const [{ loading, error, data }, reload, reset] = useResource({
		url: shared ? FETCH_SHARED_ALBUMS_URL : FETCH_ALBUMS_URL,
	});
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		if (!data) return;
		setAlbums(
			data.albums.map((album) => ({
				...album,
				src: genImageS3Src(album.cover),
			}))
		);
		reset();
	}, [data, reset]);

	useEffect(() => {}, [error]);

	return { loading, error, albums, setAlbums, reload };
};

export default useAlbums;
