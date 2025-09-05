"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../Logo/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // navbar becomes solid after 50px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <ul className="hidden md:flex space-x-6 text-sm lg:text-base">
          <li>
            <Link
              href="/"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/alldoctors"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              All Doctors
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-green-700 dark:hover:text-green-400 transition"
            >
              Contact
            </Link>
          </li>
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
              <li>
                <Link href="/" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/alldoctors" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
                  All Doctors
                </Link>
              </li>
              <li>
                <Link href="/services" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signUp" className="block px-2 py-1 hover:bg-green-100 dark:hover:bg-gray-700 rounded">
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
