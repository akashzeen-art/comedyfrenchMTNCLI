import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Zap } from "lucide-react";
import { videos } from "@/data/videos";
import { useSubscription } from "@/context/SubscriptionContext";

interface HeroSectionProps {
  scrollY: number;
}

const FEATURED_IDS = ["1", "4", "6", "13", "21", "46", "34", "50", "28", "39"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroSection({ scrollY }: HeroSectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const featuredVideos = useMemo(() => shuffle(videos.filter((v) => FEATURED_IDS.includes(v.id))).slice(0, 6), []);
  const active = featuredVideos[activeIdx];
  const { requestPlay, accountQuery } = useSubscription();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % featuredVideos.length);
    }, 4000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-950">
      {/* Background image with parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={active.thumbnail}
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/40" />
        </motion.div>
      </AnimatePresence>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full pt-24 pb-16">

          {/* Left */}
          <div className="space-y-8">
            {/* Category badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-badge"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                {active.category} · Tendance Maintenant
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight"
              >
                <span className="text-white block">Votre Dose Quotidienne de</span>
                <span className="block bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Comédie Chaos
                </span>
              </motion.h1>
            </div>

            {/* Active video title */}
            <AnimatePresence mode="wait">
              <motion.p
                key={active.id + "-title"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-gray-300 text-lg max-w-md leading-relaxed"
              >
                Now featuring: <span className="text-white font-semibold">{active.title}</span>
                <span className="text-gray-400"> par {active.comedian}</span>
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => requestPlay(active)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-full flex items-center gap-3 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 ml-0.5" fill="white" />
                </div>
                Regarder Maintenant
              </motion.button>

              <Link to={`/categories${accountQuery}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 text-white font-bold rounded-full flex items-center gap-2 hover:bg-white/20 transition-all"
                >
                  <Zap className="w-5 h-5 text-orange-400" />
                  Tout Parcourir
                </motion.button>
              </Link>
            </motion.div>

          </div>

          {/* Right — thumbnail strip */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hidden lg:flex flex-col gap-3"
          >
            {featuredVideos.map((v, idx) => (
              <motion.div
                key={v.id}
                onClick={() => setActiveIdx(idx)}
                whileHover={{ x: 8 }}
                className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${
                  idx === activeIdx
                    ? "bg-white/15 border border-white/30"
                    : "bg-white/5 border border-transparent hover:bg-white/10"
                }`}
              >
                <div className="relative w-24 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                  {idx === activeIdx && (
                    <div className="absolute inset-0 bg-orange-500/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" fill="white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm line-clamp-1 ${idx === activeIdx ? "text-white" : "text-gray-400"}`}>
                    {v.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5">{v.comedian}</p>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{v.duration}</span>
              </motion.div>
            ))}

            {/* Progress bar */}
            <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <motion.div
                key={activeIdx}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: -1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-gray-500 text-xs font-semibold tracking-widest uppercase">Défiler</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </div>
  );
}
