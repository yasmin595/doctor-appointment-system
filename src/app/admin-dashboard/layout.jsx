"use client";
import Link from "next/link";
import { Menu, X, Home, Users, LayoutDashboard, UserCog, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }
  if (!session) {
    redirect('/login')
  }
  if (session?.user?.role !== "Admin") {
    redirect('/')
  }



  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/admin-dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/admin-dashboard/manage-users", label: "All Users", icon: Users },
    { href: "/admin-dashboard/manage-profile", label: "Manage Profile", icon: UserCog },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-black dark:bg-black dark:text-white">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 bg-white dark:bg-gray-900 shadow-lg p-6 sticky top-0 h-screen">
        <ul className="space-y-4 pt-10 text-left">
          {navItems.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Icon size={18} /> {label}
              </Link>
            </li>
          ))}
          <li>
            <button
            onClick={() => signOut()}
            className="flex items-center gap-3 text-red-600 dark:text-red-400">
               
              <LogOut size={18} /> LogOut
            </button>
          </li>
        </ul>
      </div>

      {/* Left: Dynamic Page Content */}
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for mobile */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg p-6 z-40 md:hidden">
          <ul className="space-y-4 pt-10 text-left">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={18} /> {label}
                </Link>
              </li>
            ))}
            <li>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            className="flex items-center gap-3 text-red-600 dark:text-red-400"
          >
            <LogOut size={18} /> LogOut
          </button>


            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
