import React from "react";
import Title from "../component/Title";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const contactDetails = [
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    value: "Pune, Maharashtra, India",
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    value: "+91 9699602526",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "support@prakritisparsh.com",
  },
  {
    icon: FaClock,
    label: "Working Hours",
    value: "Mon - Sat, 9:00 AM - 7:00 PM",
  },
];

function Contact() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#fdf7fb] py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-br from-[#ffe9f4] via-[#ffd6eb] to-[#dbe9ff] opacity-90" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Title text1={"CONTACT"} text2={"US"} />
          <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-600">
            Have a question, feedback, or an order request? Share your message and our team will get back to you shortly.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white/95 p-8 shadow-[0_28px_80px_rgba(244,62,173,0.12)] ring-1 ring-white/80 backdrop-blur-xl">
            <div className="mb-8 rounded-[1.75rem] bg-[#fff0f8] p-6 shadow-sm">
              <h2 className="text-3xl font-semibold text-slate-900">Get in Touch</h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600">
                Reach out for support, wholesale requests, or general inquiries. We are here to help you with everything you need.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f83ead] to-[#ff8fd2] text-white shadow-lg">
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{item.label}</h3>
                        <p className="mt-2 text-sm text-slate-600">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-950/95 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.24)] ring-1 ring-white/10 backdrop-blur-xl text-white">
            <h2 className="text-3xl font-semibold text-[#ffd5ef] mb-6">Send a Message</h2>
            <p className="mb-8 text-sm text-slate-300">
              Fill out the form and we'll respond within 24 hours.
            </p>

            <form className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Your Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition focus:border-[#f83ead] focus:ring-2 focus:ring-[#f83ead]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Your Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition focus:border-[#f83ead] focus:ring-2 focus:ring-[#f83ead]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Subject</span>
                <input
                  type="text"
                  placeholder="Enter a subject"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition focus:border-[#f83ead] focus:ring-2 focus:ring-[#f83ead]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">Message</span>
                <textarea
                  rows="5"
                  placeholder="Write your message"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-white outline-none transition focus:border-[#f83ead] focus:ring-2 focus:ring-[#f83ead]/20 resize-none"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#f83ead] to-[#ff8fd2] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#f83ead]/25 transition duration-300 hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
