import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import MovieCarousel from "@/components/landing/MovieCarousel";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { useMediaService } from "@/services/mediaService";

export default async function Home() {
  const trending = await useMediaService().getTrendingMedia();
  return (
    <main className="min-h-screen bg-on-primary-crx">
      <Navbar />
      <Hero trending={trending} />
      <Features />
      <MovieCarousel trending={trending} />
      <CTA />
      <Footer />
    </main>
  );
}
