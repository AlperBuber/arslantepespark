import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import WhyMalatya from "@/components/site/WhyMalatya";
import Goals from "@/components/site/Goals";
import WhoCanApply from "@/components/site/WhoCanApply";
import Journey from "@/components/site/Journey";
import Modules from "@/components/site/Modules";
import Mentors from "@/components/site/Mentors";
import Timeline from "@/components/site/Timeline";
import Supporters from "@/components/site/Supporters";
import FAQ from "@/components/site/FAQ";
import ContactFooter from "@/components/site/ContactFooter";

export default function Index() {
  return (
    <main className="bg-background">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-charcoal focus:text-ivory focus:rounded-md">İçeriğe atla</a>
      <Navbar />
      <Hero />
      <About />
      <WhyMalatya />
      <Goals />
      <WhoCanApply />
      <Journey />
      <Modules />
      <Mentors />
      <Timeline />
      <Supporters />
      <FAQ />
      <ContactFooter />
    </main>
  );
}
