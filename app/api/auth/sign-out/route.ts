import { NextResponse } from "next/server";

import { destroySession } from "@/lib/auth";

export async function POST() {
  try {
    await destroySession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign-out error:", error);
    return NextResponse.json({ error: "Unable to sign out right now." }, { status: 500 });
  }
}
