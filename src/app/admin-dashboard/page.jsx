'use client'
import React, { useState } from 'react';
import Head from 'next/head';
import NextAuthProvider from '@/providers/NextAuthProvider';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import PatientFeedback from '@/components/HomePage/PatientFeedback/PatientFeedback';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // const {data: session, status } = NextAuthProvider();

  // Sample data - in a real app this would come from API calls
  const dashboardData = {
    stats: {
      totalPatients: 1248,
      newPatients: 42,
      appointmentsToday: 28,
      availableDoctors: 18
    },
    recentAppointments: [
      { id: 1, patient: 'Sarah Johnson', doctor: 'Dr. Patel', time: '10:30 AM', status: 'Completed' },
      { id: 2, patient: 'Michael Chen', doctor: 'Dr. Rodriguez', time: '11:45 AM', status: 'In Progress' },
      { id: 3, patient: 'Emma Wilson', doctor: 'Dr. Kim', time: '1:15 PM', status: 'Scheduled' },
      { id: 4, patient: 'James Miller', doctor: 'Dr. Thompson', time: '2:30 PM', status: 'Scheduled' }
    ],
    notifications: [
      { id: 1, message: 'New patient registration requires approval', priority: 'high' },
      { id: 2, message: 'Monthly staff meeting scheduled for Friday', priority: 'medium' },
      { id: 3, message: 'Inventory restock needed for surgical masks', priority: 'high' }
    ]
  };

  return (
    <div className="admin-dashboard  ">
      <Head>
        <title>Admin Dashboard | Medical Platform</title>
        <meta name="description" content="Administrative dashboard for medical service management" />
      </Head>
      
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
 
      </header>

             <div className="font-bold text-2xl text-center pt-5">
          <span>Welcome, Admin</span>

        </div>

      
      <div className="dashboard-container">
      
        
        <main className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{dashboardData.stats.totalPatients}+</div>
              <div className="stat-label">Total Patients</div>
              <div className="stat-trend">+12% from last month</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{dashboardData.stats.newPatients}+</div>
              <div className="stat-label">New Patients This Week</div>
              <div className="stat-trend">+5 since yesterday</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{dashboardData.stats.appointmentsToday}+</div>
              <div className="stat-label">Appointments Today</div>
              <div className="stat-trend">8 completed so far</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-value">{dashboardData.stats.availableDoctors}+</div>
              <div className="stat-label">Available Doctors</div>
              <div className="stat-trend">2 on leave</div>
            </div>
          </div>
          
          <div className="content-grid">
            <div className="appointments-card">
              <h2>Today's Appointments</h2>
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
            className={`status-badge status-${appointment.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {appointment.status}
          </span>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
              <Link href={'/doctor-appointments'}>
               <Button className="view-all-btn">View All Appointments</Button>
              </Link>
             
            </div>
            
            <div className="notifications-card">
              <h2>Notifications</h2>
              <ul>
                {dashboardData.notifications.map(notification => (
                  <li key={notification.id} className={`priority-${notification.priority}`}>
                    {notification.message}
                  </li>
                ))}
              </ul>
              <button className="view-all-btn">View All Notifications</button>
            </div>
          </div>
          <PatientFeedback></PatientFeedback>
        </main>
      </div>
      
      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
         
        }
        
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          font-size: 2.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .dashboard-header h1 {
          color: #2c3e50;
          margin: 0;
        }
        
        .user-info {
          display: flex;
          
          align-items: center;
          font-size: 2.5rem;
          gap: 10px;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #3498db;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .dashboard-container {
          display: flex;
          min-height: calc(100vh - 80px);
        }
        
        .sidebar {
          width: 250px;
          background-color: #2c3e50;
          color: white;
          padding: 1rem 0;
        }
        
        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .sidebar li {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .sidebar li:hover {
          background-color: #34495e;
        }
        
        .sidebar li.active {
          background-color: #3498db;
        }
        
        .dashboard-content {
          flex: 1;
          padding: 2rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
          text-align: center;
        }
        
        .stat-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: #7f8c8d;
          margin-bottom: 0.5rem;
        }
        
        .stat-trend {
          font-size: 0.9rem;
          color: #27ae60;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        
        .appointments-card, .notifications-card {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        h2 {
          margin-top: 0;
          color: #2c3e50;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.75rem;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        th {
          font-weight: 600;
          color: #7f8c8d;
          font-size: 0.9rem;
        }
        
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .status-completed {
          background-color: #e7f6e9;
          color: #27ae60;
        }
        
        .status-in-progress {
          background-color: #fef5e6;
          color: #f39c12;
        }
        
        .status-scheduled {
          background-color: #e6effe;
          color: #3498db;
        }
        
        .notifications-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .notifications-card li {
          padding: 0.75rem 0;
          border-bottom: 1px solid #eee;
        }
        
        .priority-high:before {
          content: "🔴 ";
        }
        
        .priority-medium:before {
          content: "🟡 ";
        }
        
        .view-all-btn {
          margin-top: 1rem;
          background: none;
          border: none;
          color: #3498db;
          cursor: pointer;
          font-weight: 500;
          padding: 0;
        }
        
        .view-all-btn:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            padding: 0;
          }
          
          .sidebar ul {
            display: flex;
            overflow-x: auto;
          }
          
          .sidebar li {
            padding: 1rem;
            white-space: nowrap;
          }
          
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}