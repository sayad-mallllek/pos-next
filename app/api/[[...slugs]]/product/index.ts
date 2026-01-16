import { auth } from "@/lib/better-auth";
import Elysia from "elysia";
import { headers } from "next/headers";

export const productsApi = new Elysia({ prefix: "/products" });

productsApi.get("/", async ({ headers }) => {
  return { message: "List of products" };
});

productsApi.get("/:id", ({ params }) => {
  return { message: `Product with ID: ${params.id}` };
});

productsApi.post(
  "/",
  ({ body }) => {
    return { message: "Product created", product: body };
  },
  {}
);

export type ProductsApiType = typeof productsApi;

type X = {
  name: string;
  brand: string;
  meta: Record<string, unknown>;
};
