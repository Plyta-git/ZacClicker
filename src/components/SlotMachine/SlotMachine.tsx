import { useCallback, useEffect, useState } from "react";
import SlotReel from "./SlotReel";

const originalSlides = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const generateRandomSlides = (
  sourceArray: number[],
  length: number
): number[] => {
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * sourceArray.length);
    result.push(sourceArray[randomIndex]);
  }
  return result;
};

const generateSliders = () => {
  const slides1 = generateRandomSlides(originalSlides, 10);
  const slides2 =
    Math.floor(Math.random() * 10) >= 5
      ? slides1
      : generateRandomSlides(originalSlides, 10);
  const slides3 =
    Math.floor(Math.random() * 10) > 5
      ? slides1
      : generateRandomSlides(originalSlides, 10);

  return [slides1, slides2, slides3];
};

const SlotMachine = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinTrigger, setSpinTrigger] = useState(0);
  const [results, setResults] = useState<(number | null)[]>([null, null, null]);
  const [completedReels, setCompletedReels] = useState(0);
  const [sliders, setSliders] = useState(generateSliders);

  useEffect(() => {
    console.log(sliders);
  }, [sliders]);

  useEffect(() => {
    if (results.includes(null)) return;
    console.log(results);
    if (results.every((val) => val === results[0]))
      alert("WIN:" + results.join());
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
    setTimeout(() => setSliders(generateSliders), 1600);
  }, [isSpinning]);

  useEffect(() => {
    if (completedReels === 3) {
      setIsSpinning(false);
    }
  }, [completedReels]);

  return (
    <div className="absolute  w-1/5 h-1/4 left-1/5 bottom-0 flex flex-col">
      <div className="flex ">
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
