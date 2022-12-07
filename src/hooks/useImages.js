import { useEffect, useState } from "react";
import { AWS_S3_BUCKET, AWS_S3_REGION } from "../conf";
import { FETCH_IMAGES_URL } from "../conf/urls";
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
				src: `https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${image.fileName}`,
			}))
		);
		reset(data);
	}, [data, reset]);

	return { loading, error, images, setImages, reload };
};

export default useImages;
