"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="bg-green-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        
        {/* Logo & About */}
        <div>
          <Logo />
          <p className="text-sm mt-3 max-w-xs">
            Doctor Appointment System. Helping you find the best doctors quickly and easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "All Doctors", href: "/all-doctor" },
              { name: "Services", href: "/services" },
              { name: "Dashboard", href: "/dashboard" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-green-700 dark:hover:text-green-400 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm">Dhaka, Bangladesh</p>
          <p className="text-sm">Email: info@doctorapp.com</p>
          <p className="text-sm">Phone: +880 1234 567890</p>
          <div className="flex space-x-3 mt-3">
            {["FB", "Twitter", "LinkedIn"].map((social) => (
              <Link
                key={social}
                href="#"
                className="hover:text-green-700 dark:hover:text-green-400 transition text-sm font-medium"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-200 dark:border-gray-700 py-4 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Doctor Appointment System. All rights reserved.
      </div>
    </footer>
  );
}
