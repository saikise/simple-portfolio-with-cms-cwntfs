import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  // Only allow whitelisted emails to sign in
  if (email !== "your_email@email.com") {
    return NextResponse.json(
      { error: "Only whitelisted emails are allowed to sign in" },
      { status: 401 },
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: error?.message || "Could not sign in user" },
      { status: error.status },
    );
  }

  return NextResponse.json(
    { message: "Successfully signed in user" },
    { status: 200 },
  );
}
