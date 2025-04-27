"use client";

import { signIn, useSession } from "next-auth/react";
import session from "./../../../node_modules/next-auth/core/routes/session.d";
import { redirect } from "next/navigation";

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    redirect("/"); // Redirect to the home page if already signed in
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p className="mt-4">Please sign in to continue.</p>
      <div className="mt-6">
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
