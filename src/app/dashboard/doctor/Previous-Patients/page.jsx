"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table2Icon, NotebookIcon } from "lucide-react";

// Mock previous patients data
const previousPatients = [
  {
    id: "#P001",
    name: "Sarah Johnson",
    initials: "SJ",
    age: 32,
    gender: "Female",
    condition: "Diabetes",
    lastVisit: "2024-01-10",
    prescription: "prescription_001.pdf",
    doctor: "Dr. Ayesha Akter",
  },
  {
    id: "#P002",
    name: "Michael Chen",
    initials: "MC",
    age: 45,
    gender: "Male",
    condition: "Hypertension",
    lastVisit: "2024-01-12",
    prescription: null,
    doctor: "Dr. Mahmud Hasan",
  },
  {
    id: "#P003",
    name: "Emily Davis",
    initials: "ED",
    age: 28,
    gender: "Female",
    condition: "Skin Allergy",
    lastVisit: "2024-01-15",
    prescription: "prescription_002.pdf",
    doctor: "Dr. Nusrat Jahan",
  },
];
export default function page() {
  const [patients] = useState(previousPatients);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("table");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-6 min-h-screen pt-20 max-w-7xl mx-auto text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-2">Previous Patients History</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        View all previous patient visits, conditions, and prescriptions.
      </p>

      {/* Search + View Toggle */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <Input
          placeholder="Search by patient name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />

        <Tabs
          value={view}
          onValueChange={(val) => setView(val)}
          className="ml-auto"
        >
          <TabsList>
            <TabsTrigger value="table">
              Table View <Table2Icon />
            </TabsTrigger>
            <TabsTrigger value="card">
              Card View <NotebookIcon />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                  Patient
                </th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                  Age/Gender
                </th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                  Condition
                </th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                  Last Visit
                </th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                  Doctor
                </th>
                <th className="p-3 text-left text-gray-700 dark:text-gray-200">
                  Prescription
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {filteredPatients.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-800 dark:text-gray-200">
                      {p.initials}
                    </div>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {p.id}
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {p.age} / {p.gender}
                  </td>
                  <td className="p-3">{p.condition}</td>
                  <td className="p-3">{p.lastVisit}</td>
                  <td className="p-3">{p.doctor}</td>
                  <td className="p-3">
                    {p.prescription ? (
                      <a
                        href={`/${p.prescription}`}
                        className="text-green-600 dark:text-green-400 underline"
                      >
                        {p.prescription}
                      </a>
                    ) : (
                      "No prescription"
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPatients.map((p) => (
            <Card key={p.id} className="shadow-md bg-white dark:bg-gray-800">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-800 dark:text-gray-200">
                    {p.initials}
                  </div>
                  <div>
                    <h2 className="font-semibold">{p.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {p.id}
                    </p>
                  </div>
                </div>
                <p className="text-sm">
                  <strong>Age/Gender:</strong> {p.age} / {p.gender}
                </p>
                <p className="text-sm">
                  <strong>Condition:</strong> {p.condition}
                </p>
                <p className="text-sm">
                  <strong>Last Visit:</strong> {p.lastVisit}
                </p>
                <p className="text-sm">
                  <strong>Doctor:</strong> {p.doctor}
                </p>
                <p className="text-sm">
                  <strong>Prescription:</strong>{" "}
                  {p.prescription ? (
                    <a
                      href={`/${p.prescription}`}
                      className="text-green-600 dark:text-green-400 underline"
                    >
                      {p.prescription}
                    </a>
                  ) : (
                    "No prescription"
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
