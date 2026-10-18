import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Programs from "@/components/sections/Programs";
import Calculator from "@/components/sections/Calculator";
import Schedule from "@/components/sections/Schedule";
import Trainers from "@/components/sections/Trainers";
import Plans from "@/components/sections/Plans";
import Results from "@/components/sections/Results";
import Facilities from "@/components/sections/Facilities";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Join from "@/components/sections/Join";
import Footer from "@/components/Footer";
import QuickActions from "@/components/QuickActions";
import Owner from "@/components/sections/Owner";

// Section order = page flow. Saara content data/content.json se aata hai.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Programs />
        <Calculator />
        <Schedule />
        <Owner/>
        <Trainers />
        <Plans />
        <Results />
        <Facilities />
        <Testimonials />
        <Faq />
        <Join />
      </main>
      <Footer />
      <QuickActions />
    </>
  );
}
