"use client"
import HomePage from "@/components/HomePage/HomePage";
// import Footer from "@/components/Shared/Footer/Footer";
// import Navbar from "@/components/Shared/NavBar/NavBar";
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";


export default function Home() {
  const { status } = useSession();
  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }
  return (
    <div className="font-sans">
      {/* grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 */}
      {/* <Button variant="outline">Button</Button>
      <ModeToggle /> */}
      {/* <Navbar /> */}
      <HomePage></HomePage>
      {/* <Footer /> */}
    </div>
  );
}


