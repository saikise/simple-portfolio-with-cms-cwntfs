import SignOutButton from "@/components/SignOutButton";
import SignUpForm from "@/components/SignUpForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="max-w-md">
      {user && (
        <>
          <h1 className="mb-4 text-2xl font-bold text-white">
            Logged in as {user.email}
          </h1>
          <SignOutButton />
        </>
      )}
      {!user && <SignUpForm />}
    </div>
  );
}
