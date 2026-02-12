import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { useS3 } from "@packages/movie-minifier-shared";
export const downloadUrlApi = new Hono().get(
	"/:fileId",
	zValidator("param", z.object({ fileId: z.uuid() })),
	zValidator("query", z.object({ filename: z.string().max(255).optional() })),
	async (c) => {
		const { fileId } = c.req.param();
		const { filename } = c.req.query();

		const s3 = useS3({
			bucket: process.env.S3_BUCKET || "",
			accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
			endpoint: process.env.S3_ENDPOINT || "",
			region: process.env.S3_REGION || "",
		});

		if (!(await s3.exists(fileId))) {
			return c.text("File not found", 404);
		}
		const url = s3.presign(fileId, {
			expiresIn: 60 * 5, // 5 minutes
			contentDisposition: filename
				? `attachment; filename="${filename}"`
				: undefined,
			method: "GET",
		});
		return c.json({ url });
	},
);
