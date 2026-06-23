import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { useSubscription } from "@/context/SubscriptionContext";
import { normalizeMsisdn } from "@/lib/subscriber";
import { VAS_CONFIG } from "@/config/vas";

const COUNTRY_PREFIX = `+${VAS_CONFIG.countryCode}`;

export default function MobileNumberModal() {
  const {
    showMobileModal,
    handleMobileSubmit,
    closeMobileModal,
    checking,
    modalError,
  } = useSubscription();
  const [phone, setPhone] = useState("");
  const [localError, setLocalError] = useState("");

  if (!showMobileModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizeMsisdn(phone);
    const localDigits = normalized.slice(3);
    if (localDigits.length < 8) {
      setLocalError("Veuillez entrer un numéro de mobile valide.");
      return;
    }
    setLocalError("");
    handleMobileSubmit(phone);
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobileModal();
        }}
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
        >
          <button
            onClick={closeMobileModal}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-2 text-4xl">📱</div>
          <h2 className="mb-2 text-2xl font-black text-gray-900">
            Entrez votre numéro
          </h2>
          <p className="mb-6 text-sm font-medium text-gray-600">
            Saisissez votre numéro de mobile pour accéder aux vidéos.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-3">
              <div className="flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-3 text-sm font-bold text-white">
                {COUNTRY_PREFIX}
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setLocalError("");
                }}
                placeholder="07 12 34 56 78"
                autoFocus
                disabled={checking}
                inputMode="numeric"
                aria-label="Numéro de mobile"
                className="min-w-0 flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900 outline-none focus:border-pink-500 disabled:opacity-60"
              />
            </div>

            {(localError || modalError) && (
              <p className="mb-3 text-sm font-semibold text-red-500">
                {localError || modalError}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={checking}
              whileHover={{ scale: checking ? 1 : 1.02 }}
              whileTap={{ scale: checking ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3.5 text-sm font-black text-white shadow-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            >
              {checking ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Vérification...
                </>
              ) : (
                "CONTINUER"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
