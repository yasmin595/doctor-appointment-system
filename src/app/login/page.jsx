"use client"

import React from "react";

import Navbar from "@/components/Shared/NavBar/NavBar";
import Footer from "@/components/Shared/Footer/Footer";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import SocialLogin from "./components/SocialLogin";



export default function LoginPage() {

  const { data: session, status } = useSession();
  console.log(session)
  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }
  if (session) {
    redirect("/");
  }
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    toast("Submitting ....");
    try {
      const response = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });
      console.log("SignIn response:", response);

      if (response.ok) {
        form.reset();
        toast.success("Logged In successfully");
        //router.push("/");
      }else{
        toast.error(response.error || "FAILED to Log In");
      }
    } catch (error) {
      console.log(error);
      toast.error("FAILED to Log In");
    }
  };
  return (
    <>
<<<<<<< HEAD
      {/* <h1 className="text-3xl font-bold text-center my-20">Login</h1> */}
      <section className="container mx-auto grid grid-cols-12">
        {/* Left Section */}
        {/* <div className="col-span-12 md:col-span-6 flex justify-center items-center">
          <Image
            className="hidden md:block"
            src={"/assets/images/login/login.svg"}
            width={460}
            height={500}
            alt={"Authentication Image"}
          /> 
        </div> */}
=======
      <Navbar />
      <section className="mt-30 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full  max-w-xl space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md "
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
            Login
          </h2>
>>>>>>> 1013142293dcbd9d7efbf3236ed4fc95a28b0324

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Role Selector */}
          <div className="flex flex-col">
            <label htmlFor="role" className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 dark:text-gray-300">Or login with</p>
          <SocialLogin />

          <p className="text-center text-gray-700 dark:text-gray-200">
            Don't have an account?{" "}
            <Link href="/register" className="text-green-600 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
}
