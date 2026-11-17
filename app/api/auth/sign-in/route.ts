import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { createSession, verifyPassword } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";

type SignInBody = {
  email?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  let body: SignInBody;

  try {
    body = (await request.json()) as SignInBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  try {
    const db = getDb();

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    // Compare against a dummy hash when the user is missing so response time
    // does not reveal whether an account exists.
    const passwordHash =
      user?.passwordHash ?? "$2b$12$C6UzMDM.H6dfI/f/IKcEeO5ZBZFq2Y0Pm9Gx4vQZ0hM4nq2M8jK9u";
    const passwordMatches = await verifyPassword(password, passwordHash);

    if (!user || !passwordMatches) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createSession(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);

    return NextResponse.json(
      { error: "Unable to sign in right now. Please try again." },
      { status: 500 }
    );
  }
}
