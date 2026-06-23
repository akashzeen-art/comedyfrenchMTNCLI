import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Play, Clock } from "lucide-react";
import { Video } from "@/data/videos";
import VideoAccessButton from "@/components/VideoAccessButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

interface TrendingSectionProps {
  videos: Video[];
}

export default function TrendingSection({ videos }: TrendingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<any>(".trending-card").forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: idx * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="trending-title mb-12"
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="text-white">Rires </span>
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              En Feu
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-xl">
            Les vidéos les plus regardées — les meilleures blagues, les tendances virales et les comédies inévitables.
          </p>
        </motion.div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: ".trending-next",
            prevEl: ".trending-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="trending-swiper"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <motion.div className="trending-card h-full">
                <VideoAccessButton video={video} className="cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    {/* Gradient Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-full w-full bg-slate-900 rounded-2xl" />
                    </div>

                    {/* Image */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="w-full space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                            {video.category}
                          </span>
                          <div className="flex items-center gap-1 text-white text-sm">
                            <Clock className="w-4 h-4" />
                            {video.duration}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Play Button */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center rounded-2xl"
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-pink-500 transition-colors">
                        <Play className="w-8 h-8 text-black group-hover:text-white ml-1" fill="currentColor" />
                      </div>
                    </motion.div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/0 to-cyan-500/0 group-hover:from-pink-500/20 group-hover:to-cyan-500/20 rounded-2xl transition-all duration-300" />
                  </motion.div>
                </VideoAccessButton>

                {/* Card Info */}
                <div className="mt-4 space-y-2">
                  <VideoAccessButton video={video} className="cursor-pointer">
                    <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all line-clamp-2">
                      {video.title}
                    </h3>
                  </VideoAccessButton>
                  <p className="text-sm text-gray-400">{video.comedian}</p>

                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </div>
  );
}
