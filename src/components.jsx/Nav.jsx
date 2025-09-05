"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  // ensure hydration-safe render
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <Link href="/" className="text-2xl font-bold">
          Doctor
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 gap-2">
          {status === "loading" && <li>Loading...</li>}

          {status === "authenticated" ? (
            <>
              {session?.user?.image && (
                <li>
                  <Image
                    src={session.user.image}
                    width={40}
                    height={40}
                    alt="user-logo"
                    className="rounded-full"
                  />
                </li>
              )}
              <li>
                <button
                  onClick={() => signOut()}
                  className="btn btn-sm btn-outline"
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/register" className="btn btn-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/login" className="btn btn-sm btn-outline">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
