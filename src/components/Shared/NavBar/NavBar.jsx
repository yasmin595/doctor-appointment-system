"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // for active link highlighting

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Links for navigation
  const links = [
    { name: "Home", href: "/" },
    { name: "All Doctors", href: "/alldoctors" },
    { name: "Services", href: "/services" },
    { name: "Dashboard", href: "/admin-dashboard" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Check if link is active
  const isActive = (href) => pathname === href;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
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
        <ul className="hidden md:flex flex-1 justify-center space-x-6 text-sm lg:text-base ml-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition ${
                  isActive(link.href)
                    ? "text-green-700 dark:text-green-400 font-semibold"
                    : "hover:text-green-700 dark:hover:text-green-400"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-3">
          <Link
            href="/login"
            className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            Login
          </Link>
          <Link
            href="/signUp"
            className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            SignUp
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden relative">
          <details className="relative">
            <summary className="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md cursor-pointer select-none">
              Menu
            </summary>
            <ul className="absolute right-0 mt-2 w-48 bg-green-50 dark:bg-gray-800 shadow-md rounded-md p-2 grid gap-2 z-50">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-2 py-1 rounded ${
                      isActive(link.href)
                        ? "bg-green-100 dark:bg-green-700 font-semibold"
                        : "hover:bg-green-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
                  href="/signUp"
                  className="block px-2 py-1 rounded hover:bg-green-100 dark:hover:bg-gray-700"
                >
                  SignUp
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </nav>
  );
}
