import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useState } from "react";
import useSound from "use-sound";
import { ZAC_BUTTON_CONFIG } from "@/const/config";

const ZacButton = () => {
  const buttonClick = useGameStore((store) => store.buttonClick);
  const [play] = useSound("./SlapSound.mp3", { volume: 0.25 });

  const [isClicked, setClicked] = useState(false);

  const onClick = () => {
    buttonClick();
    setClicked(true);
    play();
    setTimeout(() => setClicked(false), ZAC_BUTTON_CONFIG.CLICK_TIMEOUT);
  };
  return (
    <button className=" flex justify-center select-none" onClick={onClick}>
      {isClicked ? (
        <img className=" select-none rounded-xl" src="/zac2.jpg" />
      ) : (
        <img className="  select-none rounded-xl" src="/zac1.jpg" />
      )}
    </button>
  );
};

export default ZacButton;
