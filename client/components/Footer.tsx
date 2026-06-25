import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img
                  src="/comedylogo.png"
                  alt="Comedyzone logo"
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Votre destination ultime pour le streaming de comédie premium. Riez sans limite avec les meilleurs comédiens du monde.
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800" />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            <p className="text-gray-500 text-sm">
              © {currentYear} Comedyzone. Tous droits réservés. Créé avec{" "}
              <span className="text-pink-500">💝</span> pour les amateurs de comédie.
            </p>

          </motion.div>
        </div>

        {/* Decorative Footer Bar */}
        <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 via-pink-500 via-purple-600 to-transparent opacity-50" />
      </div>
    </footer>
  );
}
