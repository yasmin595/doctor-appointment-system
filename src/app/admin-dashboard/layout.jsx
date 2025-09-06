"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left: Dynamic Page Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {children}</div>

      {/* Sidebar for desktop */}
     <div className="w-64 bg- shadow-lg p-6 sticky top-15 h-screen">
        <ul className="space-y-4 pt-10 text-right">
          <li>
            <Link
              href="/admin-dashboard"
              className="text-blue-600 hover:underline"
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-users"
              className="text-blue-600 hover:underline"
            >
              All Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-profile"
              className="text-blue-600 hover:underline"
            >
              Manage Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for mobile */}
      {isOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 z-40 md:hidden">
          <ul className="space-y-4 text-right">
            <li>
              <Link
                href="/admin-dashboard/admin-overview"
                className="text-blue-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                href="/admin-dashboard/manage-users"
                className="text-blue-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                All Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin-dashboard/manage-profile"
                className="text-blue-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Manage Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
