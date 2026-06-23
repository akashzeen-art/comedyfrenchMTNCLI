import type { Video } from "@/data/videos";
import { useSubscription } from "@/context/SubscriptionContext";

interface VideoAccessButtonProps {
  video: Video;
  children: React.ReactNode;
  className?: string;
}

/** Wraps thumbnail content — triggers phone popup + subscription check on click */
export default function VideoAccessButton({
  video,
  children,
  className,
}: VideoAccessButtonProps) {
  const { requestPlay } = useSubscription();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => requestPlay(video)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          requestPlay(video);
        }
      }}
      className={className}
    >
      {children}
    </div>
  );
}
