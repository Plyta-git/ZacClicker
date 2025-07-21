import { SongRequestURLs } from "@/const/urls";
import useGameStore, {
  selectMediaSkipCost,
} from "@/hooks/useGameStore/useGameStore";
import { getRandomNumber } from "@/hooks/utils";
import { useState } from "react";
import ReactPlayer from "react-player";

function SongRequest() {
  const [currentIndex, setCurrentIndex] = useState(
    getRandomNumber(SongRequestURLs.length)
  );
  const [volumePlayer, setVolumePlayer] = useState(0.1);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const skipMedia = useGameStore((state) => state.skipMedia);
  const skipCost = useGameStore(selectMediaSkipCost);
  const playerPoints = useGameStore((state) => state.playerPoints);
  const SongRequestEvent = useGameStore(
    (state) => state.activeEvents.songrequest
  );

  const handleSkip = () => {
    if (skipMedia()) {
      setCurrentIndex(getRandomNumber(SongRequestURLs.length));
    }
  };

  if (!SongRequestEvent) return <></>;
  return (
    <div className="w-3/5 absolute top-0 left-1/5 flex flex-col bg-neutral-900 bg-opacity-75 backdrop-blur-sm text-white shadow-lg overflow-hidden">
      <div className="flex justify-between items-center gap-4 w-full p-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-col w-40 gap-1">
            <div className=" flex">
              <input
                type="range"
                onChange={(e) => setVolumePlayer(Number(e.target.value))}
                min={0.05}
                max={1}
                step={0.01}
                value={volumePlayer}
                className="w-full"
              />
              <div className="text-xs w-10 text-center font-mono flex-shrink-0">
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
        </div>

        {/* Title */}
        <div className="font-medium truncate text-center">
          {SongRequestURLs[currentIndex].title}
        </div>

        {/* Spacer */}
        <div className="w-44 flex-shrink-0" />
      </div>

      <div className="w-full bg-neutral-900 h-1">
        <div
          className="bg-main-active h-2 transition-all duration-[1500ms] ease-in-out"
          style={{ width: `${playbackProgress}%` }}
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
          onProgress={({ played }) => {
            setPlaybackProgress(played * 100);
          }}
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
