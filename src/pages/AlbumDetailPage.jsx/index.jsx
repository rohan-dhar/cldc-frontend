import { Alert, Button } from "@mantine/core";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";

import { AuthPage, ImageTiles } from "../../components/ui";
import { FETCH_ALBUM_DELETE_URL, FETCH_ALBUM_URL } from "../../conf/urls";

import useResource from "../../hooks/useResource";
import genImageS3Src from "../../utils/genImageS3Src";

import "./album-detail-page.css";
import { TbSend } from "react-icons/tb";
import { useEffect } from "react";
import useIdentity from "../../hooks/useIdentity";
import ShareAlbumModal from "../../components/modals/ShareAlbumModal";

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

	const [
		{ loading: deleteLoading, error: deleteError, data: deleteData },
		deleteAlbum,
		resetDelete,
	] = useResource(
		{
			url: FETCH_ALBUM_DELETE_URL(albumId),
			method: "DELETE",
		},
		false
	);

	const navigate = useNavigate();

	const {user} = useIdentity();

	const backTo = album
		? album.userId === user.id
			? "/albums"
			: "/sharedAlbums"
		: "/albums";

	useEffect(() => {
		if (!deleteData) return;
		navigate(backTo);
		resetDelete();
	}, [deleteData, resetDelete, backTo, navigate]);

	const [shareOpen, setShareOpen] = useState(false);

	return (
		<AuthPage
			loading={loading}
			title={album ? album.name : null}
			backText={album ? "Back" : null}
			backTo={backTo}
			actions={
				<>
					<Button
						leftIcon={<TbSend />}
						variant="gradient"
						onClick={() => setShareOpen(true)}
					>
						Share
					</Button>
					<Button
						leftIcon={<HiOutlineTrash />}
						color="red"
						loading={deleteLoading}
						onClick={deleteAlbum}
					>
						Delete
					</Button>
				</>
			}
		>
			{error ? (
				<Alert color={"red"} title="Oops">
					We could not fetch the album. Please try again later.
				</Alert>
			) : album ? (
				<>
					{deleteError && (
						<Alert title="Oops" color={"red"}>
							We could not delete the album. Try again later.
						</Alert>
					)}
					<ImageTiles images={images} />
					<ShareAlbumModal
						albumId={albumId}
						opened={shareOpen}
						onClose={() => setShareOpen(false)}
					/>
				</>
			) : null}
		</AuthPage>
	);
};
export default AlbumDetailPage;
