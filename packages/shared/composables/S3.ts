import { S3Client } from "bun";

export const useS3 = (
	configs: {
		bucket: string;
		accessKeyId: string;
		secretAccessKey: string;
		endpoint: string;
		dockerEndpoint: string;
		region: string;
	},
	isDocker = false,
) => {
	const s3 = new S3Client({
		bucket: configs.bucket,
		region: configs.region,
		accessKeyId: configs.accessKeyId,
		secretAccessKey: configs.secretAccessKey,
		endpoint: isDocker
			? (configs.dockerEndpoint ?? configs.endpoint)
			: configs.endpoint,
	});

	return s3;
};

export const hasObjects = async (s3: S3Client, prefix: string) => {
	const _prefix = prefix.endsWith("/") ? prefix : `${prefix}/`;
	const list = await s3.list({ prefix: _prefix });
	return (list.keyCount ?? 0) > 0;
};
