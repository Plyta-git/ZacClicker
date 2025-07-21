import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import { ZAC_BUTTON_CONFIG } from "@/const/config";

const ZacButton = () => {
  const buttonClick = useGameStore((store) => store.buttonClick);
  const [play] = useSound("./SlapSound.mp3", { volume: 0.25 });

  const [isClicked, setClicked] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [dotOpacity, setDotOpacity] = useState(0);

  const requestRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      setDotOpacity((prev) => Math.max(prev - 0.005, 0));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const onClick = () => {
    buttonClick();
    setClicked(true);
    play();
    const randomRotation = (Math.random() - 0.5) * 10;
    setRotation(randomRotation);
    setDotOpacity((prev) => Math.min(prev + 0.1, 0.5));
    setTimeout(() => setClicked(false), ZAC_BUTTON_CONFIG.CLICK_TIMEOUT);
  };

  const imageStyle = {
    transition: "transform 0.02s ease-out",
    transform: isClicked
      ? `scale(1.05) rotate(${rotation}deg)`
      : "scale(1) rotate(0deg)",
  };

  return (
    <button
      className="relative flex justify-center select-none"
      onClick={onClick}
    >
      <img
        className="select-none rounded-xl w-40"
        src={isClicked ? "/zac2.jpg" : "/zac1.jpg"}
        style={imageStyle}
        draggable={false}
        alt="Zac"
      />
      <div
        className=" select-none absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgb(230, 56, 25) 0%, rgba(255,0,0,0) 60%)",
          opacity: dotOpacity,
          top: "-30px", // minimalnie do góry
        }}
      />
    </button>
  );
};

export default ZacButton;
