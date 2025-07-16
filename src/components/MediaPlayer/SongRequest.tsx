import { SongRequestURLs } from "@/const/urls";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { getRandomNumber } from "@/hooks/utils";
import { useState } from "react";
import ReactPlayer from "react-player";

function SongRequest() {
  const [currentIndex, setCurrentIndex] = useState(
    getRandomNumber(SongRequestURLs.length)
  );
  const [volumePlayer, setVolumePlayer] = useState(0.5);
  const SongRequestEvent = useGameStore(
    (store) => store.activeEvents.songrequest
  );
  const removeSkip = useGameStore((store) => store.removeSkip);
  const skipsCount = useGameStore((store) => store.skips);
  const handleSkip = () => {
    if (skipsCount < 1) return;
    removeSkip(1);
    setCurrentIndex(getRandomNumber(SongRequestURLs.length));
  };
  if (!SongRequestEvent) return <></>;
  return (
    <div className="w-1/4 h-1/3 absolute top-0 left-1/5 flex flex-col ">
      <div>
        <div className="mb-2 font-medium">
          {SongRequestURLs[currentIndex].title}
        </div>
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
          step={0.1}
        />
      </div>
      <div className="audio-only">
        <ReactPlayer
          volume={volumePlayer}
          playing
          width="100%"
          height="0"
          url={SongRequestURLs[currentIndex].url}
          onEnded={() =>
            setCurrentIndex(getRandomNumber(SongRequestURLs.length))
          }
          config={{
            youtube: {
              playerVars: {
                controls: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default SongRequest;
