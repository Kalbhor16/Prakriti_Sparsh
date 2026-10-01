import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import back1 from "../assets/back1.png";
import back2 from "../assets/back2.png";
import back3 from "../assets/back3.png";

const slides = [
  { image: back1 },
  { image: back2 },
  { image: back3 },
];

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const slide = slides[activeSlide];

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const showSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  return (
    <section
      aria-label="Featured wellness banners"
      aria-roledescription="carousel"
      className="relative aspect-[4/3] min-h-[300px] max-h-[500px] w-full overflow-hidden bg-[#E8F0E3] sm:aspect-[16/8] md:aspect-[16/7]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <img
        key={slide.image}
        src={slide.image}
        alt=""
        className="absolute inset-0 h-full w-full animate-hero-image-in object-cover object-center"
      />
      <button
        type="button"
        onClick={() => navigate("/collection")}
        className="absolute bottom-4 left-4 z-10 inline-flex min-h-11 items-center justify-center rounded-full bg-[#406F3A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#31572D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-6 sm:left-6"
      >
        Shop Now
      </button>
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 sm:bottom-6 sm:right-6">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => showSlide(activeSlide - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#20351E] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <FiChevronLeft aria-hidden="true" size={21} />
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2">
          {slides.map((item, index) => (
            <button
              key={item.image}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              onClick={() => showSlide(index)}
              className={`h-2 rounded-full transition-all ${activeSlide === index ? "w-5 bg-[#406F3A]" : "w-2 bg-[#A8B7A3] hover:bg-[#71866B]"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => showSlide(activeSlide + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#20351E] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <FiChevronRight aria-hidden="true" size={21} />
        </button>
      </div>
    </section>
  );
}

export default Hero