import { AWS_S3_BUCKET, AWS_S3_REGION } from "../conf";

const genImageSrc = (image) =>
	`https://${AWS_S3_BUCKET}.s3.${AWS_S3_REGION}.amazonaws.com/${image.fileName}`;

export default genImageSrc;
