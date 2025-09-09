"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Stethoscope,
  Video,
  HeartPulse,
  Syringe,
  UserRound,
  Truck,
  FlaskRound,
  FileText,
  Ambulance,
  Activity,
} from "lucide-react";

 const services = [
    {
      icon: <CalendarCheck className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Easy Appointment",
      desc: "Book appointments with your preferred doctor in just a few clicks.",
    },
    {
      icon: <Stethoscope className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Specialist Doctors",
      desc: "Get access to certified specialists across multiple departments.",
    },
    {
      icon: <Video className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Video Consultation",
      desc: "Consult with doctors online from the comfort of your home.",
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Health Checkups",
      desc: "Comprehensive health checkup packages at affordable prices.",
    },
    {
      icon: <Syringe className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Vaccination",
      desc: "Book vaccinations for yourself and your family with ease.",
    },
    {
      icon: <UserRound className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "24/7 Support",
      desc: "Our support team is available round-the-clock for your queries.",
    },
    
    {
      icon: <Truck className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Medicine Delivery",
      desc: "Order prescribed medicines and get them delivered at your doorstep.",
    },
    {
      icon: <FlaskRound className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Lab Test Booking",
      desc: "Schedule diagnostic tests online and get home sample collection.",
    },
    {
      icon: <FileText className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Digital Health Records",
      desc: "Securely store and access your health records anytime, anywhere.",
    },
    {
      icon: <Ambulance className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Emergency Care",
      desc: "Instant access to ambulance services and urgent doctor care.",
    },
    {
      icon: <Activity className="h-10 w-10 text-green-600 dark:text-green-400" />,
      title: "Wellness Programs",
      desc: "Personalized diet, fitness, and lifestyle plans for better health.",
    },
  ];


export default function page() {
  return (
      <section className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100"
        >
          Our Services
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300"
        >
          We go beyond doctor appointments to ensure you and your family get
          complete healthcare solutions, anytime, anywhere.
        </motion.p>

        {/* Service Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-sm shadow-lg rounded-2xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 p-6 text-center">
                <div className="flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mt-4">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
