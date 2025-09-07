"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("doctors");
  const [theme, setTheme] = useState("light");


  // fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/adminAuth/manageUsers");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

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

  const handleStatusChange = (id, newStatus) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, status: newStatus } : user
      )
    );
    toast.success(`Doctor status updated to "${newStatus}" successfully ✅`);
  };

  const filteredUsers =
    activeTab === "doctors"
      ? users.filter((u) => u.role === "doctor")
      : users.filter((u) => u.role === "patient");

  return (
<div className="p-6 my-5 min-h-screen   dark:bg-black dark:text-white">      {/* Dark Mode Toggle Button */}


      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Tabs */}
<div className="flex gap-4 mb-4">
  <button
    onClick={() => setActiveTab("doctors")}
    className={`flex items-center gap-2 px-4 py-2 rounded transition ${
      activeTab === "doctors"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-700"
    }`}
  >
    <div className="w-4 h-4" />
    Doctors
  </button>

  <button
    onClick={() => setActiveTab("patients")}
    className={`flex items-center gap-2 px-4 py-2 rounded transition ${
      activeTab === "patients"
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-700"
    }`}
  >
    <div className="w-4 h-4" />
    Patients
  </button>
</div>



      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border w-full text-left">
          <thead>
           <tr className="bg-gray-100 dark:bg-gray-800">

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

                  <td className="border border-gray-300 px-4 py-2">
                    {activeTab === "doctors" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(user._id, "verified")
                          }
                          className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(user._id, "rejected")
                          }
                          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                        >
                          Block
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="block w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700"
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
className="text-center border border-gray-300 px-4 py-4 text-gray-500 dark:text-gray-400"
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
