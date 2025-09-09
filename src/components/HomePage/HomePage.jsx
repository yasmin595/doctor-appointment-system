import React from 'react'
import Banner from './Banner/Banner'
import HowItWorks from './HowItWorks/HowItWorks'
import PatientFeedback from './PatientFeedback/PatientFeedback'
import WhyDocNow from './WhyDocNow/WhyDocNow'
import FAQSection from './FAQSection/FAQSection'
import ContactUs from './ContactUs/ContactUs'

export default function HomePage() {

  return (
    <div className="flex flex-col">
      {/* Banner Section */}
      <section className="pb-16">
        <Banner />
      </section>

      {/* How It Works Section */}
      <section className=" bg-green-50 dark:bg-gray-900">
        <HowItWorks />
      </section>

       {/* PatientFeedback Section */}
      <section className="mt-16 bg-green-50 dark:bg-gray-900">
        <PatientFeedback/>
      </section>

       {/* WhyDocNow Section */}
      <section className="mt-16 bg-green-50 dark:bg-gray-900">
        <WhyDocNow/>
      </section>

      {/* FAQ Section */}
      <section className="mt-16 bg-green-50 dark:bg-gray-900">
        <FAQSection/>
      </section>

      {/* ContactUs Section */}
      <section className="mt-16 bg-green-50 dark:bg-gray-900">
        <ContactUs/>
      </section>
    </div>
  )
}
