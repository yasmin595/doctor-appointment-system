
import React from "react";

import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      {/* Page Title */}
      {/* <h1 className="text-3xl font-bold text-center my-8 text-gray-800">
        Register
      </h1> */}

      {/* Main Section */}
      <section className="container mx-auto grid grid-cols-12 gap-6 px-4 md:px-8">
        {/* Left Section (Image) */}
        {/* <div className="col-span-12 md:col-span-6 flex justify-center items-center">
          <Image
            className="hidden md:block"
            src="/assets/images/login/login.svg"
            width={460}
            height={500}
            alt="Authentication Image"
          />
        </div> */}

        {/* Right Section (Form) */}
        <div className="col-span-12 md:col-span-6 flex justify-center items-center">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
