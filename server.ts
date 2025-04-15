import next from "next";
import { createServer } from "http";
import { parse } from "url";

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = app.getRequestHandler();

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url!, true);
  handler(req, res, parsedUrl);
});

export default server;
