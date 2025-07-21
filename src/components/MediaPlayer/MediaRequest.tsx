import { MediaRequestURLs } from "@/const/urls";
import useGameStore, {
  selectMediaSkipCost,
} from "@/hooks/useGameStore/useGameStore";
import { getRandomNumber } from "@/hooks/utils";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { MEDIA_PLAYER_CONFIG } from "@/const/config";

const MediaRequest = () => {
  const [currentIndex, setCurrentIndex] = useState(
    getRandomNumber(MediaRequestURLs.length)
  );
  const [volumePlayer, setVolumePlayer] = useState(0.3);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const playerRef = useRef<ReactPlayer | null>(null);

  const skipMedia = useGameStore((state) => state.skipMedia);
  const skipCost = useGameStore(selectMediaSkipCost);
  const playerPoints = useGameStore((state) => state.playerPoints);

  const mediarequestEvent = useGameStore(
    (state) => state.activeEvents.mediarequest
  );

  const handleSkip = () => {
    if (skipMedia()) {
      setCurrentIndex(getRandomNumber(MediaRequestURLs.length));
    }
  };

  const handleVideoEnd = () => {
    setCurrentIndex(getRandomNumber(MediaRequestURLs.length));
  };

  const endedFlagRef = useRef(false);
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    const duration = playerRef.current?.getDuration?.() || 0;
    setPlaybackProgress(state.played * 100);

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
    <div className="w-1/5 h-2/9 absolute bottom-0 right-1/5 flex flex-col bg-neutral-900 text-white shadow-lg overflow-hidden">
      <div className="p-1 w-full">
        <ReactPlayer
          ref={playerRef}
          volume={volumePlayer}
          playing
          loop={false}
          muted={MediaRequestURLs[currentIndex].includes("streamable.com")}
          width="100%"
          height="100%"
          url={MediaRequestURLs[currentIndex]}
          onEnded={handleVideoEnd}
          onError={handleVideoEnd}
          onProgress={handleProgress}
        />
      </div>
      <div className="flex justify-between items-center gap-4 w-full p-2">
        <div className="flex items-center gap-2 w-1/2">
          <input
            type="range"
            onChange={(e) => setVolumePlayer(Number(e.target.value))}
            min={0}
            max={1}
            step={0.01}
            value={volumePlayer}
            className="w-full"
          />
          <div className="text-xs w-12 text-center font-mono flex-shrink-0">
            {`${(volumePlayer * 100).toFixed(0)}%`}
          </div>
        </div>
        <button
          className="bg-main p-1 rounded-sm border-main-active border whitespace-nowrap text-sm disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleSkip}
          disabled={playerPoints < skipCost}
        >
          Skip ({skipCost} pkt)
        </button>
      </div>

      <div className="w-full bottom-0 absolute bg-gray-600 h-1">
        <div
          className="bg-green-500 h-1 transition-all"
          style={{ width: `${playbackProgress}%` }}
        />
      </div>
    </div>
  );
};

export default MediaRequest;
