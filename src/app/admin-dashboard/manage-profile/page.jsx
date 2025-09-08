"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ProfileUpdateForm({ user }) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    profilePicture: "",
    address: "",
    age: "",
    role: "Patient",
    specialization: "",
    bio: "",
    location: "",
    experience: "",
    certificates: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        email: user.email || "",
        name: user.name || "",
        phone: user.phone || "",
        profilePicture: user.profilePicture || "",
        address: user.address || "",
        age: user.age || "",
        role: user.role || "Patient",
        specialization: user.specialization || "",
        bio: user.bio || "",
        location: user.location || "",
        experience: user.experience || "",
        certificates: user.certificates ? user.certificates.join(", ") : "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/adminAuth/manage-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "user-id": localStorage.getItem("uid"), // or your auth token
        },
        body: JSON.stringify({
          ...formData,
          certificates: formData.certificates.split(",").map((c) => c.trim()),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully ✅");
      } else {
        toast.error(data.message || "Update failed ❌");
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
      className="w-full max-w-lg mx-auto space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Update Profile
      </h2>

      {/* Name & Email (readonly) */}
      <div>
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          disabled
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Updateable Fields */}
      <div>
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="font-semibold text-gray-700 dark:text-gray-200">
          Profile Picture (URL)
        </label>
        <input
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      {formData.role === "Patient" && (
        <>
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </>
      )}

      {formData.role === "Doctor" && (
        <>
          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700 dark:text-gray-200">
              Certificates (comma separated)
            </label>
            <input
              type="text"
              name="certificates"
              value={formData.certificates}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
