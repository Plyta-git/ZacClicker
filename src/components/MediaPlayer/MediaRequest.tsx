import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useState } from "react";
import ReactPlayer from "react-player";

function MediaRequest() {
  const [urls] = useState([
    "https://www.youtube.com/watch?v=cVaIPF7xnQg",
    "https://www.youtube.com/watch?v=h-EaOY8VKoY",
    "https://streamable.com/zvp87a",
    "https://streamable.com/0zbj7d",
    "https://streamable.com/tsuz8s",
    "https://www.youtube.com/watch?v=TA3KPNcvb5s",
    "https://www.youtube.com/watch?v=Yo5QO8K0DrA",
    "https://www.youtube.com/watch?v=LhCBBwwtluY",
    "https://www.youtube.com/shorts/_kR0pe3vcws",
    "https://www.youtube.com/watch?v=RFPW2hkorng",
    "https://www.youtube.com/watch?v=m1qHLquFAgg",
    "https://www.youtube.com/watch?v=R4LjTEvdn5g",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volumePlayer, setVolumePlayer] = useState(0.5);
  const mediarequestEvent = useGameStore(
    (store) => store.activeEvents.mediarequest
  );

  const handleSkip = () => {
    setCurrentIndex((prev) => (prev + 1 < urls.length ? prev + 1 : 0));
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
      <ReactPlayer
        volume={volumePlayer}
        playing
        width="100%"
        url={urls[currentIndex]}
        onEnded={handleVideoEnd}
      />
    </div>
  );
}

export default MediaRequest;
