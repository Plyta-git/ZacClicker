import useGameStore from "./hooks/useGameStore/useGameStore";
import Store from "./components/Store/Store";
import ZacButton from "./components/ZacButton/ZacButton";
import { useEffect, useRef } from "react";
import AlertBox from "./components/AlertBox/AlertBox";
import MediaRequest from "./components/MediaPlayer/MediaRequest";
import SongRequest from "./components/MediaPlayer/SongRequest";
import ShowEmote from "./components/ShowEmote/ShowEmote";

function App() {
  const points = useGameStore((store) => store.playerPoints);
  const buttonClick = useGameStore((store) => store.buttonClick);
  const pointsPSec = useGameStore((store) => store.pointsPSec);
  const addPoints = useGameStore((store) => store.addPoints);
  const pointsPSecRef = useRef(pointsPSec);

  useEffect(() => {
    pointsPSecRef.current = pointsPSec;
  }, [pointsPSec]);

  useEffect(() => {
    const interval = setInterval(() => {
      addPoints(pointsPSecRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" select-none flex flex-row content-center justify-between min-h-svh w-full">
      <AlertBox />
      <MediaRequest />
      <SongRequest />
      <ShowEmote />
      <div className="w-1/5  bg-sidebar-bg border-r-2 border-color-border  ">
        <Store />
      </div>
      <div className=" flex justify-center flex-col content-center">
        <div className=" flex justify-center flex-col content-center bg-sidebar-bg py-4 px-6 m-2 rounded-lg border-color-border border-2">
          <div className=" transition-all text-2xl"> zakola: {points} </div>
          <div className="  mb-2 text-neutral-400">
            zakola na sekundę: {pointsPSec}
          </div>
          <ZacButton buttonClick={buttonClick} />
        </div>
      </div>
      <div className="w-1/5  bg-chat border-color-border border-l-2  "></div>
    </div>
  );
}

export default App;
