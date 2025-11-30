"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-coverflow";

import {
  getTrending,
  getImageUrl,
  formatRating,
  getTitle,
  getYear,
  getGenreNames,
  type TMDBMedia,
} from "@/services/tmdb";

const gradients = [
  "from-orange-500 to-amber-600",
  "from-red-500 to-orange-500",
  "from-blue-600 to-blue-800",
  "from-green-700 to-emerald-900",
  "from-pink-500 to-rose-600",
  "from-purple-600 to-indigo-800",
  "from-cyan-500 to-blue-600",
  "from-yellow-500 to-orange-600",
];

export default function MovieCarousel() {
  const [trending, setTrending] = useState<TMDBMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrending("all", "week");
        setTrending(data.results.slice(0, 10));
      } catch (error) {
        console.error("Erro ao buscar trending:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-bg-surface py-24">
        <div className="container relative z-10 mx-auto px-6">
          <div className="text-center">
            <p className="text-text-secondary text-xl">Carregando conteúdos em alta...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-bg-surface py-24">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)] opacity-5" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-bold text-4xl md:text-5xl">
            <span className="text-text-primary">Em Alta na</span>
            <span className="bg-linear-to-l from-color-primary to-color-primary-hover bg-clip-text text-transparent">
              {" "}
              Semana
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-text-secondary text-xl">
            Os filmes e séries mais populares do momento
          </p>
        </motion.div>

        {/* Carrossel com Swiper */}
        <div className="relative">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="pb-8!"
          >
            {trending.map((media, index) => (
              <SwiperSlide key={media.id} className="w-80!">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative cursor-pointer"
                >
                  {/* Card do filme */}
                  <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Imagem de backdrop */}
                    {media.backdrop_path ? (
                      <Image
                        src={getImageUrl(media.backdrop_path, "w780")}
                        alt={getTitle(media)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-linear-to-br ${gradients[index % gradients.length]}`} />
                    )}

                    {/* Overlay escuro */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

                    {/* Conteúdo */}
                    <div className="relative flex h-full flex-col justify-between p-6">
                      {/* Badge de ano e tipo */}
                      <div className="flex items-start justify-between">
                        <div className="flex gap-2">
                          <span className="rounded-full bg-white/20 px-3 py-1 font-semibold text-xs text-white uppercase backdrop-blur-sm">
                            {getYear(media)}
                          </span>
                          <span className="rounded-full bg-color-primary/80 px-3 py-1 font-semibold text-xs text-black uppercase backdrop-blur-sm">
                            {media.media_type === "movie" ? "Filme" : "Série"}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
                          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                          <span className="font-bold text-white">{formatRating(media.vote_average)}</span>
                        </div>
                      </div>

                      {/* Info do filme */}
                      <div>
                        <p className="mb-2 font-medium text-sm text-white/80">{getGenreNames(media.genre_ids)}</p>
                        <h3 className="mb-3 line-clamp-2 font-bold text-2xl text-white">{getTitle(media)}</h3>

                        {media.overview && (
                          <p className="mb-4 line-clamp-3 text-sm text-white/70">{media.overview}</p>
                        )}

                        {/* Barra de progresso */}
                        <div className="mb-4">
                          <div className="h-1 overflow-hidden rounded-full bg-white/20">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(media.vote_average / 10) * 100}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                              className="h-full rounded-full bg-color-primary"
                            />
                          </div>
                        </div>

                        {/* Botão de ação */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          className="w-full rounded-full bg-color-primary py-3 font-semibold text-color-on-primary transition-colors hover:bg-color-primary-hover"
                        >
                          Ver Detalhes
                        </motion.button>
                      </div>
                    </div>

                    {/* Efeito de brilho no hover */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                  </div>

                  {/* Sombra 3D */}
                  <div className="-z-10 absolute inset-0 translate-y-4 rounded-2xl bg-black/50 blur-2xl" />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

