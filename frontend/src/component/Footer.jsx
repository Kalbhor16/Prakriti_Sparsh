import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full bg-[#FFC9E8] ">
      <div className="max-w-7xl mx-auto px-5 md:px-12 py-8 md:py-10 flex flex-col md:flex-row justify-between gap-10">

        {/* Left Section */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
            />

            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              PrakritiSparsh
            </h2>
          </div>

          <p className="hidden md:block text-gray-700 text-base leading-7">
            PrakritiSparsh is your trusted destination for authentic Ayurvedic and natural products, offering quality, convenience, and great value. Discover products inspired by nature, carefully selected to support a healthier and more balanced lifestyle. 🌿.
          </p>

          <p className="md:hidden text-gray-700 text-sm">
            Fast. Easy. Reliable. PrakritiSparsh Shopping.
          </p>
        </div>

        {/* Company Section */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">COMPANY</h3>

          <ul className="space-y-2 text-gray-700">
            <li className="cursor-pointer hover:text-black transition">
              Home
            </li>
            <li className="cursor-pointer hover:text-black transition">
              About Us
            </li>
            <li className="cursor-pointer hover:text-black transition">
              Delivery
            </li>
            <li className="cursor-pointer hover:text-black transition">
              Privacy Policy
            </li>
          </ul>
        </div>
         <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">GET IN TOUCH</h3>

          <ul className="space-y-2 text-gray-700">
            <li className="cursor-pointer hover:text-black transition">
              +91-9699602526
            </li>
            <li className="cursor-pointer hover:text-black transition">
              contact@prakritisparsh.com
            </li>
            <li className="cursor-pointer hover:text-black transition">
              +91-9699602526
            </li>
            <li className="cursor-pointer hover:text-black transition">
              admin@prakritisparsh.com
            </li>
          </ul>
        </div>


      </div>

      {/* Bottom */}
      <div className="border-t border-pink-300 py-4 text-center text-sm text-gray-700">
        © 2026 PrakritiSparsh. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;