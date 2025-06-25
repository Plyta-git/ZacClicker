import { useCallback, useEffect, useState } from "react";
import SlotReel from "./SlotReel";
import useGameStore from "@/hooks/useGameStore/useGameStore";

const generateRandomSlides = (length: number): number[] => {
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 15);
    result.push(randomIndex);
  }
  return result;
};

const generateSliders = () => {
  const slides1 = generateRandomSlides(10);
  const slides2 =
    Math.floor(Math.random() * 10) >= 5 ? slides1 : generateRandomSlides(10);
  const slides3 =
    Math.floor(Math.random() * 10) > 5 ? slides1 : generateRandomSlides(10);

  return [slides1, slides2, slides3];
};

const SlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinTrigger, setSpinTrigger] = useState(0);
  const [results, setResults] = useState<(number | null)[]>([null, null, null]);
  const [completedReels, setCompletedReels] = useState(0);
  const [sliders, setSliders] = useState(generateSliders);
  const slotsEvent = useGameStore((store) => store.activeEvents.slots);
  const addPoints = useGameStore((store) => store.addPoints);
  useEffect(() => {
    console.log(sliders);
  }, [sliders]);

  useEffect(() => {
    if (results.includes(null)) return;
    if (results.every((val) => val === results[0])) addPoints(200);
  }, [results]);

  const handleReelComplete = (reelIndex: number, result: number) => {
    setSliders((currentSliders) => {
      setResults((prev) => {
        const newResults = [...prev];
        newResults[reelIndex] = currentSliders[reelIndex][result];
        return newResults;
      });
      return currentSliders;
    });
    setCompletedReels((prev) => prev + 1);
  };

  const startSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResults([null, null, null]);
    setCompletedReels(0);
    setSpinTrigger((prev) => prev + 1);
    setTimeout(() => setSliders(generateSliders), 1000);
  }, [isSpinning]);

  useEffect(() => {
    if (completedReels === 3) {
      setIsSpinning(false);
    }
  }, [completedReels]);

  if (!slotsEvent) return <></>;
  return (
    <div className="absolute  w-1/5 h-1/4 left-1/5 bottom-0 flex flex-col bg-chat border-r-2 border-t-2">
      <div className="flex">
        <SlotReel
          slides={sliders[0]}
          isSpinning={isSpinning}
          onSpinComplete={(result) => handleReelComplete(0, result)}
          spinTrigger={spinTrigger}
        />
        <SlotReel
          slides={sliders[1]}
          isSpinning={isSpinning}
          onSpinComplete={(result) => handleReelComplete(1, result)}
          spinTrigger={spinTrigger}
        />
        <SlotReel
          slides={sliders[2]}
          isSpinning={isSpinning}
          onSpinComplete={(result) => handleReelComplete(2, result)}
          spinTrigger={spinTrigger}
        />
      </div>
      <button
        className="bg-amber-500/80 rounded-2xl m-2 flex-1"
        onClick={startSpin}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
};

export default SlotMachine;
