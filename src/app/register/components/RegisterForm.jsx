"use client";
import React, { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/actions/auth/registerUser";
import { toast } from "sonner"; // ✅ sonner import
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);
const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone?.value;
    const profilePicture = form.profilePicture?.value;
    const address = form.address?.value;
    const age = form.age?.value;

    let payload = {
      name,
      email,
      password,
      phone,
      profilePicture,
      role,
    };

    if (role === "Patient") {
      payload = {
        ...payload,
        address,
        age,
      };
    } else if (role === "Doctor") {
      payload = {
        ...payload,
        specialization: form.specialization?.value,
        bio: form.bio?.value,
        location: form.location?.value,
        experience: form.experience?.value,
        consultationFee: 0,
        rating: 0,
        certificates: form.certificates?.value ? [form.certificates.value] : [],
        availability: {},
        isVerified: false,
      };
    }

    try {
      const res = await registerUser(payload);
      if (res.success) {
        console.log(res)
        toast.success("Registration successful ✅"); // ✅ Success toast
        form.reset();
        setRole("Patient"); // reset role
         router.push("/");
      } else {
        toast.error(res.message || "Registration failed ❌"); // ✅ Error toast
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  max-w-xl not-first:mx-auto space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
    >
       <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Register
      </h2>
      {/* Role Selection */}
      <div className="flex justify-between items-center gap-4">
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          Select Role:
        </label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
        </select>
      </div>

      {/* Common Fields */}
      <div>
        <label
          htmlFor="name"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="profilePicture"
          className="font-semibold text-gray-700 dark:text-gray-200"
        >
          Profile Picture (URL)
        </label>
        <input
          type="text"
          id="profilePicture"
          name="profilePicture"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Patient Fields */}
      {role === "Patient" && (
        <>
          <div>
            <label
              htmlFor="address"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </>
      )}

      {/* Doctor Fields */}
      {role === "Doctor" && (
        <>
          <div>
            <label
              htmlFor="specialization"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="experience"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Experience
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="certificates"
              className="font-semibold text-gray-700 dark:text-gray-200"
            >
              Certificates (optional)
            </label>
            <input
              type="text"
              id="certificates"
              name="certificates"
              placeholder="Enter certificate URLs or names"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Register"}
      </button>

      {/* Footer */}
      <p className="text-center text-gray-700 dark:text-gray-200">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-green-600 hover:underline font-semibold"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
