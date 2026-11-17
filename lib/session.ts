import { jwtVerify } from "jose";

export const SESSION_COOKIE_NAME = "stride_session";

/** Edge-safe helpers shared by middleware and server code. */
export function getSessionSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET is not set. Add it to .env.local (see .env.example).");
  }

  return new TextEncoder().encode(secret);
}

export type SessionTokenPayload = {
  sessionId: string;
  userId: string;
};

export async function verifySessionToken(token: string): Promise<SessionTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());

    if (typeof payload.sid !== "string" || typeof payload.sub !== "string") {
      return null;
    }

    return { sessionId: payload.sid, userId: payload.sub };
  } catch {
    return null;
  }
}
