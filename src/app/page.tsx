import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import MovieCarousel from "@/components/landing/MovieCarousel";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-body">
      <Hero />
      <Features />
      <MovieCarousel />
      <CTA />
      <Footer />
    </main>
  );
}
