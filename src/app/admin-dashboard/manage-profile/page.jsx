'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ManageProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
const [updating, setUpdating] = useState(false);

  const { data: session, status } = useSession();

useEffect(() => {
  if (!session?.user?.email) return;

  const fetchAdminData = async () => {
    try {
      const res = await fetch("/api/adminAuth/adminProfile");
      if (!res.ok) throw new Error("Failed to fetch admin data");

      const data = await res.json();
      setUserData(data); // only logged-in admin
    } catch (error) {
      toast.error("Failed to load admin data ❌");
    } finally {
      setLoading(false);
    }
  };

  fetchAdminData();
}, [session]);


// Input change handler
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  if (!userData) return;

  if (type === "checkbox") {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }));
  } else {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

// Save/update handler
// Save/update handler
const handleSave = async () => {
  setUpdating(true);
  if (!userData?._id) {
    toast.error("User ID not found!");
    return;
  }

  // Create update data with only changed fields or non-empty values
  const updateData = {
    _id: userData._id,
  };

  // Only include fields that have values
  if (userData.name && userData.name.trim() !== "") updateData.name = userData.name;
  if (userData.phone && userData.phone.trim() !== "") updateData.phone = userData.phone;
  if (userData.address && userData.address.trim() !== "") updateData.address = userData.address;
  if (userData.profilePicture && userData.profilePicture.trim() !== "") updateData.profilePicture = userData.profilePicture;

  // Include password change if provided
  if (userData.newPassword && userData.newPassword.trim() !== "") {
    updateData.newPassword = userData.newPassword;
    if (userData.currentPassword) updateData.currentPassword = userData.currentPassword;
  }

  console.log("Sending update data:", updateData);

  try {
    const res = await fetch("/api/adminAuth/profileUpdate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();
    console.log("Update response:", data);

    if (res.ok) {
      setUserData(data); // update frontend state
      toast.success("Profile updated successfully!");
    } else {
      toast.error(data.message || "Failed to update profile");
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    toast.error("Something went wrong while updating profile");
  }
  setUpdating(false);
};

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Profile Management</h1>
        <p className="mb-8">Manage your account settings and preferences</p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-4">
              <div className="flex flex-col items-center py-4">
                <img
                  src={userData?.profilePicture || session?.user?.image || '/api/placeholder/100/100'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{userData?.name || session?.user?.name}</h2>
                <p>{userData?.role || 'Admin'}</p>
              </div>

              <nav className="mt-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Profile Information
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeTab === 'security'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Security Settings
                </button>

                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                    activeTab === 'notifications'
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Notifications
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Change Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
            
                {userData?.name || "Admin"}
              
            </div>

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
                  {userData?.email || "admin@gmail.com"}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
            {userData?.phone || "+8801 **********"}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Current Address</label>
            {userData?.address || "Dhaka ,Bangladesh"}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Created At</label>
            {userData?.createdAt 
        ? new Date(userData.createdAt).toLocaleString("en-BD", {
            dateStyle: "full",
            timeStyle: "short",
          })
        : "Dhaka, Bangladesh"}

            </div>
          </div>

        
        </div>
      )}

{activeTab === 'security' && (
  <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Change Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          // value={userData?.name || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Current Password */}
      <div>
        <label className="block text-sm font-medium mb-1">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          // value={userData?.currentPassword || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* New Password */}
      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          name="newPassword"
          // value={userData?.newPassword || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          // value={userData?.phone || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Address */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          name="address"
          // value={userData?.address || ""}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Photo URL</label>
        <input
        type='text'
          name="profilePicture"
          // value={userData?.address || ""}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />

      </div>
    </div>

    <div className="flex justify-end">
<button
  onClick={handleSave}
  disabled={updating}
  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
>
  {updating ? "Updating..." : "Update Security"}
</button>
    </div>
  </div>
)}


 
            {/* Notifications Tab */}
       {/* Notifications Tab */}
            {activeTab === 'notifications' && userData && (
              <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm ">Receive important updates via email</p>
                    </div>

                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="email"
                        checked={userData?.email}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm ">Receive alerts on your device</p>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="push"
                        checked={userData?.push}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm ">Receive text message alerts</p>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="sms"
                        checked={userData?.sms}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button 
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-blue-700"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </div>
  );
}