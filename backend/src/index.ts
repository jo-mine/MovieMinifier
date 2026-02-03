import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
	return c.text("Hello Hono!");
});

export type backendApp = typeof app;

export default {
	fetch: app.fetch,
	port: 3100,
};
