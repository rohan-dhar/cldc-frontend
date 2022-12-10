import { Alert } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import CreateAlbumModal from "../../components/modals/CreateAlbumModal";
import { AuthPage, ImageTiles } from "../../components/ui";
import useAlbums from "../../hooks/useAlbums";

import "./albums-page.css";

const AlbumsPage = () => {
	const { loading, error, albums, reload } = useAlbums();

	const navigate = useNavigate();

	return (
		<AuthPage
			onAdd={reload}
			loading={loading}
			AddModal={CreateAlbumModal}
			title="Albums"
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
					Looks like you have not created any albums. Upload albums to view them
					here.
				</Alert>
			) : null}
		</AuthPage>
	);
};
export default AlbumsPage;
