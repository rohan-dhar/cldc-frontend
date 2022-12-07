import { Alert, Checkbox, Loader } from "@mantine/core";
import useImages from "../../hooks/useImages";
import genClassName from "../../utils/genClassNames";

import "./image-picker.css";

const ImagePickerImage = ({ src, selected, id, onChange }) => {
	return (
		<section
			className={genClassName({
				base: "image-picker-image",
				conditionals: { "image-picker-image-selected": selected },
			})}
			onClick={() => onChange(id)}
		>
			<img src={src} alt="" />
			<Checkbox
				className="image-picker-image-checkbox"
				checked={selected}
				radius="xl"
				size="md"
			/>
		</section>
	);
};

const ImagePicker = ({ selected, setSelected }) => {
	const { images, loading, error } = useImages();

	const handleChange = (id) => {
		if (selected.has(id)) {
			const newIds = [...selected];
			const index = newIds.indexOf(id);
			newIds.splice(index, 1);
			setSelected(new Set(newIds));
			return;
		}
		setSelected(new Set([...selected, id]));
	};

	return (
		<section className="image-picker">
			{Array.isArray(images) && images.length > 0 ? (
				<>
					<h3 className="image-picker-heading">Select images for this album</h3>
					<main>
						{images.map((image) => (
							<ImagePickerImage
								src={image.src}
								id={image.id}
								selected={selected.has(image.id)}
								onChange={handleChange}
							/>
						))}
					</main>
					<p className="image-picker-status">
						Selected <span>{selected.size}</span> image
						{selected.size !== 1 ? "s" : ""}
					</p>
				</>
			) : loading ? (
				<Loader className="loader" />
			) : error ? (
				<Alert title="Oops" color={"red"}>
					We could not load your images. Please try again later
				</Alert>
			) : images.length === 0 ? (
				<Alert title="Oops" color={"yellow"}>
					You do not have any images yet. Add some images to create an album.
				</Alert>
			) : null}
		</section>
	);
};

export default ImagePicker;
