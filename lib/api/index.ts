import { AppType } from "@/app/api/[[...slugs]]/route";
import { treaty } from "@elysiajs/eden";

export const apiClient = treaty<AppType>(
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
);
