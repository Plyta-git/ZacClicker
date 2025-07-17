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

  return (
    <>
      <div className=" transition-all text-2xl"> zakola: {points} </div>
      <div className="  mb-2 text-neutral-400">
        zakola na sekundę: {pointsPSec}
      </div>
    </>
  );
};

export default ZacInfo;
