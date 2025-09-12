"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AllDoctorPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const { data: session } = useSession();
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const user = session?.user;

    const handleConfirm = (doctorId) => {
        router.push(`/dashboard/patient/all-doctor/${doctorId}`);
    };

    useEffect(() => {
        fetch("/doctor.json")
            .then((res) => res.json())
            .then((data) => {
                setDoctors(data);
                setFilteredDoctors(data);
            });
    }, []);

    // Handle search & sorting
    useEffect(() => {
        let result = [...doctors];

        if (search) {
            result = result.filter(
                (doc) =>
                    doc.name.toLowerCase().includes(search.toLowerCase()) ||
                    doc.specialization.toLowerCase().includes(search.toLowerCase())
            );
        }

        switch (sortOption) {
            case "fee-asc":
                result.sort((a, b) => a.consultationFee - b.consultationFee);
                break;
            case "fee-desc":
                result.sort((a, b) => b.consultationFee - a.consultationFee);
                break;
            case "rating-asc":
                result.sort((a, b) => a.rating - b.rating);
                break;
            case "rating-desc":
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setFilteredDoctors(result);
    }, [search, sortOption, doctors]);

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setOpen(true);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-background mb-6">
                All Doctors
            </h1>

            {/* Search & Sort Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
                <Input
                    placeholder="Search by name or specialization..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2"
                />

                <Select
                    value={sortOption}
                    onValueChange={setSortOption}
                    className="w-full md:w-1/3"
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fee-asc">Fee: Low to High</SelectItem>
                        <SelectItem value="fee-desc">Fee: High to Low</SelectItem>
                        <SelectItem value="rating-asc">Rating: Low to High</SelectItem>
                        <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                    <Card
                        key={doctor.id}
                        className="hover:shadow-lg transition border border-stone-300"
                    >
                        <CardHeader className="flex flex-col items-center">
                            <img
                                src={doctor.profilePicture}
                                alt={doctor.name}
                                className="w-24 h-24 rounded-full mb-3"
                            />
                            <CardTitle className="text-xl">{doctor.name}</CardTitle>
                            <p className="text-stone-600">{doctor.specialization}</p>
                        </CardHeader>

                        <CardContent className="text-center space-y-2">
                            <p>
                                <span className="font-semibold">Fee:</span> ৳
                                {doctor.consultationFee}
                            </p>
                            <p>
                                <span className="font-semibold">Rating:</span> ⭐{" "}
                                {doctor.rating || 0}
                            </p>

                            <Button
                                className="w-full mt-3"
                                onClick={() => handleBookAppointment(doctor)}
                            >
                                Book Appointment
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-lg">
                    {selectedDoctor && (
                        <>
                            <DialogHeader className="text-center">
                                <img
                                    src={selectedDoctor.profilePicture}
                                    alt={selectedDoctor.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-3"
                                />
                                <DialogTitle className="text-xl">{selectedDoctor.name}</DialogTitle>
                                <DialogDescription>
                                    {selectedDoctor.specialization} | {selectedDoctor.location}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 space-y-2 text-sm text-stone-400">
                                <p>
                                    <span className="font-semibold">Email:</span> {selectedDoctor.email}
                                </p>
                                <p>
                                    <span className="font-semibold">Phone:</span> {selectedDoctor.phone}
                                </p>
                                <p>
                                    <span className="font-semibold">Bio:</span> {selectedDoctor.bio}
                                </p>
                                <p>
                                    <span className="font-semibold">Experience:</span>{" "}
                                    {selectedDoctor.experience}
                                </p>
                                <p>
                                    <span className="font-semibold">Consultation Fee:</span> ৳
                                    {selectedDoctor.consultationFee}
                                </p>
                                <p>
                                    <span className="font-semibold">Rating:</span> ⭐ {selectedDoctor.rating || 0}
                                </p>

                                {selectedDoctor.certificates?.length > 0 && (
                                    <div>
                                        <p className="font-semibold">Certificates:</p>
                                        <ul className="list-disc list-inside">
                                            {selectedDoctor.certificates.map((cert, i) => (
                                                <li key={i}>{cert}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div>
                                    <p className="font-semibold">Availability:</p>
                                    <ul className="list-disc list-inside">
                                        {Object.entries(selectedDoctor.availability).map(([day, slots], i) => (
                                            <li key={i}>
                                                <span className="font-semibold">{day}:</span> {slots.join(", ")}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {selectedDoctor.appointments?.length > 0 && (
                                    <div>
                                        <p className="font-semibold">Appointments:</p>
                                        <ul className="list-disc list-inside">
                                            {selectedDoctor.appointments.map((appt) => (
                                                <li key={appt.id}>
                                                    {appt.patientName} – {appt.date} at {appt.time} ({appt.status})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <DialogFooter>
                                <Button
                                    className="w-full"
                                    onClick={() => handleConfirm(selectedDoctor.id)}
                                >
                                    Confirm Booking
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AllDoctorPage;
