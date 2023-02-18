import { Handlers } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";

const HARDCODED_PATH = "/interactive-rating-component";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();
    const rating = form.get("rating");
    if (!rating || typeof rating !== "string") {
      return new Response(null, {
        status: 400,
      });
    }
    const headers = new Headers();
    setCookie(headers, {
      name: "rating",
      value: rating,
      maxAge: 120,
      sameSite: "Lax", // this is important to prevent CSRF attacks
      domain: url.hostname,
      path: HARDCODED_PATH,
      secure: true,
    });
    headers.set("location", HARDCODED_PATH);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
