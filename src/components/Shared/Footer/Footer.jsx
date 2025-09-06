"use client";

import Link from "next/link";
import Logo from "../Logo/Logo";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <footer className="bg-green-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & About */}
        <Card className="bg-transparent shadow-none">
          <CardContent className="space-y-3">
            <Logo />
            <p className="text-sm">
              Doctor Appointment System. Helping you find the best doctors quickly and easily.
            </p>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card className="bg-transparent shadow-none">
          <CardContent className="space-y-2">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "All Doctors", href: "/alldoctors" },
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
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-transparent shadow-none">
          <CardContent className="space-y-2">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm">Dhaka, Bangladesh</p>
            <p className="text-sm">Email: info@doctorapp.com</p>
            <p className="text-sm">Phone: +880 1234 567890</p>
            <div className="flex space-x-3 mt-2">
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
          </CardContent>
        </Card>

      </div>

      {/* Copyright */}
      <div className="border-t border-green-200 dark:border-gray-700 mt-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Doctor Appointment System. All rights reserved.
      </div>
    </footer>
  );
}
