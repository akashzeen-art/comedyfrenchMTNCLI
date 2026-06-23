import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MessageCircle, Share2, Play } from "lucide-react";
import { Video } from "@/data/videos";
import VideoAccessButton from "@/components/VideoAccessButton";

gsap.registerPlugin(ScrollTrigger);

interface ReelsSectionProps {
  videos: Video[];
}

export default function ReelsSection({ videos }: ReelsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // reserved for future scroll animations
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="reels-title mb-12 text-center"
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Boucles de Rires à Swiper
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Du fun rapide fait pour faire défiler, rejouer et partager instantanément.
          </p>
        </motion.div>

        {/* Landscape Swiper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group"
            >
              <VideoAccessButton video={video} className="cursor-pointer block w-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full aspect-video rounded-3xl overflow-hidden"
                >
                  {/* Modern Shadow */}
                  <div className="absolute inset-0 shadow-2xl rounded-3xl group-hover:shadow-2xl group-hover:shadow-purple-300/50 transition-shadow duration-300" />

                  {/* Image */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-3xl"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60 group-hover:opacity-70 transition-opacity rounded-3xl" />

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                    {/* User Info */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        {video.comedian[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white line-clamp-1">
                          {video.comedian}
                        </p>
                        <p className="text-xs text-gray-300">
                          {video.category}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-white line-clamp-2">
                      {video.title}
                    </h3>

                    {/* Reaction Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-xs hover:text-pink-400 transition-colors"
                      >
                        <Heart className="w-4 h-4" fill="currentColor" />
                        <span>J'aime</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-xs hover:text-blue-400 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 text-xs hover:text-cyan-400 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Play Button */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center rounded-3xl"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: -1 }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-600 transition-all"
                    >
                      <Play className="w-7 h-7 text-gray-900 group-hover:text-white ml-1" fill="currentColor" />
                    </motion.div>
                  </motion.div>

                  {/* Floating Particles on Hover */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      animate={{ x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
                      transition={{ duration: 1 + Math.random() * 0.5 }}
                      className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full pointer-events-none"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                    />
                  ))}
                </motion.div>
              </VideoAccessButton>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
