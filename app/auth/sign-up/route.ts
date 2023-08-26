import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const { email, password } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  // Only allow whitelisted emails to sign up
  if (email !== "your_email@email.com") {
    return NextResponse.json(
      { error: "Only whitelisted emails are allowed to sign up" },
      { status: 401 },
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return NextResponse.json(
      { error: error?.message || "Could not sign up user" },
      { status: error.status },
    );
  }

  return NextResponse.json(
    {
      message: "Successfully signed up user. Sign up link sent to user email.",
    },
    { status: 200 },
  );
}
