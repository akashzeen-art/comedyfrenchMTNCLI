import { type ReactNode } from "react";
import { videos } from "@/data/videos";
import { useSubscription } from "@/context/SubscriptionContext";

interface VideoLinkProps {
  videoId: string;
  children: ReactNode;
  className?: string;
}

export default function VideoLink({ videoId, children, className }: VideoLinkProps) {
  const { requestPlay, checking } = useSubscription();
  const video = videos.find((v) => v.id === videoId);

  const handleClick = () => {
    if (!checking && video) {
      requestPlay(video);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && video) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={className}
      style={{ cursor: checking ? "wait" : "pointer" }}
    >
      {children}
    </div>
  );
}
