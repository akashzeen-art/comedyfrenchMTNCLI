import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import type { Video } from "@/data/videos";
import MobileNumberModal from "@/components/MobileNumberModal";
import {
  checkSubscriptionStatus,
  redirectToCampaign,
  isActive,
} from "@/services/vasApi";
import {
  parseUrlParams,
  getSubid,
  getProductCode,
  getMsisdn,
  setMsisdn,
  msisdnMatches,
  normalizeMsisdn,
} from "@/lib/subscriber";

interface SubscriptionContextValue {
  subid: string;
  productcode: string;
  msisdn: string;
  accountQuery: string;
  showMobileModal: boolean;
  checking: boolean;
  activeVideo: Video | null;
  requestPlay: (video: Video) => void;
  handleMobileSubmit: (msisdn: string) => void;
  closeMobileModal: () => void;
  closePlayer: () => void;
  modalError: string | null;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [subid, setSubidState] = useState(() => {
    parseUrlParams(window.location.search);
    return getSubid();
  });
  const [productcode, setProductcodeState] = useState(() => {
    parseUrlParams(window.location.search);
    return getProductCode();
  });
  const [msisdn, setMsisdnState] = useState(() => getMsisdn() || "");
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [pendingVideo, setPendingVideo] = useState<Video | null>(null);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [checking, setChecking] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    const { subid: urlSubid, productcode: urlProductcode } = parseUrlParams(
      location.search,
    );
    if (urlSubid) setSubidState(urlSubid);
    if (urlProductcode) setProductcodeState(urlProductcode);
  }, [location.search]);

  const accountQuery = useMemo(() => {
    const q = new URLSearchParams();
    q.set("subid", subid || "0");
    q.set("productcode", productcode);
    return `?${q.toString()}`;
  }, [subid, productcode]);

  const verifyAndPlay = useCallback(
    async (video: Video, phone: string) => {
      setChecking(true);
      setModalError(null);

      const currentSubid = getSubid();
      const currentProductcode = getProductCode();

      try {
        const result = await checkSubscriptionStatus(
          currentSubid,
          currentProductcode,
          phone,
        );

        if (isActive(result.status)) {
          if (
            result.msisdn &&
            phone &&
            !msisdnMatches(phone, result.msisdn)
          ) {
            setModalError(
              "Ce numéro ne correspond pas à votre abonnement actif.",
            );
            setShowMobileModal(true);
            setPendingVideo(video);
            return;
          }
          setSubidState(currentSubid);
          setProductcodeState(currentProductcode);
          setActiveVideo(video);
          setShowMobileModal(false);
          setPendingVideo(null);
          return;
        }

        redirectToCampaign(currentSubid, currentProductcode);
      } catch {
        setModalError(
          "Impossible de vérifier votre abonnement. Veuillez réessayer.",
        );
        setShowMobileModal(true);
        setPendingVideo(video);
      } finally {
        setChecking(false);
      }
    },
    [],
  );

  const requestPlay = useCallback(
    (video: Video) => {
      const stored = getMsisdn();
      if (stored) {
        verifyAndPlay(video, stored);
      } else {
        setPendingVideo(video);
        setModalError(null);
        setShowMobileModal(true);
      }
    },
    [verifyAndPlay],
  );

  const handleMobileSubmit = useCallback(
    async (phoneInput: string) => {
      const phone = normalizeMsisdn(phoneInput);
      if (phone.length < 12) {
        setModalError("Veuillez entrer un numéro valide.");
        return;
      }

      setMsisdn(phone);
      setMsisdnState(phone);

      if (!pendingVideo) {
        setShowMobileModal(false);
        return;
      }

      await verifyAndPlay(pendingVideo, phone);
    },
    [pendingVideo, verifyAndPlay],
  );

  const closeMobileModal = useCallback(() => {
    if (!checking) {
      setShowMobileModal(false);
      setPendingVideo(null);
      setModalError(null);
    }
  }, [checking]);

  const closePlayer = useCallback(() => {
    setActiveVideo(null);
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{
        subid,
        productcode,
        msisdn,
        accountQuery,
        showMobileModal,
        checking,
        activeVideo,
        requestPlay,
        handleMobileSubmit,
        closeMobileModal,
        closePlayer,
        modalError,
      }}
    >
      {children}
      <MobileNumberModal />
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return ctx;
}
