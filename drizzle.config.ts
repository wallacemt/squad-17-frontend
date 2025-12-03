import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "node:process";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL || "",
  },
  strict: true,
});
