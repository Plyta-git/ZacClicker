import useSpeak from "@/hooks/tts";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useEffect, useMemo, useRef } from "react";
import useSound from "use-sound";
import { getRandomNickName } from "./utils";

const DonateAlert = () => {
  const [playSound] = useSound("/donate.wav", { volume: 0.2 });
  const addPoints = useGameStore((store) => store.addPoints);
  const hasAdded = useRef(false);
  useSpeak(
    "Gucci gucci kiedy minecraft jakieś klocki zagramy gucci gucci prosze kiedy klocki"
  );
  const memoizedNick = useMemo(() => getRandomNickName(), []);

  useEffect(() => {
    playSound();
    if (!hasAdded.current) {
      addPoints(15);
      hasAdded.current = true;
    }
  }, [addPoints, playSound]);

  return (
    <div className="w-full h-full flex items-center ">
      <img className=" size-40" src="./donate.jpg"></img>
      <div className="flex flex-col justify-center items-center">
        <div className="text-xl font-bold font-[Nunito]">
          <span className=" text-donate font-bold">{memoizedNick} </span>
          przekazał <span className="text-donate font-bold">10zł</span>!
        </div>
        <div className="m-2 text-sm font-nunito text-center">
          {" "}
          losowa treść donatelosowa treść donatelosowa treść donatelosowa treść
          donate losowa treść donate losowa treść donate losowa treść donate
          losowa treść donate losowa treść donate losowa treść donate
        </div>
      </div>
    </div>
  );
};

export default DonateAlert;
