"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("doctor"); // doctor | tourist

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/adminAuth/manageUsers"); // static or DB
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/manageUsers/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id));
        alert(result.message);
      } else {
        alert(result.error || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  
  // Doctor verification
  const handleVerify = async (id, status) => {
    alert(`Doctor ${status} for user id: ${id}`);
    // Later: call PATCH API to update doctor status
  };

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }


// ✅ Update doctor status with confirmation + success toast
const handleStatusChange = (id, newStatus) => {
  toast.promise(
    new Promise((resolve, reject) => {
      // Show confirm dialog
      if (confirm(`Are you sure you want to mark this doctor as ${newStatus}?`)) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, status: newStatus } : user
          )
        );
        resolve(); // success
      } else {
        reject(); // cancelled
      }
    }),
    {
      loading: "Updating status...",
      success: `Doctor status updated to ${newStatus}!`,
      error: "Action cancelled",
    }
  );
};
  // Filter by role
   // ✅ Filter users by tab
  const filteredUsers =
    activeTab === "doctors"
      ? users.filter((u) => u.role === "doctor")
      : users.filter((u) => u.role !== "doctor");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab("doctors")}
          className={`px-4 py-2 rounded ${
            activeTab === "doctors" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Doctors
        </button>
        <button
          onClick={() => setActiveTab("patients")}
          className={`px-4 py-2 rounded ${
            activeTab === "patients" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Patients & Admin
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              {activeTab === "doctors" && (
                <th className="border border-gray-300 px-4 py-2">Status</th>
              )}
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.role}
                  </td>

                  {/* ✅ Doctors extra column */}
                  {activeTab === "doctors" && (
                    <td className="border border-gray-300 px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          user.status === "verified"
                            ? "bg-green-200 text-green-800"
                            : user.status === "rejected"
                            ? "bg-red-200 text-red-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                  )}

                  {/* Actions */}
                  <td className="border border-gray-300 px-4 py-2">
                    {activeTab === "doctors" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(user._id, "verified")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(user._id, "rejected")}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="block w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={activeTab === "doctors" ? "5" : "4"}
                  className="text-center border border-gray-300 px-4 py-4 text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}