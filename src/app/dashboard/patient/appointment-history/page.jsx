"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Table2Icon, NotebookIcon } from "lucide-react";
import { FaDownload } from "react-icons/fa";

// Dummy completed appointments
const historyAppointments = [
  {
    id: "#0003",
    name: "Emily Davis",
    initials: "ED",
    time: "11:15 AM",
    date: "2024-01-15",
    prescription: "prescription_001.pdf",
  },
  {
    id: "#0007",
    name: "Alex Turner",
    initials: "AT",
    time: "01:00 PM",
    date: "2024-01-20",
    prescription: "prescription_002.pdf",
  },
  {
    id: "#0009",
    name: "Sophia Miller",
    initials: "SM",
    time: "09:45 AM",
    date: "2024-01-22",
    prescription: "prescription_003.pdf",
  },
];

export default function AppointmentHistory() {
  const [appointments] = useState(historyAppointments);
  const [view, setView] = useState("table");

  return (
    <div className="p-6 min-h-screen pt-20 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Appointment History</h1>
      <p className="text-gray-500 mb-4">
        View your completed appointments and prescriptions
      </p>

      {/* View Toggle */}
      <div className="flex justify-end mb-6">
        <Tabs value={view} onValueChange={(val) => setView(val)}>
          <TabsList>
            <TabsTrigger value="table">
              Table View <Table2Icon className="ml-1 w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="card">
              Card View <NotebookIcon className="ml-1 w-4 h-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Prescription</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                      {appt.initials}
                    </div>
                    <div>
                      <div className="font-semibold">{appt.name}</div>
                      <div className="text-xs text-gray-500">{appt.id}</div>
                    </div>
                  </td>
                  <td className="p-3">{appt.time}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">
                    {appt.prescription ? (
                      <span className="text-green-600 underline">
                        {appt.prescription}
                      </span>
                    ) : (
                      "No prescription"
                    )}
                  </td>
                  <td className="p-3">
                    {appt.prescription && (
                      <a
                        href={`/${appt.prescription}`}
                        download
                        className="flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        <FaDownload /> Download
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {view === "card" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {appointments.map((appt) => (
            <Card key={appt.id} className="shadow-md">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                    {appt.initials}
                  </div>
                  <div>
                    <h2 className="font-semibold">{appt.name}</h2>
                    <p className="text-xs text-gray-500">{appt.id}</p>
                  </div>
                </div>
                <p className="text-sm">
                  <strong>Time:</strong> {appt.time}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong> {appt.date}
                </p>
                <p className="text-sm">
                  <strong>Prescription:</strong>{" "}
                  {appt.prescription ? (
                    <span className="text-green-600 underline">
                      {appt.prescription}
                    </span>
                  ) : (
                    "No prescription"
                  )}
                </p>
                {appt.prescription && (
                  <Button
                    size="sm"
                    className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white"
                    asChild
                  >
                    <a href={`/${appt.prescription}`} download>
                      <FaDownload /> Download
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
