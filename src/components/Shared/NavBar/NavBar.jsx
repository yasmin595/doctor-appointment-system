"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-green-50 dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo></Logo>
        </div>

        {/* Desktop Navigation - md screen */}
        <div className="hidden md:flex lg:hidden flex-1 justify-center">
          <ul className="flex space-x-3 items-center text-sm">
            <li>
              <Link href="/" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/alldoctors" className="hover:text-green-700 dark:hover:text-green-400 transition">
                All Doctors
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-700 dark:hover:text-green-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Navigation - lg screen */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex space-x-6 items-center text-base">
            <li>
              <Link href="/" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/alldoctors" className="hover:text-green-700 dark:hover:text-green-400 transition">
                All Doctors
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-700 dark:hover:text-green-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-700 dark:hover:text-green-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex lg:space-x-3 md:space-x-2">
          {/* md screen */}
          <Link
            href="/login"
            className="md:px-2 md:py-0.5 md:text-xs lg:px-3 lg:py-1 lg:text-sm rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            Login
          </Link>
          <Link
            href="/signUp"
            className="md:px-2 md:py-0.5 md:text-xs lg:px-3 lg:py-1 lg:text-sm rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            SignUp
          </Link>
        </div>

        {/* Mobile Menu - sm screens */}
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
