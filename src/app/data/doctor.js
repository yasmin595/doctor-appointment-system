export const doctors = [
  {
    id: 1,
    name: "Dr. Ahsan Habib",
    email: "ahsan@example.com",
    phone: "017XXXXXXXX",
    specialization: "Cardiologist",
    bio: "Experienced cardiologist with 10 years in Dhaka Medical.",
    location: "Rangpur Medical College",
    experience: "10 years",
    consultationFee: 800,
    rating: 4.5,
    profilePicture: "/doctor1.png",
    certificates: [],
    availability: {
      Monday: ["10:00 AM - 12:00 PM", "4:00 PM - 6:00 PM"],
      Wednesday: ["10:00 AM - 12:00 PM", "4:00 PM - 6:00 PM"],
      Friday: ["10:00 AM - 12:00 PM", "4:00 PM - 6:00 PM"],
    },
    appointments: [
       {
      id: 101,
      patientName: "Munna Rahman",
      date: "2025-09-10",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 102,
      patientName: "Nusrat Jahan",
      date: "2025-09-11",
      time: "4:00 PM",
      status: "pending",
    },
    ]
  }
];
