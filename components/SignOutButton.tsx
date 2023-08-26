"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.refresh();
    } catch (error) {
      alert("Could not sign out user");
    }
  };

  return (
    <button
      className="rounded-lg bg-blue-700 px-4 py-2 text-xs text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={handleSignOut}
    >
      Sign out
    </button>
  );
}
