"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DoctorsCard({ doctor }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleBookNow = () => {
    if (session) {
      router.push(`/doctor-profile-details/${doctor._id}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <Card className="shadow-lg rounded-2xl overflow-hidden">
      <Image
        src={doctor.profilePicture || "https://i.pravatar.cc/150"}
        alt={doctor.name}
        width={400}
        height={250}
        className="object-cover w-full h-56"
      />
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold">{doctor.name}</h2>
        <p className="text-gray-600">{doctor.specialization}</p>
        <p className="text-sm text-gray-500">Experience: {doctor.experience}</p>
        <p className="text-sm mt-1">
          Certificates: {doctor.certificates?.join(", ")}
        </p>
        <Button
          onClick={handleBookNow}
          className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
