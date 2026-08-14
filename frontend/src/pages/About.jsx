import React from "react";
import Title from "../component/Title";
import about from "../assets/back1.png";

function About() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8] py-24 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="text-center mb-12">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={about}
              alt="About PrakritiSparsh"
              className="w-[85%] sm:w-[70%] lg:w-[80%] rounded-2xl shadow-2xl object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Welcome to PrakritiSparsh 🌿
            </h2>

            <p className="text-white text-base md:text-lg leading-8 mb-5">
              <span className="font-semibold">PrakritiSparsh</span> is your trusted destination for authentic Ayurvedic and natural products, created to make healthy living simple, accessible, and convenient. We bring you a carefully selected range of quality products inspired by nature and Ayurveda, helping you make better choices for your everyday wellness.
            </p>

            <p className="text-white text-base md:text-lg leading-8 mb-5">
              Our mission is to provide a seamless shopping experience with quality products, secure payments, reliable delivery, and trusted service. From Ayurvedic wellness essentials to natural care products, we strive to bring you products that combine the goodness of nature with the wisdom of Ayurveda.
            </p>

            <p className="text-white text-base md:text-lg leading-8">
             At PrakritiSparsh, your satisfaction and well-being are our highest priorities. We continuously work to improve our products and services while building lasting trust with our customers. Discover the goodness of Ayurveda, embrace nature, and take a step towards a healthier lifestyle with PrakritiSparsh. 🌱
            </p>
          </div>

        </div>
        {/* WHY CHOOSE US */}
<div className="w-full flex items-center justify-center flex-col gap-8 mt-20 mb-10">
  <Title text1={"WHY"} text2={"CHOOSE US"} />

  <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8">

    {/* Card 1 */}
    <div className="lg:w-[30%] w-[90%] border border-gray-200 bg-[#ffffff10] backdrop-blur-sm rounded-lg px-8 py-8 text-white">
      <h3 className="text-2xl font-semibold text-[#bff1f9] mb-4">
        Quality Assurance 🌿
      </h3>
      <p className="text-[15px] leading-7">
        At PrakritiSparsh, we are committed to delivering quality, authentic, and reliable Ayurvedic and natural products. Every product is carefully selected and sourced from trusted suppliers to ensure purity, authenticity, effectiveness, and value for money. Your trust and satisfaction are at the heart of everything we do.
      </p>
    </div>

    {/* Card 2 */}
    <div className="lg:w-[30%] w-[90%] border border-gray-200 bg-[#ffffff10] backdrop-blur-sm rounded-lg px-8 py-8 text-white">
      <h3 className="text-2xl font-semibold text-[#bff1f9] mb-4">
        Convenience 🌿
      </h3>
      <p className="text-[15px] leading-7">
        Shop anytime, anywhere with PrakritiSparsh through our easy-to-use platform. Enjoy secure payment options, reliable delivery, and a seamless shopping experience that saves you time and brings authentic Ayurvedic and natural products right to your doorstep.
      </p>
    </div>

    {/* Card 3 */}
    <div className="lg:w-[30%] w-[90%] border border-gray-200 bg-[#ffffff10] backdrop-blur-sm rounded-lg px-8 py-8 text-white">
      <h3 className="text-2xl font-semibold text-[#bff1f9] mb-4">
        Exceptional Customer Service 🌿
      </h3>
      <p className="text-[15px] leading-7">
       At PrakritiSparsh, your satisfaction is our priority. Our dedicated support team is always ready to assist you with product questions, orders, payments, and returns. We believe in building lasting relationships through prompt, friendly, and reliable customer support at every step of your shopping journey.
      </p>
    </div>

  </div>
</div>
      </div>
    </section>
  );
}

export default About;