"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";


export default function Footer() {
  return (
    <footer className="bg-green-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div className="flex flex-col space-y-3">
       <Logo></Logo>
          <p className="text-sm">
            Doctor Appointment System. Helping you find the best doctors quickly and easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
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

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm"> Dhaka, Bangladesh</p>
          <p className="text-sm">Email: info@doctorapp.com</p>
          <p className="text-sm">Phone: +880 1234 567890</p>
          <div className="flex space-x-3 mt-2">
            <Link href="#" className="hover:text-green-700 dark:hover:text-green-400 transition">FB</Link>
            <Link href="#" className="hover:text-green-700 dark:hover:text-green-400 transition">Twitter</Link>
            <Link href="#" className="hover:text-green-700 dark:hover:text-green-400 transition">LinkedIn</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-200 dark:border-gray-700 mt-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Doctor Appointment System. All rights reserved.
      </div>
    </footer>
  );
}
