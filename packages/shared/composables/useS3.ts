import { S3Client, type S3Options } from "bun";

export function useS3(
	config: Required<
		Pick<
			S3Options,
			"bucket" | "accessKeyId" | "secretAccessKey" | "endpoint" | "region"
		>
	>,
): S3Client {
	return new S3Client(config);
}
