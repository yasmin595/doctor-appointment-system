"use client";

import React from "react";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

 const contacts = [
    {
      icon: <Phone className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Call Us",
      info: "+880 1234 567 890",
      link: "tel:+8801234567890",
    },
    {
      icon: <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Email",
      info: "support@docnow.com",
      link: "mailto:support@docnow.com",
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Office",
      info: "123 Health Street, Dhaka, Bangladesh",
      link: "https://goo.gl/maps/your-office-location",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "WhatsApp",
      info: "+880 1987 654 321",
      link: "https://wa.me/8801987654321",
    },
  ];

export default function page() {
  return (
    <section className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100"
        >
          Get in Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
        >
          We are here to help! Reach us easily via phone, email, WhatsApp or visit our office.
        </motion.p>

        {/* Contact Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex justify-center"
            >
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-green-200 dark:border-green-800 p-6 text-center flex flex-col items-center gap-3 transition hover:shadow-2xl"
              >
                <div>{contact.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                  {contact.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{contact.info}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
