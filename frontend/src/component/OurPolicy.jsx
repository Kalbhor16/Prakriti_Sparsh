import React from "react";
import Title from "./Title";
import { RiExchangeFundsFill } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8]">
      {/* Heading */}
      <div className="text-center mb-14 px-5">
        <Title text1={"OUR"} text2={"POLICY"} />

        <p className="mt-4 text-sm md:text-xl text-blue-100 max-w-3xl mx-auto">
          Customer-Friendly Policies – Committed to Your Satisfaction and
          Safety.
        </p>
      </div>

      {/* Policy Cards */}
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Card 1 */}
        <div className="flex flex-col items-center text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:scale-105 duration-300">
          <RiExchangeFundsFill className="w-12 h-12 md:w-16 md:h-16 text-[#90b9ff]" />

          <h3 className="mt-4 text-xl md:text-2xl font-semibold text-[#a5e8f7]">
            Easy Exchange Policy
          </h3>

          <p className="mt-2 text-sm md:text-base text-white">
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col items-center text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:scale-105 duration-300">
          <TbRosetteDiscountCheckFilled className="w-12 h-12 md:w-16 md:h-16 text-[#90b9ff]" />

          <h3 className="mt-4 text-xl md:text-2xl font-semibold text-[#a5e8f7]">
            7 Days Return Policy
          </h3>

          <p className="mt-2 text-sm md:text-base text-white">
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center text-center bg-white/10 rounded-xl p-6 backdrop-blur-sm hover:scale-105 duration-300">
          <BiSupport className="w-12 h-12 md:w-16 md:h-16 text-[#90b9ff]" />

          <h3 className="mt-4 text-xl md:text-2xl font-semibold text-[#a5e8f7]">
            Best Customer Support
          </h3>

          <p className="mt-2 text-sm md:text-base text-white">
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>

      </div>
    </section>
  );
}

export default OurPolicy;