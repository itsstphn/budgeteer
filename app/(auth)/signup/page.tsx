"use client";

import { signIn } from "next-auth/react";
import SignIn from "../signin/page";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p className="mt-4">Please sign up to continue.</p>
      <div className="mt-6">
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}
