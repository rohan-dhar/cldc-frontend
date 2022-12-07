import { Alert, Button, Modal, TextInput } from "@mantine/core";
import { useEffect } from "react";
import { useState } from "react";
import { CREATE_ALBUM_URL } from "../../../conf/urls";
import useResource from "../../../hooks/useResource";
import ImagePicker from "../../ImagePicker";

const CreateAlbumModal = ({ onClose, onAdd, ...rest }) => {
	const [selected, setSelected] = useState(new Set());
	const [name, setName] = useState("");

	const [formError, setFormError] = useState(null);

	const [payload, setPayload] = useState({});

	const [{ loading, data, error }, create, reset] = useResource(
		{ url: CREATE_ALBUM_URL, method: "POST", data: payload },
		false
	);

	const handleCreate = () => {
		setFormError(null);
		if (!name.trim()) {
			setFormError("Please enter a name for your album");
			return;
		}
		if (selected.size === 0) {
			setFormError("Please select images to be included in your album");
			return;
		}

		const images = [...selected];

		setPayload({ name, images, cover: images[0] });
		create();
	};

	useEffect(() => {
		if (!data) return;
		onAdd();
		onClose();
		setName("");
		setSelected(new Set());
		reset();
	}, [data, onClose, onAdd, reset]);

	return (
		<Modal centered {...rest} onClose={onClose} title="Create a new album">
			<TextInput
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Album Name"
				label="Album Name"
				withAsterisk
			/>
			<ImagePicker selected={selected} setSelected={setSelected} />
			<Button
				loading={loading}
				fullWidth
				variant="gradient"
				onClick={handleCreate}
			>
				Create album
			</Button>
			{(error || formError) && (
				<Alert color={"red"} title="Oops">
					{error
						? "Could not create your album. Please try again later"
						: formError}
				</Alert>
			)}
		</Modal>
	);
};

export default CreateAlbumModal;
