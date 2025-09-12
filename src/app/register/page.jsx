"use client"
import React from "react";

import RegisterForm from "./components/RegisterForm";
import Navbar from "@/components/Shared/NavBar/NavBar";
import Footer from "@/components/Shared/Footer/Footer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const { data: session, status } = useSession();
  console.log(session)
  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <section className=" mt-30 flex justify-center items-center">
        <RegisterForm />
      </section>
      <Footer />
    </>
  );
}
