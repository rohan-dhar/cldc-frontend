import { Alert, Button, Loader, Modal } from "@mantine/core";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { TbDragDrop } from "react-icons/tb";
import { toast } from "react-toastify";
import { SAVE_IMAGE_URL, START_IMAGE_UPLOAD_URL } from "../../../conf/urls";
import useResource from "../../../hooks/useResource";
import genClassName from "../../../utils/genClassNames";
import getFileImageType from "../../../utils/getFileImageType";
import { ImageTiles } from "../../ui";
import "./upload-images-modal.css";

const UploadImagesModal = ({ onClose, onAdd, ...rest }) => {
	const [images, setImages] = useState([]);
	const [readLoading, setReadLoading] = useState(false);
	const [fileNames, setFileNames] = useState([]);
	const readRef = useRef(0);

	const setNewImages = (newImages) => {
		readRef.current = 0;
		setImages((images) => {
			images.forEach((image) => URL.revokeObjectURL(image.src));
			return newImages;
		});
		setReadLoading(false);
		setFileNames([]);
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
	const [savePayload, setSavePayload] = useState([]);

	const [
		{ loading: uploadLoading, data: uploadData, error: uploadError },
		startUpload,
		resetUpload,
	] = useResource(uploadPayload, false, false);

	const [
		{ loading: saveLoading, data: saveData, error: saveError },
		save,
		resetSave,
	] = useResource(savePayload, false);

	useEffect(() => {
		if (!urlData || !urlData.length) return;
		setUploadPayload(
			images.map((image, index) => ({
				headers: { "Content-Type": image.contentType },
				url: urlData[index].uploadUrl,
				data: image.data,
				method: "PUT",
			}))
		);
		setFileNames(urlData.map((file) => file.imageName));
		resetUploadSession();
		startUpload();
	}, [urlData, resetUploadSession, images, startUpload]);

	useEffect(() => {
		if (!uploadData || !uploadData.length) return;
		setSavePayload(
			images.map((image, index) => ({
				url: SAVE_IMAGE_URL,
				data: {
					name: image.name,
					fileName: fileNames[index],
					metadata: {},
					location: "",
				},
				method: "POST",
			}))
		);
		resetUpload();
		save();
	}, [save, resetUpload, images, startUpload, fileNames, uploadData]);

	useEffect(() => {
		if (!saveData || !saveData.length) return;
		setNewImages([]);
		onClose();
		onAdd();
		const uploaded = saveData.length;
		toast(
			`Successfully uploaded ${uploaded} image${uploaded !== 1 ? "s" : ""}`,
			{ type: "success" }
		);
		resetSave();
	}, [saveData, onClose, resetSave, onAdd]);

	const clearImages = () => {
		setNewImages([]);
	};

	const loading = urlLoading || readLoading || uploadLoading || saveLoading;

	return (
		<Modal
			{...rest}
			className="upload-images-modal"
			title="Upload images"
			onClose={onClose}
			centered
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
					<ImageTiles minWidth="180px" imageHeight="120px" images={images} />
					{loading ? (
						<Loader className="loader upload-images-modal-loader" />
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
							{(uploadError || urlError || saveError) && (
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
