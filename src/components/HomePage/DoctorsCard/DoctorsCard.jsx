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
    <Card className="shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 w-64 md:w-56 lg:w-60 bg-white dark:bg-gray-800">
      {/* Full width doctor image */}
      <div className="relative w-full h-36">
        <Image
          src={doctor.profilePicture || "https://i.pravatar.cc/150"}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-3 text-center space-y-1">
        <h2 className="text-md font-semibold truncate text-gray-900 dark:text-gray-100">
          {doctor.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          {doctor.specialization}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Experience: {doctor.experience}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          Certificates: {doctor.certificates?.join(", ")}
        </p>

        {/* Button styled for light/dark mode */}
        <Button
          onClick={handleBookNow}
          className="mt-2 w-full py-1 rounded-md border transition text-sm
          bg-white text-green-600 border-green-600
          hover:bg-green-600 hover:text-white
          dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:bg-green-600"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
