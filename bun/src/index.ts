import helloRoute from "./routes/hello";
import jsonCopyRoute from "./routes/json_copy";
import jsonStructRoute from "./routes/json_struct";
import jsonWalkRoute from "./routes/json_walk";

const server = Bun.serve({
  port: 8000,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    switch (url.pathname) {
      case "/hello":
        return helloRoute(req);
      case "/json/copy":
        return jsonCopyRoute(req);
      case "/json/struct":
        return jsonStructRoute(req);
      case "/json/walk":
        return jsonWalkRoute(req);
      default:
        return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain" } });
    }
  },
});

console.log(`Listening on ${server.hostname}:${server.port}`);
