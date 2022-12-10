import { useEffect, useState } from "react";

import { FETCH_IMAGES_URL } from "../conf/urls";
import genImageS3Src from "../utils/genImageS3Src";
import useResource from "./useResource";

const useImages = () => {
	const [{ loading, error, data }, reload, reset] = useResource({
		url: FETCH_IMAGES_URL,
	});
	const [images, setImages] = useState([]);

	useEffect(() => {
		if (!data) return;
		setImages(
			data.map((image) => ({
				...image,
				src: genImageS3Src(image),
			}))
		);
		reset();
	}, [data, reset]);

	return { loading, error, images, setImages, reload };
};

export default useImages;
