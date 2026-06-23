import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  getAccountDetails,
  deactivateSubscription,
  isActive,
  redirectToCampaign,
} from "@/services/vasApi";
import { getSubid, getProductCode, parseUrlParams, formatMsisdnDisplay } from "@/lib/subscriber";
import { User, Calendar, Phone, Loader2, CheckCircle, XCircle } from "lucide-react";

interface AccountData {
  msisdn: string;
  validFrom: string;
  validTo: string;
  status: string;
  serviceName: string;
}

export default function MyAccount() {
  const [account, setAccount] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAccount = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAccountDetails();
      setAccount({
        msisdn: data.msisdn || "—",
        validFrom: data.valid_from || data.validityfrom || "—",
        validTo: data.valid_to || data.validityto || "—",
        status: String(data.status),
        serviceName: data.service_name || "ComedyHub",
      });
    } catch {
      setError("Impossible de charger les détails du compte.");
      setAccount(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    parseUrlParams(window.location.search);
    loadAccount();
  }, []);

  const handleSubscribe = () => {
    redirectToCampaign();
  };

  const handleUnsubscribe = async () => {
    setActionLoading(true);
    try {
      await deactivateSubscription();
      await loadAccount();
    } catch {
      setError("La désactivation a échoué. Veuillez réessayer.");
    } finally {
      setActionLoading(false);
    }
  };

  const subscribed = account ? isActive(account.status) : false;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white min-h-screen"
    >
      <Navigation />

      <div className="pt-32 pb-16 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">
            Mon Compte
          </h1>
          <p className="text-gray-500">
            Gérez votre abonnement ComedyHub
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : error && !account ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={loadAccount} variant="outline">
              Réessayer
            </Button>
          </div>
        ) : account ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden"
          >
            <div className={`px-6 py-4 ${subscribed ? "bg-green-50" : "bg-gray-50"}`}>
              <div className="flex items-center gap-3">
                {subscribed ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-gray-400" />
                )}
                <div>
                  <p className="font-bold text-gray-900">
                    {subscribed ? "Abonnement Actif" : "Non Abonné"}
                  </p>
                  <p className="text-sm text-gray-500">{account.serviceName}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">Numéro</p>
                  <p className="font-bold text-gray-900">
                    {formatMsisdnDisplay(account.msisdn)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">Validité</p>
                  <p className="font-bold text-gray-900">
                    {account.validFrom} — {account.validTo}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase">ID Abonné</p>
                  <p className="font-bold text-gray-900">{getSubid()}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                {subscribed ? (
                  <Button
                    onClick={handleUnsubscribe}
                    disabled={actionLoading}
                    variant="destructive"
                    className="w-full font-bold"
                  >
                    {actionLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Désactivation...
                      </>
                    ) : (
                      "Se Désabonner"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubscribe}
                    disabled={actionLoading}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold"
                  >
                    S&apos;Abonner
                  </Button>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
            </div>
          </motion.div>
        ) : null}

        <p className="text-xs text-gray-400 text-center mt-6">
          Produit : {getProductCode()}
        </p>
      </div>

      <Footer />
    </motion.div>
  );
}
