import { AWS_S3_BUCKET, AWS_S3_REGION } from "../conf";

const genImageS3Src = (image) =>
	`https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${
		typeof image === "string" ? image : image.fileName
	}`;

export default genImageS3Src;
