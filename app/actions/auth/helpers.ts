import { parseSetCookieHeader } from "better-auth/cookies";
import { cookies, headers } from "next/headers";

const FALLBACK_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type IssueDetail = {
  path?: Array<string | number | symbol>;
  message?: string;
};
type IssueDetailList = ReadonlyArray<IssueDetail>;

export type ApiErrorPayload = {
  error?: string | { message?: string };
  message?: string;
  details?: IssueDetailList | Record<string, unknown> | Array<unknown> | null;
};

export async function resolveApiEndpoint(path: string): Promise<string> {
  const origin = (await headers()).get("origin") ?? FALLBACK_BASE_URL;
  return new URL(path, origin).toString();
}

export function extractApiErrorMessage(payload: ApiErrorPayload | null) {
  if (!payload) return null;

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  if (
    payload.error &&
    typeof payload.error === "object" &&
    typeof payload.error.message === "string" &&
    payload.error.message.trim()
  ) {
    return payload.error.message;
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  return null;
}

export function extractFieldErrors<TField extends string>(
  fields: readonly TField[],
  details?: ApiErrorPayload["details"] | IssueDetailList
): Partial<Record<TField, string[]>> {
  if (!details) return {};

  const allowed = new Set(fields);

  if (Array.isArray(details)) {
    const issues = details as IssueDetail[];
    return issues.reduce((acc, issue) => {
      const field = issue.path?.[0];
      if (!field || typeof field !== "string") return acc;
      if (!issue.message || !allowed.has(field as TField)) return acc;

      const key = field as TField;
      acc[key] = acc[key] ? [...acc[key]!, issue.message] : [issue.message];
      return acc;
    }, {} as Partial<Record<TField, string[]>>);
  }

  if (typeof details === "object") {
    const entries = Object.entries(details as Record<string, unknown>);
    return entries.reduce((acc, [field, value]) => {
      if (!allowed.has(field as TField)) return acc;
      if (!Array.isArray(value) || value.length === 0) return acc;

      acc[field as TField] = value.filter(
        (msg): msg is string => typeof msg === "string"
      );
      return acc;
    }, {} as Partial<Record<TField, string[]>>);
  }

  return {};
}

export async function persistResponseCookies(
  setCookieHeader: string | null
): Promise<void> {
  if (!setCookieHeader) return;

  const parsedCookies = parseSetCookieHeader(setCookieHeader);
  const cookieStore = await cookies();

  parsedCookies.forEach((value, name) => {
    if (!name || !value?.value) return;

    const cookieValue = (() => {
      try {
        return decodeURIComponent(value.value);
      } catch {
        return value.value;
      }
    })();

    cookieStore.set({
      name,
      value: cookieValue,
      httpOnly: value.httponly,
      secure: value.secure,
      sameSite: value.samesite,
      path: value.path,
      domain: value.domain,
      maxAge: value["max-age"],
      expires: value.expires,
    });
  });
}
