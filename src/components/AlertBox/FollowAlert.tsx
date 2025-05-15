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

const FollowAlert = () => {
  const addPoints = useGameStore((store) => store.addPoints);
  const hasAdded = useRef(false);
  const [playSound] = useSound("/follow.wav", { volume: 0.1 });

  const randomNick = useMemo(
    () => twitchNicks[Math.floor(Math.random() * twitchNicks.length)],
    []
  );

  useEffect(() => {
    playSound();
    if (!hasAdded.current) {
      addPoints(5);
      hasAdded.current = true;
    }
  }, [addPoints, playSound]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center  bg-neutral-500/20 ">
      nowy follow:<div className=" text-xl">{randomNick}</div>
    </div>
  );
};

export default FollowAlert;
