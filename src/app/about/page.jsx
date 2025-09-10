"use client";
import React from "react";
import { motion } from "framer-motion";
import { Stethoscope, Users, HeartPulse } from "lucide-react";

export default function Page() {
  return (
    <section className="min-h-screen flex items-center bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-20 py-16">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-100"
        >
          About Our DocNow 
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-center text-gray-600 dark:text-gray-300"
        >
          We provide a trusted platform where patients can easily connect with
          doctors, book appointments, and receive quality healthcare anytime,
          anywhere.
        </motion.p>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Mission */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
            <div className="w-full max-w-sm shadow-lg rounded-2xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 p-6 text-center">
              <Stethoscope className="mx-auto h-10 w-10 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mt-4">
                Our Mission
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                To make healthcare accessible and convenient by connecting
                patients with certified doctors through a seamless online
                system.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
            <div className="w-full max-w-sm shadow-lg rounded-2xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 p-6 text-center">
              <HeartPulse className="mx-auto h-10 w-10 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mt-4">
                Our Vision
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                To build a healthier community where technology ensures timely
                medical support and patient well-being.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
            <div className="w-full max-w-sm shadow-lg rounded-2xl border border-green-200 dark:border-green-800 bg-white dark:bg-gray-800 p-6 text-center">
              <Users className="mx-auto h-10 w-10 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mt-4">
                Our Values
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Patient care, trust, and excellence drive every service we
                provide in our appointment system.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
