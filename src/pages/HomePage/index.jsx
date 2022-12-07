import { Alert } from "@mantine/core";
import UploadImagesModal from "../../components/modals/UploadImagesModal";
import { AuthPage, ImageTiles } from "../../components/ui";
import useImages from "../../hooks/useImages";

import "./home-page.css";

const HomePage = () => {
	const { loading, error, images, reload } = useImages();

	console.log("images :>> ", images);
	return (
		<AuthPage
			onAdd={reload}
			AddModal={UploadImagesModal}
			loading={loading}
			title="Home"
		>
			{Array.isArray(images) && images.length ? (
				<ImageTiles images={images} />
			) : error ? (
				<Alert title="Oops" color={"red"}>
					We could not load your images. Please try again later.
				</Alert>
			) : !images.length ? (
				<Alert title="No images found" color={"blue"}>
					Looks like you have not uploaded any images. Upload images to view
					them here.
				</Alert>
			) : null}
		</AuthPage>
	);
};
export default HomePage;
