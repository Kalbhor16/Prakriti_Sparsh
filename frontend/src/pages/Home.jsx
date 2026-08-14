import React, { useEffect, useState } from "react";
import Background from "../component/Background";
import Hero from "../component/Hero";
import Product from "./Product";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import { shopDataContext } from "../context/ShopContext";
import OurPolicy from "../component/OurPolicy";
import Footer from "../component/Footer";

function Home() {
  const heroData = [
    {
      text1: "Nature's Touch",
      text2: "Wellness You Can Trust",
    },
    {
      text1: "Discover Natural Wellness",
      text2: "Pure Ayurveda, Inspired by Nature",
    },
    {
      text1: "Discover Nature's Best",
      text2: "Shop Our Collection",
    },
    {
      text1: "Pure Ayurveda for You",
      text2: "Explore Now",
    },
    {
      text1: "Wellness Starts with Nature",
      text2: "Shop Now!",
    },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) =>
        prevCount === heroData.length - 1 ? 0 : prevCount + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full overflow-x-hidden relative pt-[80px] md:pt-[90px]">
      <section className="relative w-full min-h-[520px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[calc(100vh-90px)] overflow-hidden bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8]"
      >
        <div className="absolute inset-0">
          <Background heroCount={heroCount} />
        </div>
        <div className="relative z-10 w-full h-full">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>
        <div
          className="absolute bottom-6 left-1/2-translate-x-1/2 z-20 flex items-center gap-2"
        >
        </div>
      </section>
      <section className="w-full bg-white  ">
        <Product />
      </section>
      <section className="w-full bg-[#fff7fb] ">
        <OurPolicy />
      </section>
      <footer className="w-full">
        <Footer />
      </footer>

    </main>
  );
}

export default Home;
