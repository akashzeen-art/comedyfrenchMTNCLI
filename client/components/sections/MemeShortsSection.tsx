import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { Video } from "@/data/videos";
import VideoAccessButton from "@/components/VideoAccessButton";

gsap.registerPlugin(ScrollTrigger);

interface MemeShortsProps {
  videos: Video[];
}

export default function MemeShortsSection({ videos }: MemeShortsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<any>(".meme-card").forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: idx * 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const emojis = ["😂", "🤣", "🔥", "✨", "💯", "🎭", "🎪", "🎨"];

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-pink-300 to-cyan-300 rounded-full blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="meme-title mb-12"
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Express Mème Mania
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-xl">
            Du chaos en format court, des montages viraux et des fous rires instantanés pour un défilement sans fin.
          </p>
        </motion.div>

        {/* Landscape Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              className="meme-card group"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <VideoAccessButton video={video} className="cursor-pointer block w-full">
                <motion.div
                  className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer"
                  whileHover={{ rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-400 to-cyan-400 rounded-2xl p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-full bg-white rounded-2xl" />
                  </div>

                  {/* Image */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-between p-4">
                    <div className="text-right">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="inline-block text-4xl"
                      >
                        {emojis[idx % emojis.length]}
                      </motion.span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white font-bold text-sm line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center justify-between text-white text-xs">
                        <span className="px-2 py-1 bg-pink-500 rounded-full">
                          {video.category}
                        </span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: -1 }}
                      className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 transition-all"
                    >
                      <Play className="w-6 h-6 text-black group-hover:text-white ml-1" fill="currentColor" />
                    </motion.div>
                  </motion.div>

                  {/* Sticker Overlay */}
                  <motion.div
                    initial={{ rotate: -20, opacity: 0 }}
                    whileHover={{ rotate: 0, opacity: 1 }}
                    className="absolute top-4 right-4 text-3xl"
                  >
                    {emojis[(idx + 1) % emojis.length]}
                  </motion.div>
                </motion.div>
              </VideoAccessButton>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
