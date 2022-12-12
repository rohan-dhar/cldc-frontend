import { Alert } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import CreateAlbumModal from "../../components/modals/CreateAlbumModal";
import { AuthPage, ImageTiles } from "../../components/ui";
import useAlbums from "../../hooks/useAlbums";

import "./albums-page.css";

const AlbumsPage = ({ shared = false }) => {
	const { loading, error, albums, reload } = useAlbums(shared);

	const navigate = useNavigate();

	const noAlbumsAlert = 
		!shared ? 
		"Looks like you have not created any albums. Upload albums to view them here." : 
		"Nothing to show here 😪"

	return (
		<AuthPage
			onAdd={!shared ? reload : undefined}
			loading={loading}
			AddModal={!shared ? CreateAlbumModal : undefined}
			title={shared ? "Shared with me" : "Albums"}
		>
			{Array.isArray(albums) && albums.length ? (
				<ImageTiles
					imageModalMode={false}
					onClick={(id) => navigate(`/album/${id}`)}
					images={albums}
				/>
			) : error ? (
				<Alert title="Oops" color={"red"}>
					We could not load your albums. Please try again later.
				</Alert>
			) : !albums.length ? (
				<Alert title="No albums found" color={"blue"}>
					{noAlbumsAlert}
				</Alert>
			) : null}
		</AuthPage>
	);
};
export default AlbumsPage;
