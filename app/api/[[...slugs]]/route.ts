import { auth } from "@/lib/better-auth";
import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" }).mount(auth.handler);

export type AppType = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
