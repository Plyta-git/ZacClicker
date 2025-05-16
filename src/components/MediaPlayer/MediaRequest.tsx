import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useState } from "react";
import ReactPlayer from "react-player";

function MediaRequest() {
  const [urls] = useState([
    "https://www.youtube.com/watch?v=cVaIPF7xnQg",
    "https://www.youtube.com/watch?v=h-EaOY8VKoY",
    "https://streamable.com/ntg9pw",
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
    "https://www.youtube.com/watch?v=BthhzuTYgCk",
    "https://www.youtube.com/watch?v=SOOmVvgN5i4",
    "https://www.youtube.com/watch?v=41OZWJeh5N4",
    "https://www.youtube.com/watch?v=UqjZMwRLlLs",
    "https://www.youtube.com/watch?v=Mae46HPlJ9o",
    "https://streamable.com/q3t5nm",
    "https://www.youtube.com/watch?v=_cNNh82gh20",
    "https://www.youtube.com/watch?v=Q8vIjrQ8sDc",
    "https://www.youtube.com/watch?v=VUciLHmhp1U",
    "https://www.youtube.com/watch?v=n9HiPMpOCoc",
    "https://www.youtube.com/watch?v=-hFL2xJOb34",
    "https://www.youtube.com/watch?v=WGBhqb3UrhQ",
    "https://www.youtube.com/watch?v=QGI4FOEvB7A",
    "https://www.youtube.com/watch?v=H5tKuz5r7Lw",
    "https://www.youtube.com/watch?v=sI1-y806LcQ",
    "https://streamable.com/dn3xw1",
    "https://www.youtube.com/watch?v=YXG1biUcQ_w",
    "https://www.youtube.com/watch?v=KKrfTzXE7vc",
    "https://www.youtube.com/watch?v=rWbjGYZUKFg",
    "https://streamable.com/bpz8i1",
    "https://streamable.com/ggqu1a",
    "https://www.youtube.com/watch?v=SIfOaE78TB0",
    "https://streamable.com/j9gl3d",
    "https://streamable.com/uwk5tj",
    "https://www.youtube.com/watch?v=ljpQkzFu61A",
    "https://streamable.com/etowy3",
    "https://www.youtube.com/watch?v=MY5LjtQ0wn0",
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
          step={0.01}
        />
        {Math.round(volumePlayer * 100)}%
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
