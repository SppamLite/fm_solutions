import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    deleteCookie(headers, "rating", {
      path: "/interactive-rating-component",
      domain: url.hostname,
    });

    headers.set("location", "/interactive-rating-component");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};
