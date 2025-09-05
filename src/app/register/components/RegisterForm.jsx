"use client";
import React from "react";
import Link from "next/link";

import { registerUser } from "@/app/actions/auth/registerUser";
import SocialLogin from "@/app/login/components/SocialLogin";

export default function RegisterForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    await registerUser({ name, email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-md"
    >
      {/* Name */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full h-12 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
      >
        Sign Up
      </button>

      {/* Divider */}
      <div className="text-center text-gray-500">Or Sign In with</div>
      <SocialLogin />

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-500 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
