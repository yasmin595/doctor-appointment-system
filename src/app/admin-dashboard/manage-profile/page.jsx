
'use client'
import React, { useState } from 'react';

export default function ManageProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    phone: '+1 (555) 123-4567',
    department: 'IT Management',
    bio: 'Senior administrator with full system access rights',
    avatar: '/api/placeholder/100/100',
    notifications: {
      email: true,
      push: false,
      sms: true
    },
    twoFactor: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
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

  const handleTwoFactorToggle = () => {
    setUserData(prev => ({
      ...prev,
      twoFactor: !prev.twoFactor
    }));
  };

  const handleSave = () => {
    // In a real application, this would send data to the server
    alert('Profile changes saved successfully!');
  };

  return (
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Profile Management</h1>
        <p className=" mb-8">Manage your account settings and preferences</p>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-4">
              <div className="flex flex-col items-center py-4">
                <img 
                  src={userData.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{userData.name}</h2>
                <p className="">{userData.role}</p>
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
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium  mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium  mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium  mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium  mb-1">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={userData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium  mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={userData.bio}
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
            
            {/* Security Settings Tab */}
            {activeTab === 'security' && (
              <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium  mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium  mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium  mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 bg-blue-600  dark:bg-gray-800 dark:text-gray-100 rounded-lg hover:bg-blue-700 text-sm">
                    Update Password
                  </button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-factor authentication</p>
                      <p className="text-sm ">Add an extra layer of security to your account</p>
                    </div>
                    
                    <button
                      onClick={handleTwoFactorToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${userData.twoFactor ? 'bg-blue-600' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-800 dark:text-gray-100 transition ${userData.twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
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
                        checked={userData.notifications.email}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                        checked={userData.notifications.push}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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
                        checked={userData.notifications.sms}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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