import { Redis } from "@upstash/redis";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { handle } from "hono/vercel";

export const runtime = "edge";

type Bindings = {
  UPSTASH_REDIS_REST_URL: string;
  UPSTASH_REDIS_REST_TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get("/search", async (c) => {
  try {
    const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = env(c);

    // --- Performance Start
    const performanceStart = performance.now();

    const redis = new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN,
    });

    const query = c.req.query("q")?.toUpperCase();

    if (!query) {
      return c.json({ message: "Invalid search query" }, 400);
    }

    const response = [];
    const rank = await redis.zrank("terms", query);

    if (rank) {
      const temp = await redis.zrange<string[]>("terms", rank, rank + 100);

      for (const str of temp) {
        if (!str.startsWith(query)) {
          break;
        }

        if (str.endsWith("*")) {
          response.push(str.substring(0, str.length - 1));
        }
      }
    }

    // --- Performance End
    const performanceEnd = performance.now();

    return c.json({
      results: response,
      duration: performanceEnd - performanceStart,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      results: [],
      message: "Something went wrong!",
    });
  }
});

export const GET = handle(app);
export const POST = handle(app);
