import Hero from "../component/Hero";
import Product from "./Product";
import OurPolicy from "../component/OurPolicy";
import Footer from "../component/Footer";

function Home() {
  return (
    <main className="w-full overflow-x-hidden relative pt-[80px] md:pt-[90px]">
      <Hero />
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
