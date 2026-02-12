import { Hono } from "hono";
import { useS3 } from "@packages/movie-minifier-shared";
export const uploadUrlApi = new Hono().get("/", async (c) => {
	const fileId = Bun.randomUUIDv7();

	const s3 = useS3({
		bucket: process.env.S3_BUCKET || "",
		accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
		endpoint: process.env.S3_ENDPOINT || "",
		region: process.env.S3_REGION || "",
	});

	const url = s3.presign(fileId, {
		expiresIn: 60 * 5, // 5 minutes
		method: "PUT",
	});
	return c.json({ url });
});
