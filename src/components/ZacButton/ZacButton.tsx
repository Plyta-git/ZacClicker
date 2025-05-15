import { useState } from "react";
import useSound from "use-sound";

const ZacButton = ({ buttonClick }: { buttonClick: () => void }) => {
  const [isClicked, setClicked] = useState(false);
  const [play] = useSound("./SlapSound.mp3", { volume: 0.25 });
  const onClick = () => {
    buttonClick();
    setClicked(true);
    play();
    setTimeout(() => setClicked(false), 150);
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
