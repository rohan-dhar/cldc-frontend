import { Alert, Button, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import ImagePicker from "../../ImagePicker";

const CreateAlbumModal = ({ onClose, ...rest }) => {
	const [selected, setSelected] = useState(new Set());
	const [name, setName] = useState("");

	const [formError, setFormError] = useState(null);

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
	};

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
			<Button fullWidth variant="gradient" onClick={handleCreate}>
				Create album
			</Button>
			{formError && (
				<Alert color={"red"} title="Oops">
					{formError}
				</Alert>
			)}
		</Modal>
	);
};

export default CreateAlbumModal;
