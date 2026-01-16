import { auth } from "@/lib/better-auth";
import { Elysia } from "elysia";
import { productsApi } from "./product";

const app = new Elysia({ prefix: "/api" }).mount(auth.handler).use(productsApi);

export type AppType = typeof app;

export const GET = app.fetch;
export const POST = app.fetch;
