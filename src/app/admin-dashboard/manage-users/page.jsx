"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
// ✅ Static sample data

// ✅ Static sample data

export default function Page() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("doctors"); 




    // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/adminAuth/manageUsers"); 
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



// ✅ Delete user with toast confirmation
const handleDelete = (id) => {
  toast("Are you sure you want to delete this user?", {
    action: {
      label: "Yes, Delete",
      onClick: () => {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("User deleted successfully ✅");
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => toast.info("Delete cancelled ❌"),
    },
  });
};

// ✅ Update doctor status with toast
const handleStatusChange = (id, newStatus) => {
  setUsers((prev) =>
    prev.map((user) =>
      user._id === id ? { ...user, status: newStatus } : user
    )
  );

  toast.success(
    `Doctor status updated to "${newStatus}" successfully ✅`
  );
};

  // ✅ Delete user
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setUsers(users.filter((user) => user._id !== id));
  };

  // ✅ Update doctor status
  const handleStatusChange = (id, newStatus) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  // ✅ Filter users by tab
  const filteredUsers =
    activeTab === "doctors"
      ? users.filter((u) => u.role === "doctor")
      : users.filter((u) => u.role !== "doctor");

  return (
    <div className="p-6 my-5">
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
                                              <button
                        onClick={() => handleDelete(user._id)}
    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"                      >
                        Block
                      </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="block w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Block
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
