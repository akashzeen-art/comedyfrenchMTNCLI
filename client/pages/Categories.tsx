import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { videos } from "@/data/videos";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoAccessButton from "@/components/VideoAccessButton";
import { Play, Eye, Clock, ArrowLeft } from "lucide-react";

const ALL_CATEGORIES = [
  "Observation", "Relations", "Vie", "Fitness", "Famille",
  "Technologie", "Voyage", "Social", "Travail", "Animaux", "Divertissement",
  "Shopping", "Santé", "Mode", "Nourriture", "École", "One-Man-Show",
];

const CATEGORY_COLORS: Record<string, string> = {
  Observation: "from-orange-500 to-pink-500",
  Relations: "from-pink-500 to-rose-500",
  Vie: "from-purple-500 to-pink-500",
  Fitness: "from-green-500 to-cyan-500",
  Famille: "from-yellow-500 to-orange-500",
  Technologie: "from-cyan-500 to-blue-500",
  Voyage: "from-blue-500 to-indigo-500",
  Social: "from-indigo-500 to-purple-500",
  Travail: "from-slate-500 to-gray-600",
  Animaux: "from-lime-500 to-green-500",
  Divertissement: "from-fuchsia-500 to-pink-500",
  Shopping: "from-rose-500 to-orange-500",
  "Santé": "from-teal-500 to-cyan-500",
  Mode: "from-pink-400 to-fuchsia-500",
  Nourriture: "from-amber-500 to-orange-500",
  "École": "from-blue-400 to-cyan-400",
  "One-Man-Show": "from-purple-600 to-pink-600",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  Observation: "👀", Relations: "💕", Vie: "🌟", Fitness: "💪",
  Famille: "👨‍👩‍👧", Technologie: "💻", Voyage: "✈️", Social: "📱",
  Travail: "💼", Animaux: "🐾", Divertissement: "🎬", Shopping: "🛍️",
  "Santé": "🏥", Mode: "👗", Nourriture: "🍕", "École": "📚", "One-Man-Show": "🎤",
};

function formatViews(views: number) {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

// Category listing page — shows all videos with category filter tabs
function CategoryList() {
  const [active, setActive] = useState("Tous");
  const tabs = ["Tous", ...ALL_CATEGORIES];
  const filtered = active === "Tous" ? videos : videos.filter((v) => v.category === active);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white"
    >
      <Navigation />
      <div className="pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl lg:text-6xl font-black mb-4">
            <span className="text-gray-900">Parcourir </span>
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              les Catégories
            </span>
          </h1>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === tab
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ y: -6 }}
            >
              <VideoAccessButton video={video} className="cursor-pointer">
                <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-bold rounded">
                      <Clock className="w-3 h-3 inline mr-1" />{video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-2 mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-500">{video.comedian}</p>
                  </div>
                </div>
              </VideoAccessButton>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

// Videos by category page
function CategoryVideos() {
  const { name } = useParams<{ name: string }>();
  const category = decodeURIComponent(name || "");
  const categoryVideos = videos.filter((v) => v.category === category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white"
    >
      <Navigation />
      <div className="pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back + Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Toutes les Catégories
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{CATEGORY_EMOJIS[category] ?? "🎭"}</span>
            <div>
              <h1 className="text-5xl font-black">
                <span className={`bg-gradient-to-r ${CATEGORY_COLORS[category] ?? "from-orange-500 to-pink-500"} bg-clip-text text-transparent`}>
                  {category}
                </span>
              </h1>
              <p className="text-gray-500 mt-1">{categoryVideos.length} vidéos</p>
            </div>
          </div>
        </motion.div>

        {categoryVideos.length === 0 ? (
          <p className="text-gray-400 text-xl">Aucune vidéo trouvée dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <VideoAccessButton video={video} className="cursor-pointer">
                  <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-bold rounded">
                        <Clock className="w-3 h-3 inline mr-1" />{video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 line-clamp-2 mb-1">{video.title}</h3>
                      <p className="text-sm text-gray-500">{video.comedian}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Eye className="w-3 h-3" />{formatViews(video.views)} views
                      </div>
                    </div>
                  </div>
                </VideoAccessButton>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
}

export { CategoryList, CategoryVideos };
