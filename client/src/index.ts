import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/*": index,

    "/config": {
      GET() {
        return Response.json({
          BACKEND_URL: Bun.env.BACKEND_URL,
        });
      },
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log("Backend URL:", Bun.env.BACKEND_URL);

console.log(`Server running at ${server.url}`);
