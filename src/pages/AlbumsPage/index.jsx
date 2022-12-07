import { Alert } from "@mantine/core";
import CreateAlbumModal from "../../components/modals/CreateAlbumModal";
import { AuthPage, ImageTiles } from "../../components/ui";
import useImages from "../../hooks/useImages";

import "./albums-page.css";

const AlbumsPage = () => {
	// const { loading, error, images, reload } = useImages();

	return <AuthPage AddModal={CreateAlbumModal} title="Albums"></AuthPage>;
};
export default AlbumsPage;
