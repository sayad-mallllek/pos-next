import { cookies } from "next/headers";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE_NAME = "pos_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

type MutableCookies = Awaited<ReturnType<typeof cookies>> & {
  set: (name: string, value: string, options?: {
    expires?: Date;
    httpOnly?: boolean;
    sameSite?: "lax" | "strict" | "none";
    secure?: boolean;
    path?: string;
  }) => void;
  delete: (name: string, options?: { path?: string }) => void;
};

async function getMutableCookies(): Promise<MutableCookies> {
  return (await cookies()) as MutableCookies;
}

function buildExpirationDate(): Date {
  return new Date(Date.now() + SESSION_TTL_SECONDS * 1000);
}

export async function createSession(userId: string) {
  const sessionToken = crypto.randomUUID();
  const expires = buildExpirationDate();

  await prisma.session.create({
    data: {
      userId,
      sessionToken,
      expires,
    },
  });

  const cookieStore = await getMutableCookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    expires,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken: token },
    include: { user: true },
  });

  if (!session) {
    return null;
  }

  if (session.expires < new Date()) {
    await prisma.session.delete({ where: { sessionToken: token } });
    const mutableCookies = await getMutableCookies();
    mutableCookies.delete(SESSION_COOKIE_NAME);
    return null;
  }

  return session.user;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { sessionToken: token } });
  }

  const mutableCookies = await getMutableCookies();
  mutableCookies.delete(SESSION_COOKIE_NAME);
}
