import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "mysql",
    schema: "./src/db/schema/index.js",
    out: "./drizzle/migration",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});