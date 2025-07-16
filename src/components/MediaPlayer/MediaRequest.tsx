import { MediaRequestURLs } from "@/const/urls";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { getRandomNumber } from "@/hooks/utils";
import { useState } from "react";
import ReactPlayer from "react-player";

const MediaRequest = () => {
  const [currentIndex, setCurrentIndex] = useState(
    getRandomNumber(MediaRequestURLs.length)
  );
  const [volumePlayer, setVolumePlayer] = useState(0.5);
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

  const handleVideoEnd = () => {
    handleSkip();
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
        volume={volumePlayer}
        playing
        width="100%"
        url={MediaRequestURLs[currentIndex]}
        onEnded={handleVideoEnd}
        onError={handleVideoEnd}
      />
    </div>
  );
};

export default MediaRequest;
