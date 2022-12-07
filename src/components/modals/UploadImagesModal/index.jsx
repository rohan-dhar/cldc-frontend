import { Alert, Button, Loader, Modal } from "@mantine/core";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TbDragDrop } from "react-icons/tb";
import { START_IMAGE_UPLOAD_URL } from "../../../conf/urls";
import useResource from "../../../hooks/useResource";
import genClassName from "../../../utils/genClassNames";
import getFileImageType from "../../../utils/getFileImageType";
import { ImageTile } from "../../ui";
import "./upload-images-modal.css";

const UploadImagesModal = ({ onClose, ...rest }) => {
	const [images, setImages] = useState([]);
	const [readLoading, setReadLoading] = useState(false);
	const readRef = useRef(0);

	const setNewImages = (newImages) => {
		readRef.current = 0;
		setImages((images) => {
			images.forEach((image) => URL.revokeObjectURL(image.src));
			return newImages;
		});
		setReadLoading(false);
	};

	const handleDrop = (files) => {
		setReadLoading(true);
		const images = files
			.map((file) => {
				return {
					file,
					imageType: getFileImageType(file.type),
					name: file.name,
					contentType: file.type,
				};
			})
			.filter((file) => !!file.imageType);

		readRef.current = 0;

		images.forEach((image, index) => {
			let reader = new FileReader();
			reader.addEventListener("load", (e) => {
				images[index].data = e.target.result;
				images[index].src = URL.createObjectURL(image.file);
				delete images[index].file;
				console.log("images[index].src :>> ", images[index].src);
				readRef.current += 1;
				if (readRef.current !== images.length) return;
				setNewImages(images);
			});
			reader.readAsArrayBuffer(image.file);
		});
	};
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: handleDrop,
	});

	const [
		{ loading: urlLoading, data: urlData, error: urlError },
		startUploadSession,
		resetUploadSession,
	] = useResource(
		images.map(({ imageType }) => ({
			url: START_IMAGE_UPLOAD_URL,
			method: "POST",
			data: { imageType },
		})),
		false
	);

	const [uploadPayload, setUploadPayload] = useState([]);

	const [
		{ loading: uploadLoading, data: uploadData, error: uploadError },
		startUpload,
		resetUpload,
	] = useResource(uploadPayload, false, false);

	useEffect(() => {
		if (!urlData) return;
		setUploadPayload(
			images.map((image, index) => ({
				headers: { "Content-Type": image.contentType },
				url: urlData[index].uploadUrl,
				data: image.data,
			}))
		);
		resetUploadSession();
		startUpload();
	}, [urlData, resetUploadSession, images, startUpload]);

	console.log("uploadData :>> ", uploadData);

	const clearImages = () => {
		setNewImages([]);
	};

	const loading = urlLoading || readLoading || uploadLoading;

	return (
		<Modal
			{...rest}
			className="upload-images-modal"
			title="Upload images"
			onClose={onClose}
		>
			{images.length === 0 && !loading ? (
				<section
					className={genClassName({
						base: "upload-images-dropzone",
						conditionals: { "upload-images-dropzone-active": isDragActive },
					})}
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					<span>
						<TbDragDrop />
					</span>
					<p>
						{isDragActive
							? "Drop images to add them"
							: "Drag and drop your images here"}
					</p>
				</section>
			) : (
				<>
					<section className="upload-images-modal-previews">
						{images.map((image) => (
							<ImageTile
								key={image.name}
								name={image.name}
								src={image.src}
								className="upload-images-modal-preview"
							/>
						))}
					</section>
					{loading ? (
						<Loader className="upload-images-modal-loader" />
					) : (
						<>
							<Button
								className="upload-images-modal-action"
								fullWidth
								variant="outline"
								color={"red"}
								onClick={clearImages}
							>
								Clear all
							</Button>
							<Button
								className="upload-images-modal-action"
								fullWidth
								variant="gradient"
								onClick={startUploadSession}
							>
								Upload
							</Button>
							{(uploadError || urlError) && (
								<Alert color={"red"} title="Could not upload images">
									We could not upload your images. Please try again later.
								</Alert>
							)}
						</>
					)}
				</>
			)}
		</Modal>
	);
};

export default UploadImagesModal;
