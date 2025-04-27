"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function NavBar() {
  const { data: session } = useSession();

  const name = session?.user?.name || "Guest";

  return (
    <nav className="bg-primary">
      <div className="container h-[60px] flex items-center justify-between">
        <div>
          <h1 className="font-bold">Budgeteer</h1>
        </div>
        <div className="flex items-center gap-5">
          {session && (
            <>
              <div>Welcome, {name}</div>
              <button
                className="border-2 p-1 border-black border-dashed"
                onClick={() => signOut({ callbackUrl: "/signin" })}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
