"use client";
import { usePathname } from "next/navigation";


export default function useHideNavbar() {

  const pathname = usePathname();

  return pathname.startsWith("/admin-dashboard");
  
}