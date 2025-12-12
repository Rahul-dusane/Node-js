import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./drizzle/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url: process.env.DATABASE_URL,
  },
});