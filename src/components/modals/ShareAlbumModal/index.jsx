import { Alert, Button, Modal, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { SHARE_ALBUM_URL } from "../../../conf/urls";
import { validate as validateEmail } from "email-validator";
import useResource from "../../../hooks/useResource";
import "./share-album-modal.css";
import { TbSend } from "react-icons/tb";

const ShareAlbumModal = ({ onClose, albumId, ...rest }) => {
	const [email, setEmail] = useState("");

	const [formError, setFormError] = useState(null);

	const [{ loading, data, error }, share, reset] = useResource(
		{ url: SHARE_ALBUM_URL(albumId), method: "GET", data: { email } },
		false
	);

	const handleShare = () => {
		setFormError(null);
		if (!email.trim()) {
			setFormError("Please enter a email for your album");
			return;
		}
		if (!validateEmail(email)) {
			setFormError("Please enter a valid email address to share the album");
			return;
		}

		share();
	};

	useEffect(() => {
		if (!data) return;
		onClose();
		setEmail("");
		reset();
	}, [data, onClose, reset]);

	return (
		<Modal centered {...rest} onClose={onClose} title="Share your album">
			<TextInput
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				label="Email to share the album with"
				type="email"
				withAsterisk
			/>

			<Button
				loading={loading}
				fullWidth
				variant="gradient"
				onClick={handleShare}
				leftIcon={<TbSend />}
				className="share-album-modal-action"
			>
				Share
			</Button>
			{(error || formError) && (
				<Alert color={"red"} title="Oops">
					{error
						? "Could not share your album. Please try again later"
						: formError}
				</Alert>
			)}
		</Modal>
	);
};

export default ShareAlbumModal;
