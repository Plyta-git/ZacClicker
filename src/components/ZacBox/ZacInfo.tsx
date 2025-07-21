import { useEffect } from "react";
import useGameStore from "@/hooks/useGameStore/useGameStore";

const ZacInfo = () => {
  const points = useGameStore((store) => store.playerPoints);
  const pointsPSec = useGameStore((store) => store.pointsPSec);
  const tickPoints = useGameStore((store) => store.tickPoints);

  useEffect(() => {
    const interval = setInterval(() => {
      tickPoints();
    }, 1000);

    return () => clearInterval(interval);
  }, [tickPoints]);

  // Ensure the info does not block pointer events, so buttons underneath remain clickable.
  // The text remains visually in the same place.
  return (
    <div className=" mt-25">
      <div
        className="transition-all text-6xl m-5 pointer-events-none select-none"
        style={{ position: "relative", zIndex: 1 }}
      >
        zakola: {points}
      </div>
      <div
        className="mb-2 text-neutral-400 pointer-events-none select-none"
        style={{ position: "relative", zIndex: 1 }}
      >
        zakola na sekundę: {pointsPSec}
      </div>
    </div>
  );
};

export default ZacInfo;
