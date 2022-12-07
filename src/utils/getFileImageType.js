const imageTypes = {
	jpeg: "jpg",
	jpg: "jpg",
	png: "png",
	gif: "gif",
};

const getFileImageType = (type) => {
	if (typeof type !== "string") return false;

	const parts = type.toLowerCase().split("/");
	const extension = imageTypes[parts[parts.length - 1]];
	return extension ? extension : false;
};

export default getFileImageType;
