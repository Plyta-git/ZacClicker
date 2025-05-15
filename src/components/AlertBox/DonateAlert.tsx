import useSpeak from "@/hooks/tts";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useEffect, useRef, useMemo } from "react";
import useSound from "use-sound";

const twitchNicks = [
  "PixelPanda",
  "GameGuru",
  "ShadowCaster",
  "EpicZac",
  "StreamQueen",
  "NoobSlayer",
  "ChillVibes",
  "LootHunter",
  "SpeedyFox",
  "RetroRex",
  "QuestWizard",
  "SnackAttack",
  "VictoryVixen",
  "SilentStorm",
  "LuckyLynx",
];

const DonateAlert = () => {
  const [playSound] = useSound("/donate.wav", { volume: 0.2 });
  const addPoints = useGameStore((store) => store.addPoints);
  const hasAdded = useRef(false);
  useSpeak(
    "Gucci gucci kiedy minecraft jakieś klocki zagramy gucci gucci prosze kiedy klocki"
  );
  const randomNick = useMemo(
    () => twitchNicks[Math.floor(Math.random() * twitchNicks.length)],
    []
  );
  useEffect(() => {
    playSound();
    if (!hasAdded.current) {
      addPoints(15);
      hasAdded.current = true;
    }
  }, [addPoints, playSound]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-amber-700/20 ">
      nowy donate:<div className=" text-xl">{randomNick}</div> 5$
    </div>
  );
};

export default DonateAlert;
