import React, { useEffect, useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import Footer from '../component/Footer';
function Home() {
  let heroData = [
    { text1: "Nature's Touch", text2: "Wellness You Can Trust" },
    { text1: "Discover Natural Wellness", text2: "Pure Ayurveda, Inspired by Nature" },
    { text1: "Discover Nature's Best", text2: "Shop Our Collection" },
    { text1: "Pure Ayurveda for You", text2: "Explore Now" },
    { text1: "Wellness Starts with Nature", text2: "Shop Now!" }
  ]
  let [heroCount, setHeroCount] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 4 ? 0 : prevCount + 1))
    }, 3000/*3000 milisecond =3 second */)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className='overflow-x-hidden relative top-[100px]'>
      <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-r from-[#FF57B9] via-[#FF8FD2] to-[#FFC9E8]'>
        <Background heroCount={heroCount} />
        <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]}
        />
      </div>
      <Product />
      <OurPolicy />
      <Footer />
    </div>
  )
}

export default Home