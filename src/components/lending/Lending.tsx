import type { TMDBMedia } from "@/types/tmdb";

import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import Features from "./_components/features";
import Hero from "./_components/hero";
import MovieCarousel from "./_components/movie-carousel";
import CTA from "./_components/cta";

export default function LendingPage({ trending }: { trending: TMDBMedia[] }) {
  return (
    <main
      className="min-h-screen bg-on-primary-crx overflow-x-hidden"
      style={{ userSelect: "none" }}
    >
      <Navbar />
      <Hero trending={trending} />
      <Features />
      <MovieCarousel trending={trending} />
      <CTA />
      <Footer />
    </main>
  );
}
