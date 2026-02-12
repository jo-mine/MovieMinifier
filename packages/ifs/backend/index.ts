import { Hono } from "hono";
import { downloadUrlApi } from "./src/download/url/api";
import { uploadUrlApi } from "./src/upload/url/api";

const app = new Hono()
	.basePath("/api")
	.route("/download/url", downloadUrlApi)
	.route("/upload/url", uploadUrlApi);

export type App = typeof app;

export default {
	fetch: app.fetch,
	port: 3000,
};
