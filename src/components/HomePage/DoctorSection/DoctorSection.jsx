"use client";

import { useEffect, useState } from "react";
import DoctorsCard from "../DoctorsCard/DoctorsCard";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
  >
    <ChevronRightIcon className="w-5 h-5" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
  >
    <ChevronLeftIcon className="w-5 h-5" />
  </button>
);

export default function DoctorSection() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/all-doctor");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const settings = {
    dots: true,
    infinite: doctors.length > 4,
    speed: 500,
    slidesToShow: 4,  // Large screen
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024, // lg/md
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,  // sm
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,  // xs
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto p-6 relative">
      {/* Heading with motion */}
      <motion.h1
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Doctors
      </motion.h1>

      {doctors.length > 0 ? (
        <Slider {...settings}>
          {doctors.map((doc) => (
            <div key={doc._id} className="px-2">
              <DoctorsCard doctor={doc} />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No doctors found
        </p>
      )}
    </section> 
    
  );
}
