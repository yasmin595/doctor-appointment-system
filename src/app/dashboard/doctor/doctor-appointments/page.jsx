"use client";

import { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import { getAppointments } from "@/app/actions/appointments/getAppointments";
import { uploadPrescription } from "@/app/actions/appointments/uploadPrescription";
import { updateAppointmentStatus } from "@/app/actions/appointments/updateStatus";
import axios from "axios";

const statusColors = {
    pending: "text-blue-500",
    completed: "text-green-500",
    cancelled: "text-red-500",
};

const statusIcons = {
    pending: <FaCalendarAlt />,
    completed: <FaCheckCircle />,
    cancelled: <FaTimesCircle />,
};
export default function DoctorAppointments() {
    const { data: session } = useSession()
    const [appointments, setAppointments] = useState([]);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [view, setView] = useState("table");
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const fetchAppointments = async () => {
        try {
            const res = await getAppointments(session.user.email)
            console.log(res)
            setAppointments(res)
        } catch (err) {
            toast.error("Something Wents Wrong!")
        }
    }


    useEffect(() => {
        fetchAppointments()
    }, [])



    const filteredAppointments = appointments.filter((appt) => {
        const matchesSearch = appt.Patient.Name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "All" || appt.Status === filter;
        return matchesSearch && matchesFilter;
    });

    const updateStatus = async () => {
        if (!selectedAppt) return;
        console.log(typeof (selectedAppt._id), newStatus)
        const res = await updateAppointmentStatus(selectedAppt._id, newStatus);
        if (res.success) {
            toast.success("Appointment status updated successfully!");
        } else {
            console.log(res)
            toast.error("Failed to update status");
        }
        setSelectedAppt(null);
    };

/*     const uploadPrescriptionFile = async (file) => {
        if (!selectedAppt) return;
        if (!file) return;
        if (file.type !== "application/pdf") {
            toast.error("Please upload a valid PDF file");
            return;
        }
        console.log(file)


        const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_URL;
        const UPLOAD_PRESET = process.env.UPLOAD_PRESET;

        if (file.type !== "application/pdf") {
            toast.error("Please upload a valid PDF file");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("resource_type", "raw"); 
        console.log(formData)

        const cloudinaryRes = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        console.log(cloudinaryRes)
        const PresUrl = cloudinaryRes.data.secure_url



        const res = await uploadPrescription(selectedAppt._id, PresUrl);
        if (res.success) {
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt._id === selectedAppt._id ? { ...appt, Prescription_url: fakeUrl } : appt
                )
            );
            toast.success("Prescription uploaded successfully!");
        } else {
            toast.error("Failed to upload prescription");
        }
        setSelectedAppt(null);
    }; */
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
                        <SelectItem value="pending">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
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
                        <thead className="">
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
                                <tr key={appt._id} className="border-t">
                                    <td className="p-3 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                                            {appt.initials}
                                        </div>
                                        <div>
                                            <div className="font-semibold">{appt.Patient.Name}</div>
                                            <div className="text-xs text-gray-500">{appt.Patient.Id}</div>
                                        </div>
                                    </td>
                                    <td className="p-3">{appt.Date}</td>
                                    <td className="p-3">{appt.symptoms}</td>
                                    <td className={`p-3 flex items-center gap-2 ${statusColors[appt.status]}`}>
                                        {statusIcons[appt.Status]}
                                        {appt.Status}
                                    </td>
                                    <td className="p-3">
                                        {appt.Prescription_url ? (
                                            <a href={`/${appt.Prescription_url}`} className="text-green-600 underline">
                                                {appt.Prescription_url}
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
                                                        setNewStatus(appt.Status);
                                                    }}
                                                >
                                                    Change Status
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Change Status for {appt.Patient.Name}</DialogTitle>
                                                </DialogHeader>
                                                <Select value={newStatus} onValueChange={(value) => setNewStatus(value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select new status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Scheduled</SelectItem>
                                                        <SelectItem value="completed">Completed</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
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
                                                <Button size="sm" variant="outline"
                                                    onClick={() => {
                                                        setSelectedAppt(appt);
                                                    }}
                                                >
                                                    Upload Prescription
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-lg w-full rounded-lg p-6 bg-white shadow-xl">
                                                <DialogHeader>
                                                    <DialogTitle className="text-lg font-semibold text-gray-800">
                                                        Upload Prescription for {appt.Patient.name}
                                                    </DialogTitle>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Please select a prescription file (PDF, DOC, DOCX) to upload.
                                                    </p>
                                                </DialogHeader>

                                                <div className="mt-4 flex flex-col items-center justify-center gap-4">
                                                    <label
                                                        htmlFor={`file-upload-${appt._id}`}
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
                                                            id={`file-upload-${appt._id}`}
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                if (e.target.files && e.target.files[0]) {
                                                                    setFileToUpload(e.target.files[0]);
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                    <DialogClose asChild>
                                                        <Button
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                            onClick={() => {
                                                                if (fileToUpload && selectedAppt) {
                                                                    uploadPrescriptionFile(fileToUpload);
                                                                } else {
                                                                    toast.error("Please select a file first");
                                                                }
                                                            }}
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
                        <Card key={appt._id} className="shadow-md">
                            <CardContent className="p-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">
                                        {appt.initials}
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">{appt.Patient.Name}</h2>
                                        <p className="text-xs text-gray-500">{appt.id}</p>
                                    </div>
                                </div>
                                <p className="text-sm"><strong>Time:</strong> {appt.Date}</p>
                                <p className="text-sm"><strong>Condition:</strong> {appt.symptoms}</p>
                                <p className={`flex items-center gap-2 font-medium ${statusColors[appt.Status]}`}>
                                    {statusIcons[appt.Status]} {appt.Status}
                                </p>
                                <p className="text-sm">
                                    <strong>Prescription:</strong>{" "}
                                    {appt.Prescription_url ? (
                                        <a href={`/${appt.Prescription_url}`} className="text-green-600 underline">
                                            {appt.Prescription_url}
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
                                                    setNewStatus(appt.Status);
                                                }}
                                            >
                                                Change Status
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Change Status for {appt.Patient.Name}</DialogTitle>
                                            </DialogHeader>
                                            <Select value={newStatus} onValueChange={setNewStatus}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select new status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">Scheduled</SelectItem>
                                                    <SelectItem value="completed">Completed</SelectItem>
                                                    <SelectItem value="cancelled">Cancelled</SelectItem>
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
                                                    Upload Prescription for {appt.Patient.Name}
                                                </DialogTitle>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Please select a prescription file (PDF, DOC, DOCX) to upload.
                                                </p>
                                            </DialogHeader>

                                            <div className="mt-4 flex flex-col items-center justify-center gap-4">
                                                <label
                                                    htmlFor={`file-upload-${appt._id}`}
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
                                                        id={`file-upload-${appt._id}`}
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files[0]) {
                                                                setFileToUpload(e.target.files[0]);
                                                                setSelectedAppt(appt);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                <DialogClose asChild>
                                                    <Button
                                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                        onClick={() => {
                                                            if (fileToUpload && selectedAppt) {
                                                                uploadPrescriptionFile(fileToUpload);
                                                            } else {
                                                                toast.error("Please select a file first");
                                                            }
                                                        }}
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