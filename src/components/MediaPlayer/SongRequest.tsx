import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useState } from "react";
import ReactPlayer from "react-player";

function SongRequest() {
  const [songs] = useState([
    {
      url: "https://www.youtube.com/watch?v=xVdn9GhwJgk",
      title: "danny popek bollywodzka produkcja pakistanskie disco",
    },
    {
      url: "https://www.youtube.com/watch?v=XJOex1-upLo",
      title: "GENZIE - SPERMIARA (OFICJALNA WERSJA)",
    },
    {
      url: "https://www.youtube.com/watch?v=O0lf_fE3HwA",
      title: "Gwen Stefani - The Sweet Escape ft. Akon",
    },
    {
      url: "https://www.youtube.com/watch?v=LaXazWRppwI",
      title: "J. Laskowski 2Pac Baby Don’t Cry Swiat nie wierzy lzom",
    },
    {
      url: "https://www.youtube.com/watch?v=Rj__j0cZrFk",
      title: "Mamm0n - Samotność (Official Music Video)",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volumePlayer, setVolumePlayer] = useState(0.5);
  const SongRequestEvent = useGameStore(
    (store) => store.activeEvents.songrequest
  );
  const handleSkip = () => {
    setCurrentIndex((prev) => (prev + 1 < songs.length ? prev + 1 : 0));
  };
  if (!SongRequestEvent) return <></>;
  return (
    <div className="w-1/4 h-1/3 absolute top-0 left-1/5 flex flex-col ">
      <div>
        <div className="mb-2 font-medium">{songs[currentIndex].title}</div>
        <button
          className=" bg-main p-2 rounded-sm border-main-active border"
          onClick={handleSkip}
        >
          Skip
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
          url={songs[currentIndex].url}
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
