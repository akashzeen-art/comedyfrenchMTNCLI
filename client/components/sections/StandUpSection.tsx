import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Star } from "lucide-react";
import { Video } from "@/data/videos";
import VideoAccessButton from "@/components/VideoAccessButton";

gsap.registerPlugin(ScrollTrigger);

interface StandUpSectionProps {
  videos: Video[];
}

export default function StandUpSection({ videos }: StandUpSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Particle animation
      gsap.to(".particle", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 2,
        },
        y: -100,
        opacity: 0,
        stagger: 0.05,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredVideo = videos[0];
  const otherVideos = videos.slice(1, 4);

  return (
    <div
      ref={sectionRef}
      className="relative w-full py-20 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-900 overflow-hidden"
    >
      {/* Animated Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="particle absolute w-2 h-2 bg-purple-400 rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: -200,
            opacity: 0,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: -1,
            repeatDelay: 2,
          }}
        />
      ))}

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
      </div>

      {/* Glassmorphism Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 backdrop-blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="standup-title mb-12"
        >
          <h2 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Légendes du Micro
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-xl">
            Des performances de scène par des comédiens qui savent exactement comment captiver une salle.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Card - Takes 2 Columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <VideoAccessButton video={featuredVideo} className="cursor-pointer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative h-96 rounded-3xl overflow-hidden"
              >
                {/* Glassmorphism Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full bg-slate-900/80 backdrop-blur rounded-3xl" />
                </div>

                {/* Image */}
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex flex-col justify-between p-8">
                  <div className="text-right">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/50 backdrop-blur rounded-full text-white"
                    >
                      <Star className="w-4 h-4 fill-current" />
                      En Vedette
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm text-purple-200">
                      {featuredVideo.comedian}
                    </p>
                    <h3 className="text-2xl font-bold text-white">
                      {featuredVideo.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <span className="px-3 py-1 bg-pink-500/50 rounded-full">
                        {featuredVideo.category}
                      </span>
                      <span>{featuredVideo.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center rounded-3xl"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: -1 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 transition-all"
                  >
                    <Play className="w-8 h-8 text-black group-hover:text-white ml-1" fill="currentColor" />
                  </motion.div>
                </motion.div>

                {/* Neon Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:to-cyan-500/20 rounded-3xl transition-all duration-300" />
              </motion.div>
            </VideoAccessButton>
          </motion.div>

          {/* Side Cards */}
          <div className="space-y-6">
            {otherVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                <VideoAccessButton video={video} className="cursor-pointer">
                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="group relative h-48 rounded-2xl overflow-hidden flex items-end"
                  >
                    {/* Image */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80 group-hover:opacity-100 transition-opacity rounded-2xl" />

                    {/* Content */}
                    <div className="relative w-full p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs"
                        >
                          {idx + 1}
                        </motion.div>
                        <span className="text-xs text-purple-200">
                          {video.comedian}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                        {video.title}
                      </h3>
                    </div>

                    {/* Play Icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-pink-500 group-hover:text-white transition-all"
                    >
                      <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                </VideoAccessButton>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
