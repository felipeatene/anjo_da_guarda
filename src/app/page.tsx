import { Catalog } from "@/components/landing/catalog";
import { CtaSection, Footer } from "@/components/landing/cta-footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Navbar } from "@/components/landing/navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Catalog />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
