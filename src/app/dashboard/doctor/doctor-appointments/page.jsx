"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { FaCheckCircle, FaTimesCircle, FaClock, FaCalendarAlt } from "react-icons/fa";
import { Table2Icon } from "lucide-react";
import { NotebookIcon } from "lucide-react";
import { toast } from "sonner";

// Mock Data
const aappointments = [
    { id: "#0001", name: "Sarah Johnson", initials: "SJ", time: "09:00 AM", date: "2024-01-15", condition: "Regular Checkup", status: "Scheduled", prescription: null },
    { id: "#0002", name: "Michael Chen", initials: "MC", time: "10:30 AM", date: "2024-01-15", condition: "Follow-up Consultation", status: "In Progress", prescription: null },
    { id: "#0003", name: "Emily Davis", initials: "ED", time: "11:15 AM", date: "2024-01-15", condition: "Skin Allergy", status: "Completed", prescription: "prescription_001.pdf" },
    { id: "#0004", name: "Robert Wilson", initials: "RW", time: "02:00 PM", date: "2024-01-15", condition: "Diabetes Management", status: "Scheduled", prescription: null },
    { id: "#0005", name: "Lisa Anderson", initials: "LA", time: "03:30 PM", date: "2024-01-15", condition: "Hypertension Check", status: "Cancelled", prescription: null },
    { id: "#0006", name: "David Brown", initials: "DB", time: "04:15 PM", date: "2024-01-15", condition: "Annual Physical", status: "Scheduled", prescription: null },
];

const statusColors = {
    Scheduled: "text-blue-500",
    "In Progress": "text-yellow-500",
    Completed: "text-green-500",
    Cancelled: "text-red-500",
};

const statusIcons = {
    Scheduled: <FaCalendarAlt />,
    "In Progress": <FaClock />,
    Completed: <FaCheckCircle />,
    Cancelled: <FaTimesCircle />,
};
export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState(aappointments);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [view, setView] = useState("table");
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [newStatus, setNewStatus] = useState("");


    const filteredAppointments = appointments.filter((appt) => {
        const matchesSearch = appt.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || appt.status === filter;
        return matchesSearch && matchesFilter;
    });
    const updateStatus = () => {
        if (!selectedAppt) return;
        setAppointments((prev) =>
            prev.map((appt) =>
                appt.id === selectedAppt.id ? { ...appt, status: newStatus } : appt
            )
        );
        toast.success("Appointment status updated successfully!");

        setSelectedAppt(null);
    };

    const uploadPrescription = (file) => {
        if (!selectedAppt) return;
        setAppointments((prev) =>
            prev.map((appt) =>
                appt.id === selectedAppt.id ? { ...appt, prescription: file.name } : appt
            )
        );
        toast.success("Prescription uploaded successfully!");
        setSelectedAppt(null);
    };

    return (
        <div className="p-6 min-h-screen pt-20 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Appointment Management</h1>
            <p className="text-gray-500 mb-4">Manage your patient appointments and prescriptions</p>

            {/* Search + Filter + View Toggle */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <Input
                    placeholder="Search by patient name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />

                <Select onValueChange={setFilter} defaultValue="All">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>

                <Tabs value={view} onValueChange={(val) => setView(val)} className="ml-auto">
                    <TabsList>
                        <TabsTrigger value="table">Table View <Table2Icon /></TabsTrigger>
                        <TabsTrigger value="card">Card View <NotebookIcon /></TabsTrigger>
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
                                <th className="p-3 text-left">Condition</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Prescription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.map((appt) => (
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
                                    <td className="p-3">{appt.condition}</td>
                                    <td className={`p-3 flex items-center gap-2 ${statusColors[appt.status]}`}>
                                        {statusIcons[appt.status]}
                                        {appt.status}
                                    </td>
                                    <td className="p-3">
                                        {appt.prescription ? (
                                            <a href={`/${appt.prescription}`} className="text-green-600 underline">
                                                {appt.prescription}
                                            </a>
                                        ) : (
                                            "No prescription"
                                        )}
                                    </td>
                                    <td className="p-3 flex gap-2">
                                        {/* Change Status Modal */}
                                        <Dialog >
                                            <DialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelectedAppt(appt);
                                                        setNewStatus(appt.status);
                                                    }}
                                                >
                                                    Change Status
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Change Status for {appt.name}</DialogTitle>
                                                </DialogHeader>
                                                <Select value={newStatus} onValueChange={setNewStatus}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select new status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                                        <SelectItem value="Completed">Completed</SelectItem>
                                                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button onClick={() => {
                                                            updateStatus();
                                                        }}>Confirm</Button>
                                                    </DialogClose>

                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        {/* Upload Prescription Modal */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline">
                                                    Upload Prescription
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-lg w-full rounded-lg p-6 bg-white shadow-xl">
                                                <DialogHeader>
                                                    <DialogTitle className="text-lg font-semibold text-gray-800">
                                                        Upload Prescription for {appt.name}
                                                    </DialogTitle>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Please select a prescription file (PDF, DOC, DOCX) to upload.
                                                    </p>
                                                </DialogHeader>

                                                <div className="mt-4 flex flex-col items-center justify-center gap-4">
                                                    <label
                                                        htmlFor={`file-upload-${appt.id}`}
                                                        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                                    >
                                                        <svg
                                                            className="w-10 h-10 text-gray-400 mb-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-3-3m3 3l3-3M12 4v8"
                                                            />
                                                        </svg>
                                                        <span className="text-gray-600 text-sm">
                                                            Click to select or drag and drop your file here
                                                        </span>
                                                        <input
                                                            id={`file-upload-${appt.id}`}
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            className="hidden"
                                                            onChange={(e) => e.target.files && uploadPrescription(e.target.files[0])}
                                                        />
                                                    </label>
                                                    <DialogClose asChild>
                                                        <Button
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                            onClick={() => selectedAppt && uploadPrescription(selectedAppt)}
                                                        >
                                                            Upload
                                                        </Button>
                                                    </DialogClose>

                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Card View */}
            {view === "card" && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-4">
                    {filteredAppointments.map((appt) => (
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
                                <p className="text-sm"><strong>Time:</strong> {appt.time}</p>
                                <p className="text-sm"><strong>Condition:</strong> {appt.condition}</p>
                                <p className={`flex items-center gap-2 font-medium ${statusColors[appt.status]}`}>
                                    {statusIcons[appt.status]} {appt.status}
                                </p>
                                <p className="text-sm">
                                    <strong>Prescription:</strong>{" "}
                                    {appt.prescription ? (
                                        <a href={`/${appt.prescription}`} className="text-green-600 underline">
                                            {appt.prescription}
                                        </a>
                                    ) : (
                                        "No prescription"
                                    )}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {/* Change Status Modal */}
                                    <Dialog >
                                        <DialogTrigger asChild>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedAppt(appt);
                                                    setNewStatus(appt.status);
                                                }}
                                            >
                                                Change Status
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Change Status for {appt.name}</DialogTitle>
                                            </DialogHeader>
                                            <Select value={newStatus} onValueChange={setNewStatus}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select new status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <Button onClick={() => {
                                                        updateStatus();
                                                    }}>Confirm</Button>
                                                </DialogClose>

                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    {/* Upload Prescription Modal */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                Upload Prescription
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg w-full rounded-lg p-6 bg-white shadow-xl">
                                            <DialogHeader>
                                                <DialogTitle className="text-lg font-semibold text-gray-800">
                                                    Upload Prescription for {appt.name}
                                                </DialogTitle>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Please select a prescription file (PDF, DOC, DOCX) to upload.
                                                </p>
                                            </DialogHeader>

                                            <div className="mt-4 flex flex-col items-center justify-center gap-4">
                                                <label
                                                    htmlFor={`file-upload-${appt.id}`}
                                                    className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                                >
                                                    <svg
                                                        className="w-10 h-10 text-gray-400 mb-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-3-3m3 3l3-3M12 4v8"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-600 text-sm">
                                                        Click to select or drag and drop your file here
                                                    </span>
                                                    <input
                                                        id={`file-upload-${appt.id}`}
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        className="hidden"
                                                        onChange={(e) => e.target.files && uploadPrescription(e.target.files[0])}
                                                    />
                                                </label>
                                                <DialogClose asChild>
                                                    <Button
                                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                        onClick={() => selectedAppt && uploadPrescription(selectedAppt)}
                                                    >
                                                        Upload
                                                    </Button>
                                                </DialogClose>

                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}