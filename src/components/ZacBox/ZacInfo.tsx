import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useEffect, useRef } from "react";

const ZacInfo = () => {
  const points = useGameStore((store) => store.playerPoints);
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
    <>
      <div className=" transition-all text-2xl"> zakola: {points} </div>
      <div className="  mb-2 text-neutral-400">
        zakola na sekundę: {pointsPSec}
      </div>
    </>
  );
};

export default ZacInfo;
