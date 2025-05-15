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

const SubAlert = () => {
  const addPoints = useGameStore((store) => store.addPoints);
  const hasAdded = useRef(false);
  const [playSound] = useSound("/sub.wav", { volume: 0.2 });

  const randomNick = useMemo(
    () => twitchNicks[Math.floor(Math.random() * twitchNicks.length)],
    []
  );

  useEffect(() => {
    playSound();
    if (!hasAdded.current) {
      addPoints(50);
      hasAdded.current = true;
    }
  }, [addPoints, playSound]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center  bg-blue-500/20 ">
      nowy sub:<div className=" text-xl">{randomNick}</div>
    </div>
  );
};

export default SubAlert;
