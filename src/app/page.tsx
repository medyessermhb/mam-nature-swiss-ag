import Hero from '@/components/home/Hero';
import PerfectSystem from '@/components/home/PerfectSystem';
import WaterCartridge from '@/components/home/WaterCartridge';
import Dynamizer from '@/components/home/Dynamizer';
import WaterLime from '@/components/home/WaterLime';
import ParticleFilter from '@/components/home/ParticleFilter';
import ProductsGrid from '@/components/home/ProductsGrid';
import HomeSidebar from '@/components/home/HomeSidebar'; // Import the Sidebar

export default function Home() {
  return (
    <main className="w-full relative bg-white">
      {/* The Sidebar Component */}
      <HomeSidebar />

      {/* 1. HERO SECTION (Sidebar checks this ID to know when to appear) */}
      <div id="hero-section">
        <Hero />
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      {/* 'lg:pl-[180px]' pushes content to the right on Desktop only */}
      <div className="w-full lg:pl-[180px] transition-all duration-300">

        {/* IDs must match the 'LINKS' array in HomeSidebar.tsx */}

        <section id="comparison">
          <PerfectSystem />
        </section>

        <section id="water-lime">
          <WaterCartridge />
        </section>

        <section id="dynamizer">
          <Dynamizer />
        </section>

        <section id="shower">
          <WaterLime />
        </section>

        <section id="particles-filter">
          <ParticleFilter />
        </section>

        <section id="products">
          <ProductsGrid />
        </section>

        {/* If you have a reviews component, uncomment this */}
        {/* <section id="reviews">
           <Reviews /> 
        </section> */}

      </div>
    </main>
  );
}