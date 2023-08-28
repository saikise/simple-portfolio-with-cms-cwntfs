"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.message) setMessage(data.message);
    if (data.error) setError(data.error);

    router.refresh();
  };

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <h4 className="text-2xl font-bold text-white">
          Sign in to your account
        </h4>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Sign in is turned off in live demo.
        </p>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="your_email@email.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-4 py-2 text-xs text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/sign-up"
                className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      {error && (
        <p className="mt-4 bg-neutral-900 p-4 text-center text-neutral-300">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 bg-neutral-900 p-4 text-center text-neutral-300">
          {message}
        </p>
      )}
    </>
  );
}
