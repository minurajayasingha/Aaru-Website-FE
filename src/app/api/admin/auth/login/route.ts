import { NextResponse } from "next/server";
import { getAdminUserByEmail, touchLastLogin } from "@/db/queries/adminUsers";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/session";

const SESSION_COOKIE = "aaru_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };

    if (!body.email?.trim() || !body.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const user = await getAdminUserByEmail(body.email.trim());
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const passwordMatches = await verifyPassword(body.password, user.passwordHash);
    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await createSessionToken({ sub: String(user.id), email: user.email });
    await touchLastLogin(user.id);

    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch (error) {
    console.error("Admin login API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
