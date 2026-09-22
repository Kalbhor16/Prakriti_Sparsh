import React from "react";
import Title from "../component/Title";
import about from "../assets/back6.png";
import co_founder from "../assets/Co-founder.png";
import founder from "../assets/founder.png";

function About() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#ACC8A2] via-[#BBCCAD] to-[#D0E4C2] py-24 px-5">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={about}
              alt="About PrakritiSparsh"
              className="w-[85%] sm:w-[70%] lg:h-[550px] lg:w-[80%] rounded-2xl shadow-2xl object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Welcome to PrakrutiSparsha 🌿
            </h2>

            <p className="text-base md:text-lg leading-8 mb-5">
              <span className="font-semibold">PrakrutiSparsha</span> is your trusted destination for authentic Ayurvedic and natural products, created to make healthy living simple, accessible, and convenient. We bring you a carefully selected range of quality products inspired by nature and Ayurveda, helping you make better choices for your everyday wellness.
            </p>

            <p className="text-base md:text-lg leading-8 mb-5">
              Our mission is to provide a seamless shopping experience with quality products, secure payments, reliable delivery, and trusted service. From Ayurvedic wellness essentials to natural care products, we strive to bring you products that combine the goodness of nature with the wisdom of Ayurveda.
            </p>

            <p className="text-base md:text-lg leading-8">
             At PrakrutiSparsha, your satisfaction and well-being are our highest priorities. We continuously work to improve our products and services while building lasting trust with our customers. Discover the goodness of Ayurveda, embrace nature, and take a step towards a healthier lifestyle with PrakrutiSparsha. 🌱
            </p>
          </div>

        </div>

<div className="w-full flex items-center justify-center flex-col gap-8 mt-20 mb-10">
  <div className="w-full grid md:grid-cols-2 gap-6">
    <div className="rounded-2xl border border-white/30 bg-[#ffffff10] p-8 backdrop-blur-sm shadow-xl">
      <h3 className="text-2xl font-semibold text-[#214D39] mb-4">Vision</h3>
      <p className="text-[15px] leading-7 text-[#2D4638]">
        To build <span className="font-semibold">Prakruti Sparsha</span> into a trusted Indian
        Ayurveda and herbal wellness brand that combines traditional Ayurvedic knowledge with
        modern quality, responsible product development, professional branding, and convenient access.
      </p>
    </div>

    <div className="rounded-2xl border border-white/30 bg-[#ffffff10] p-8 backdrop-blur-sm shadow-xl">
      <h3 className="text-2xl font-semibold text-[#214D39] mb-4">Mission</h3>
      <p className="text-[15px] leading-7 text-[#2D4638]">
        To develop and market accessible, quality-focused Ayurvedic & herbal products while promoting
        responsible wellness education and creating a scalable Indian brand capable of serving domestic
        and international markets.
      </p>
    </div>
  </div>

  <Title text1={"MEET THE"} text2={"FOUNDERS"} />

  <div className="w-full grid gap-10">
    <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-10 items-center justify-center">
      <div className="flex justify-center">
        <div className="rounded-[2rem] border border-white/30 bg-[#ffffff15] p-3 shadow-2xl backdrop-blur-sm">
          <img
            src={co_founder}
            alt="Rushi Kalbhor"
            className="h-[360px] w-full max-w-[420px] rounded-[1.5rem] object-cover"
          />
        </div>
      </div>

      <div className="w-full rounded-2xl border border-white/30 bg-[#ffffff10] p-8 backdrop-blur-sm shadow-xl">
        <p className="inline-block rounded-full border border-[#2D5A3E] bg-[#EAF5E7] px-4 py-2 text-sm font-medium text-[#234A2E] mb-4">
          Co-Founder & Business/Marketing Lead
        </p>

        <h3 className="text-3xl md:text-4xl font-bold text-[#1F3D2E] mb-4">
          Rushi Kalbhor
        </h3>

        <p className="text-base md:text-lg leading-8 text-[#24412D] mb-6">
          Rushi Kalbhor is a BAMS student and entrepreneur with a vision to build a modern,
          trustworthy and accessible herbal wellness brand rooted in the principles of Ayurveda.
        </p>

        <p className="text-base md:text-lg leading-8 text-[#24412D] mb-6">
          At Prakruti Sparsha, he focuses on business development, brand strategy, digital marketing,
          product positioning, client relationships and online growth. His approach combines
          traditional Ayurvedic knowledge with modern branding and consumer-focused marketing.
        </p>

        <div className="mt-8">
          <h4 className="text-xl font-semibold text-[#214D39] mb-4">Focus Areas</h4>
          <ul className="grid sm:grid-cols-2 gap-3 text-[15px] text-[#2D4638]">
            <li className="rounded-lg bg-[#ffffff20] px-4 py-3 border border-[#CFE1CC]">Business Development</li>
            <li className="rounded-lg bg-[#ffffff20] px-4 py-3 border border-[#CFE1CC]">Brand & Marketing Strategy</li>
            <li className="rounded-lg bg-[#ffffff20] px-4 py-3 border border-[#CFE1CC]">Digital & Online Marketing</li>
            <li className="rounded-lg bg-[#ffffff20] px-4 py-3 border border-[#CFE1CC]">Product Development & Positioning</li>
            <li className="rounded-lg bg-[#ffffff20] px-4 py-3 border border-[#CFE1CC] sm:col-span-2">Client & Partner Relations</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-10 items-center justify-center">
      <div className="flex justify-center">
        <div className="rounded-[2rem] border border-white/30 bg-[#ffffff15] p-3 shadow-2xl backdrop-blur-sm">
          <img
            src={founder}
            alt="Founder"
            className="h-[360px] w-full max-w-[420px] rounded-[1.5rem] object-cover"
          />
        </div>
      </div>

      <div className="w-full rounded-2xl border border-white/30 bg-[#ffffff10] p-8 backdrop-blur-sm shadow-xl">
        <p className="inline-block rounded-full border border-[#2D5A3E] bg-[#EAF5E7] px-4 py-2 text-sm font-medium text-[#234A2E] mb-4">
          Founder & Wellness Vision Lead
        </p>

        <h3 className="text-3xl md:text-4xl font-bold text-[#1F3D2E] mb-4">
          Founder
        </h3>

        <p className="text-base md:text-lg leading-8 text-[#24412D] mb-6">
          The founding team is driven by a shared belief that Ayurveda should be practical,
          modern, and accessible for everyday life. Their focus is to build a brand that
          respects traditional wisdom while delivering honest, trustworthy, and quality-driven
          wellness products.
        </p>

        <p className="text-base md:text-lg leading-8 text-[#24412D] mb-6">
          With deep attention to natural wellness, ethical sourcing, and customer trust, the
          team works to create a long-term Ayurvedic brand that supports healthier lifestyles
          and strengthens India’s presence in the herbal wellness space.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-xl bg-[#F4F8F1] p-5 border border-[#D7E8D2]">
            <h4 className="text-xl font-semibold text-[#214D39] mb-2">Purpose</h4>
            <p className="text-[15px] leading-7 text-[#2D4638]">
              To bring together traditional herbal knowledge, responsible product design, and modern
              customer experience in one trusted wellness brand.
            </p>
          </div>

          <div className="rounded-xl bg-[#F4F8F1] p-5 border border-[#D7E8D2]">
            <h4 className="text-xl font-semibold text-[#214D39] mb-2">Approach</h4>
            <p className="text-[15px] leading-7 text-[#2D4638]">
              Quality-first sourcing, educational wellness guidance, and a strong commitment to building
              a modern and reliable Ayurveda-focused business.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="w-full flex items-center justify-center flex-col gap-8 mt-20 mb-10">
  <Title text1={"WHY"} text2={"CHOOSE US"} />

  <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8">
    <div className="lg:w-[30%] w-[90%] border border-black-200 bg-[#ffffff10] backdrop-blur-sm rounded-lg px-8 py-8">
      <h3 className="text-2xl font-semibold mb-4">
        Quality Assurance 🌿
      </h3>
      <p className="text-[15px] leading-7">
        At PrakrutiSparsha, we are committed to delivering quality, authentic, and reliable Ayurvedic and natural products. Every product is carefully selected and sourced from trusted suppliers to ensure purity, authenticity, effectiveness, and value for money. Your trust and satisfaction are at the heart of everything we do.
      </p>
    </div>
    <div className="lg:w-[30%] w-[90%] border border-black-200 bg-[#ffffff10] backdrop-blur-sm rounded-lg px-8 py-8">
      <h3 className="text-2xl font-semibold mb-4">
        Convenience 🌿
      </h3>
      <p className="text-[15px] leading-7">
        Shop anytime, anywhere with PrakritiSparsh through our easy-to-use platform. Enjoy secure payment options, reliable delivery, and a seamless shopping experience that saves you time and brings authentic Ayurvedic and natural products right to your doorstep.
      </p>
    </div>
    <div className="lg:w-[30%] w-[90%] border border-black-200 bg-[#ffffff10] backdrop-blur-sm rounded-lg px-8 py-8">
      <h3 className="text-2xl font-semibold mb-4">
        Exceptional Customer Service 🌿
      </h3>
      <p className="text-[15px] leading-7">
       At PrakrutiSparsha, your satisfaction is our priority. Our dedicated support team is always ready to assist you with product questions, orders, payments, and returns. We believe in building lasting relationships through prompt, friendly, and reliable customer support at every step of your shopping journey.
      </p>
    </div>

  </div>
</div>
      </div>
    </section>
  );
}

export default About;