"use client";
import React, { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/actions/auth/registerUser";
import { toast } from "sonner"; // ✅ sonner import

export default function RegisterForm() {
  const [role, setRole] = useState("Patient");
  const [loading, setLoading] = useState(false);

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
        appointments: [],
      };
    }

    try {
      const res = await registerUser(payload);

      if (res.success) {
        toast.success("Registration successful ✅"); // ✅ Success toast
        form.reset();
        setRole("Patient"); // reset role
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
      className="w-full max-w-lg mx-auto space-y-6 bg-white p-8 rounded-2xl shadow-md"
    >
      {/* Role Selection */}
      <div className="flex justify-between items-center gap-4">
        <label className="font-semibold">Select Role:</label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
        </select>
      </div>

      {/* Common Fields */}
      <div>
        <label htmlFor="name" className="font-semibold">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="font-semibold">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="font-semibold">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="font-semibold">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label htmlFor="profilePicture" className="font-semibold">
          Profile Picture (URL)
        </label>
        <input
          type="text"
          id="profilePicture"
          name="profilePicture"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Patient Fields */}
      {role === "Patient" && (
        <>
          <div>
            <label htmlFor="address" className="font-semibold">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="age" className="font-semibold">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </>
      )}

      {/* Doctor Fields */}
      {role === "Doctor" && (
        <>
          <div>
            <label htmlFor="specialization" className="font-semibold">Specialization</label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="bio" className="font-semibold">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="location" className="font-semibold">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="experience" className="font-semibold">Experience</label>
            <input
              type="text"
              id="experience"
              name="experience"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="certificates" className="font-semibold">Certificates (optional)</label>
            <input
              type="text"
              id="certificates"
              name="certificates"
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter certificate URLs or names"
            />
          </div>
        </>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-12 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>

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
