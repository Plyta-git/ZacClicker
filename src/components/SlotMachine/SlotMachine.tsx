import { useCallback, useEffect, useState } from "react";
import SlotReel from "./SlotReel";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import useSound from "use-sound";
import { SLOT_MACHINE_CONFIG } from "@/const/config";

const { SLIDES_COUNT, WIN_CHANCE, WIN_POINTS, SPIN_DURATION } =
  SLOT_MACHINE_CONFIG;

const generateRandomSlides = (length: number): number[] => {
  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * 15);
    result.push(randomIndex);
  }
  return result;
};

const generateSliders = () => {
  const slides1 = generateRandomSlides(SLIDES_COUNT);
  const slides2 =
    Math.floor(Math.random() * 10) >= WIN_CHANCE
      ? slides1
      : generateRandomSlides(SLIDES_COUNT);
  const slides3 =
    Math.floor(Math.random() * 10) > WIN_CHANCE
      ? slides1
      : generateRandomSlides(SLIDES_COUNT);

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
  const [playSpinSound] = useSound("/Spin.wav", { volume: 0.3 });
  const [playWinSound] = useSound("/BIGWIN.mp3", { volume: 1 });

  useEffect(() => {}, [sliders]);

  useEffect(() => {
    if (results.includes(null)) return;
    if (results.every((val) => val === results[0])) {
      addPoints(WIN_POINTS);
      playWinSound();
    }
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
    playSpinSound();
    setResults([null, null, null]);
    setCompletedReels(0);
    setSpinTrigger((prev) => prev + 1);
    setTimeout(() => setSliders(generateSliders), SPIN_DURATION);
  }, [isSpinning, playSpinSound]);

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
          key={0}
        />
        <SlotReel
          slides={sliders[1]}
          isSpinning={isSpinning}
          onSpinComplete={(result) => handleReelComplete(1, result)}
          spinTrigger={spinTrigger}
          key={1}
        />
        <SlotReel
          slides={sliders[2]}
          isSpinning={isSpinning}
          onSpinComplete={(result) => handleReelComplete(2, result)}
          spinTrigger={spinTrigger}
          key={2}
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
