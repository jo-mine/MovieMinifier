import { Hono } from "hono";
import { File } from "./src/file/Api";

const app = new Hono().basePath("/api").route("/file", File);

export type App = typeof app;

export default {
	fetch: app.fetch,
	port: 3000,
};
