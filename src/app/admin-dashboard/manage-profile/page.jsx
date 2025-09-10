'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ManageProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await fetch("/api/adminAuth/admin");
        if (!res.ok) throw new Error("Failed to fetch admin data");

        const data = await res.json();
        setUserData(data); // use fetched admin data
        console.log(data)
      } catch (error) {
        toast.error("Failed to load admin data ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // security form state
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (!userData) return;

    if (type === 'checkbox') {
      setUserData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTwoFactorToggle = () => {
    setUserData(prev => ({
      ...prev,
      twoFactor: !prev.twoFactor
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/adminProfileUpdate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        toast.success("Profile changes saved successfully!");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handlePasswordUpdate = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/adminAuth/profilUpdate", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Password updated successfully!");
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Profile Management</h1>
        <p className=" mb-8">Manage your account settings and preferences</p>
        
      <div className="flex flex-col gap-6">

  {userData?.map((user) => (
    <div key={user._id} className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Navigation */}
      <div className="md:w-1/4">
        <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-4">
          <div className="flex flex-col items-center py-4">
            <img
              src={user?.profilePicture || user?.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="">{user?.role}</p>
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
            <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Absolute Position</label>
                <input
                  type="text"
                  name="department"
                  value={user.department || 'CEO OF the Company'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="bio"
                value={user?.address || ''}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}




            {/* Security Settings Tab */}
            {activeTab === 'security' && (
              <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

                {/* Password Change Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>

                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePasswordUpdate}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 text-white text-sm"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
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
                        checked={userData.email}
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
                        checked={userData.push}
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
                        checked={userData.sms}
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
   );
    
  
}