"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import PatientFeedback from "@/components/HomePage/PatientFeedback/PatientFeedback";
import { useSession } from "next-auth/react";


export default function AdminDashboard() {
  const { data: session } = useSession(); // ✅ get logged-in user session
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);


  const dashboardData = 
  { stats: { totalPatients: 1248,
     newPatients: 42, appointmentsToday: 28, 
     availableDoctors: 18, },
      recentAppointments: [ 
        { id: 1, patient: "Sarah Johnson", 
          doctor: "Dr. Patel", time: "10:30 AM", 
          status: "Completed" }, { id: 2, patient: "Michael Chen", 
            doctor: "Dr. Rodriguez", time: "11:45 AM", status: "In Progress" },
             { id: 3, patient: "Emma Wilson", doctor: "Dr. Kim", time: "1:15 PM", status: "Scheduled" }, 
             { id: 4, patient: "James Miller", doctor: "Dr. Thompson", time: "2:30 PM", status: "Scheduled" }, ],
              notifications: [ { id: 1, message: "New patient registration requires approval", priority: "high" }, { id: 2, message: "Monthly staff meeting scheduled for Friday", priority: "medium" }, { id: 3, message: "Inventory restock needed for surgical masks", priority: "high" }, ], };
  
  
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchAdminData = async () => {
      try {
        const res = await fetch(`/api/adminAuth/admin?email=${session?.user?.email}`);
        if (!res.ok) throw new Error("Failed to fetch admin data");

        const data = await res.json();
        setAdmin(data);
      } catch (error) {
         toast.error("Something went wrong ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [session]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
      <Head>
        <title>Admin Dashboard | Medical Platform</title>
        <meta name="description" content="Administrative dashboard for medical service management" />
      </Head>


      {/* Header */}
      <header className="px-6 py-4 shadow-md bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold">Admin Dashboard   </h1>

      
        


      </header>

      <div className="font-bold text-xl md:text-2xl text-center py-6">
        <ul>
  <h1>Welcome, Admin <span className="text-green-700 italic">{admin?.name}</span></h1>
</ul>

     
      </div>

      <main className="px-6 pb-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold">{dashboardData.stats.totalPatients}+</div>
            <div className="text-gray-500 dark:text-gray-400">Total Patients</div>
            <div className="text-sm text-green-500">+12% from last month</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold">{dashboardData.stats.newPatients}+</div>
            <div className="text-gray-500 dark:text-gray-400">New Patients This Week</div>
            <div className="text-sm text-blue-500">+5 since yesterday</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold">{dashboardData.stats.appointmentsToday}+</div>
            <div className="text-gray-500 dark:text-gray-400">Appointments Today</div>
            <div className="text-sm text-yellow-500">8 completed so far</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
            <div className="text-3xl font-bold">{dashboardData.stats.availableDoctors}+</div>
            <div className="text-gray-500 dark:text-gray-400">Available Doctors</div>
            <div className="text-sm text-red-500">2 on leave</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Today's Appointments</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.patient}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${appointment.status === "Completed"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                          : appointment.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                          }`}
                      >
                        {appointment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
       
          </div>

          {/* Notifications */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <ul className="space-y-3">
              {dashboardData.notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-3 rounded-lg border ${notification.priority === "high"
                    ? "border-red-400 text-red-600 dark:border-red-600 dark:text-red-400"
                    : "border-yellow-400 text-yellow-600 dark:border-yellow-600 dark:text-yellow-400"
                    }`}
                >
                  {notification.message}
                </li>
              ))}
            </ul>
            
          </div>
        </div>

        {/* Patient Feedback */}
        <div className="mt-10">
          <PatientFeedback />
        </div>
      </main>
    </div>
  );
}
