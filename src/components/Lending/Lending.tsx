import { TMDBMedia } from "@/types/tmdb";
import CTA from "./CTA";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import MovieCarousel from "./MovieCarousel";
import Navbar from "./Navbar";

export default function LendingPage({ trending }: { trending: TMDBMedia[] }) {
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
