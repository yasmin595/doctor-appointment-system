"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-16 bg-green-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Have Any Questions?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
          Find below our frequently asked questions. If you have other questions please contact us.
        </p>

        <Accordion type="single" collapsible className="max-w-4xl mx-auto space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>What do we treat?</AccordionTrigger>
            <AccordionContent>
              We provide consultations for general health, chronic conditions, mental health, and
              specialist services through trusted doctors.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>
              You can search for a doctor, book an appointment, and attend the consultation
              in-person at the clinic.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Who provides consultation on DocNow?</AccordionTrigger>
            <AccordionContent>
              Certified doctors registered on DocNow provide in-person consultations. You can view
              their qualifications and ratings before booking.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Are the registered doctors verified?</AccordionTrigger>
            <AccordionContent>
              Yes, all doctors are verified for credentials and licensure before being allowed to
              provide consultations on DocNow.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>When are the doctors available for consultation?</AccordionTrigger>
            <AccordionContent>
              Doctor availability depends on their schedule. You can see each doctor’s available time
              slots and choose what fits you best.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>Can we select a doctor of our own choice?</AccordionTrigger>
            <AccordionContent>
              Yes, you can choose any doctor from the list of registered doctors based on their
              specialty and availability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>How much do I need to pay for the consultation?</AccordionTrigger>
            <AccordionContent>
              Consultation fees vary by doctor. All fees are clearly displayed during the booking
              process.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>How do I make payment?</AccordionTrigger>
            <AccordionContent>
              Payments can be made securely online using cards or mobile banking directly through
              DocNow.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>
              If I decide to cancel my consultation after making payment, how do I get a refund?
            </AccordionTrigger>
            <AccordionContent>
              Refunds are handled according to our cancellation policy. You can request a refund via
              the app or by contacting support.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>Is my data secure?</AccordionTrigger>
            <AccordionContent>
              Yes, we store all your personal and medical data securely on our servers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger>Do I need to prepare anything before the consultation?</AccordionTrigger>
            <AccordionContent>
              Bring relevant medical records, a list of medications, and any other information that
              will help the doctor understand your health condition.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger>How do I get a prescription after consultation?</AccordionTrigger>
            <AccordionContent>
              The doctor will provide a physical prescription during your in-person consultation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-13">
            <AccordionTrigger>If my problem requires specialized treatment, what happens?</AccordionTrigger>
            <AccordionContent>
              The doctor will refer you to the appropriate specialist or medical facility for further
              care.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-14">
            <AccordionTrigger>Can I get consultation if I am outside Bangladesh?</AccordionTrigger>
            <AccordionContent>
              Currently, DocNow supports consultations only within Bangladesh.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-15">
            <AccordionTrigger>How can I manage my appointments?</AccordionTrigger>
            <AccordionContent>
              You can view, reschedule, or cancel your upcoming appointments directly from your
              DocNow dashboard at any time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-16">
            <AccordionTrigger>Can I book diagnostic tests through DocNow?</AccordionTrigger>
            <AccordionContent>
              Yes, select diagnostic tests and lab services can be booked through DocNow depending on
              your location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-17">
            <AccordionTrigger>What are the benefits of DocNow subscription packages?</AccordionTrigger>
            <AccordionContent>
              Subscription packages offer discounted consultation fees, priority appointments, access
              to specialists, and additional healthcare services.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
