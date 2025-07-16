import { MediaRequestURLs } from "@/const/urls";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { getRandomNumber } from "@/hooks/utils";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { MEDIA_PLAYER_CONFIG } from "@/const/config";

const MediaRequest = () => {
  const [currentIndex, setCurrentIndex] = useState(
    getRandomNumber(MediaRequestURLs.length)
  );
  const [volumePlayer, setVolumePlayer] = useState(0.5);
  const playerRef = useRef<ReactPlayer | null>(null);
  const removeSkip = useGameStore((store) => store.removeSkip);
  const skipsCount = useGameStore((store) => store.skips);
  const mediarequestEvent = useGameStore(
    (store) => store.activeEvents.mediarequest
  );

  const handleSkip = () => {
    if (skipsCount < 1) return;
    removeSkip(1);
    setCurrentIndex(getRandomNumber(MediaRequestURLs.length));
  };

  // Auto-advance to the next video when the current one ends or errors out
  const handleVideoEnd = () => {
    setCurrentIndex(getRandomNumber(MediaRequestURLs.length));
  };

  // Some Streamable embeds may never fire onEnded and instead loop automatically.
  // Detect near-end of video via onProgress and trigger manual advance.
  const endedFlagRef = useRef(false);
  const handleProgress = (state: { playedSeconds: number }) => {
    const duration = playerRef.current?.getDuration?.() || 0;
    if (duration > 0) {
      const { playedSeconds } = state;
      const progressRatio = playedSeconds / duration;
      if (
        progressRatio > MEDIA_PLAYER_CONFIG.ENDED_FLAG_THRESHOLD &&
        !endedFlagRef.current
      ) {
        endedFlagRef.current = true;
        handleVideoEnd();
      }
      if (progressRatio < 0.1) {
        endedFlagRef.current = false;
      }
    }
  };

  if (!mediarequestEvent) return <></>;

  return (
    <div className="w-1/4 h-1/3 absolute bottom-0 right-1/5 flex flex-col ">
      <div>
        <button
          className=" bg-main p-2 rounded-sm border-main-active border"
          onClick={handleSkip}
        >
          Skip({skipsCount})
        </button>
        <input
          type="range"
          onChange={(e) => setVolumePlayer(Number(e.target.value))}
          min={0}
          max={1}
          step={0.01}
        />
        {Math.round(volumePlayer * 100)}%
      </div>
      <ReactPlayer
        ref={playerRef}
        volume={volumePlayer}
        playing
        loop={false}
        muted={MediaRequestURLs[currentIndex].includes("streamable.com")}
        width="100%"
        url={MediaRequestURLs[currentIndex]}
        onEnded={handleVideoEnd}
        onError={handleVideoEnd}
        onProgress={handleProgress}
      />
    </div>
  );
};

export default MediaRequest;
