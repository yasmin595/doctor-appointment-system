"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // 👉 এখানে কন্ডিশন
  if (pathname?.startsWith("/dashboard")) {
    return null; // Dashboard পেজ হলে Navbar রেন্ডার করবে না
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    ...(session?.user?.role
      ? [
        {
          name: "Dashboard",
          href:
            session.user.role === "Doctor"
              ? "/dashboard/doctor/doctor-appointments"
              : session.user.role === "Patient"
                ? "/dashboard/patient/all-doctor"
                : "/admin-dashboard",
        },
      ]
      : []),
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-green-50 dark:bg-gray-900 shadow-md"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:space-x-3 lg:space-x-8 flex-1 justify-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm lg:text-base transition font-medium ${scrolled
                ? isActive(link.href)
                  ? "text-green-700 dark:text-green-400 font-semibold"
                  : "hover:text-green-700 dark:hover:text-green-400 text-black dark:text-white"
                : "text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {status === "authenticated" ? (
            <>
              <button
                onClick={() => signOut()}
                className="lg:px-3 md:px-2 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
              >
                Logout
              </button>
              <div>
                <ModeToggle />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="lg:px-3 md:px-2 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-medium transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="lg:px-3 md:px-2 py-1 rounded-md border border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-medium transition"
              >
                Register
              </Link>
              <div>
                <ModeToggle />
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden relative">
          <details className="relative">
            <summary className="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md cursor-pointer select-none">
              Menu
            </summary>
            <ul className="absolute right-0 mt-2 w-52 bg-green-50 dark:bg-gray-800 shadow-md rounded-md p-2 grid gap-2 z-50">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-2 py-1 rounded ${isActive(link.href)
                      ? "bg-green-100 dark:bg-green-700 font-semibold"
                      : "hover:bg-green-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {status === "authenticated" ? (
                <li>
                  <button
                    onClick={() => signOut()}
                    className="block w-full px-2 py-1 rounded hover:bg-green-100 dark:hover:bg-gray-700 text-left"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block px-2 py-1 rounded hover:bg-green-100 dark:hover:bg-gray-700"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="block px-2 py-1 rounded hover:bg-green-100 dark:hover:bg-gray-700"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <ModeToggle />
                  </li>
                </>
              )}
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
}
