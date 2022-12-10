import { Alert } from "@mantine/core";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { AuthPage, ImageTiles } from "../../components/ui";
import { FETCH_ALBUM_URL } from "../../conf/urls";

import useResource from "../../hooks/useResource";
import genImageS3Src from "../../utils/genImageS3Src";

import "./album-detail-page.css";

const AlbumDetailPage = () => {
	let { albumId } = useParams();

	const [{ loading, error, data: album }] = useResource({
		url: FETCH_ALBUM_URL(albumId),
	});

	const images = useMemo(() => {
		if (!album) return null;

		return album.images.map((image) => ({
			...image,
			src: genImageS3Src(image),
		}));
	}, [album]);

	return (
		<AuthPage
			loading={loading}
			title={album ? album.name : null}
			backText={album ? "Album" : null}
			backTo="/albums"
		>
			{error ? (
				<Alert color={"red"} title="Oops">
					We could not fetch the album. Please try again later.
				</Alert>
			) : album ? (
				<ImageTiles images={images} />
			) : null}
		</AuthPage>
	);
};
export default AlbumDetailPage;
