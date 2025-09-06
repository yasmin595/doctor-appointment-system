"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; 

const faqs = [
  {
    question: "What do we treat?",
    answer: "We provide consultations for general health, chronic conditions, mental health, and specialist services through trusted doctors.",
  },
  {
    question: "How does it work?",
    answer: "You can search for a doctor, book an appointment, and attend the consultation in-person at the clinic.",
  },
  {
    question: "Who provides consultation on DocNow?",
    answer: "Certified doctors registered on DocNow provide in-person consultations. You can view their qualifications and ratings before booking.",
  },
  {
    question: "Are the registered doctors verified?",
    answer: "Yes, all doctors are verified for credentials and licensure before being allowed to provide consultations on DocNow.",
  },
  {
    question: "When are the doctors available for consultation?",
    answer: "Doctor availability depends on their schedule. You can see each doctor’s available time slots and choose what fits you best.",
  },
  {
    question: "Can we select a doctor of our own choice?",
    answer: "Yes, you can choose any doctor from the list of registered doctors based on their specialty and availability.",
  },
  {
    question: "How much do I need to pay for the consultation?",
    answer: "Consultation fees vary by doctor. All fees are clearly displayed during the booking process.",
  },
  {
    question: "How do I make payment?",
    answer: "Payments can be made securely online using cards or mobile banking directly through DocNow.",
  },
  {
    question: "If I decide to cancel my consultation after making payment, how do I get a refund?",
    answer: "Refunds are handled according to our cancellation policy. You can request a refund via the app or by contacting support.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we store all your personal and medical data securely on our servers.",
  },
  {
    question: "Do I need to prepare anything before the consultation?",
    answer: "Bring relevant medical records, a list of medications, and any other information that will help the doctor understand your health condition.",
  },
  {
    question: "How do I get a prescription after consultation?",
    answer: "The doctor will provide a physical prescription during your in-person consultation.",
  },
  {
    question: "If my problem requires specialized treatment, what happens?",
    answer: "The doctor will refer you to the appropriate specialist or medical facility for further care.",
  },
  {
    question: "Can I get consultation if I am outside Bangladesh?",
    answer: "Currently, DocNow supports consultations only within Bangladesh.",
  },
  {
    question: "How can I manage my appointments?",
    answer: "You can view, reschedule, or cancel your upcoming appointments directly from your DocNow dashboard at any time.",
  },
  {
    question: "Can I book diagnostic tests through DocNow?",
    answer: "Yes, select diagnostic tests and lab services can be booked through DocNow depending on your location.",
  },
  {
    question: "What are the benefits of DocNow subscription packages?",
    answer: "Subscription packages offer discounted consultation fees, priority appointments, access to specialists, and additional healthcare services.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Have Any Questions?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Find below our frequently asked questions. If you have other questions please contact us.
        </p>

        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-gray-800 dark:text-white font-medium">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
