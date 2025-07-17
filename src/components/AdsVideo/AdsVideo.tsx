import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { ADS_VIDEO_CONFIG } from "@/const/config";
import { AdsVideoURLs } from "@/const/urls";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { EventTypes } from "@/types";

const AdsVideo = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [videoIndex, setVideoIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const displayAds = useGameStore(
    (state) => state.activeEvents[EventTypes.Ads]
  );
  const item14Count = useGameStore((state) => state.itemCounts.get(14) || 0);

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const scheduleNextAppearance = () => {
    // Calculate dynamic interval based on item 14 count
    const count = Math.min(item14Count, 5); // Cap at 5 for calculation
    const baseMin = 60000; // 60s
    const baseMax = 90000; // 90s
    const target = 15000; // 15s

    // Linear interpolation
    const intervalMin =
      count <= 1 ? baseMin : baseMin - ((baseMin - target) / 4) * (count - 1);
    const intervalMax =
      count <= 1 ? baseMax : baseMax - ((baseMax - target) / 4) * (count - 1);

    const delay = getRandomInt(intervalMin, intervalMax);

    timerRef.current = setTimeout(() => {
      const idx = getRandomInt(0, AdsVideoURLs.length - 1);
      const top = getRandomInt(0, 100 - ADS_VIDEO_CONFIG.HEIGHT_PERCENT);
      const left = getRandomInt(0, 100 - ADS_VIDEO_CONFIG.WIDTH_PERCENT);

      setVideoIndex(idx);
      setPosition({ top, left });
      setVisible(true);
    }, delay);
  };

  // Start on mount & when item count changes
  useEffect(() => {
    scheduleNextAppearance();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item14Count]);

  const handleVideoFinish = () => {
    setVisible(false);
    scheduleNextAppearance();
  };

  if (!visible || !displayAds) return null;

  const widthVW = ADS_VIDEO_CONFIG.WIDTH_PERCENT;
  const heightVW = (widthVW * 9) / 16; // maintain 16:9 aspect ratio

  return (
    <div
      style={{
        position: "absolute",
        top: `${position.top}%`,
        left: `${position.left}%`,
        width: `${widthVW}vw`,
        height: `${heightVW}vw`,
        overflow: "hidden",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <ReactPlayer
        url={AdsVideoURLs[videoIndex]}
        playing
        controls={false}
        width="100%"
        height="100%"
        volume={ADS_VIDEO_CONFIG.VOLUME}
        onEnded={handleVideoFinish}
        onError={handleVideoFinish}
        config={{
          youtube: {
            playerVars: {
              showinfo: 0,
              disablekb: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              fs: 0,
              iv_load_policy: 3,
            },
          },
        }}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default AdsVideo;
