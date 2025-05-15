import { useEffect, useRef } from "react";

const SETTINGS = {
  voice: "Jacek",
  volume: 1.0,
};

const useSpeak = (text: string) => {
  const effectRunRef = useRef(false);
  useEffect(() => {
    if (!effectRunRef.current) {
      effectRunRef.current = true;
      const audio = document.createElement("audio");
      audio.volume = SETTINGS.volume;
      const ttsAPI = new URL("https://api.streamelements.com/kappa/v2/speech");
      ttsAPI.searchParams.append("voice", SETTINGS.voice);
      ttsAPI.searchParams.append("text", text);
      audio.src = ttsAPI.toString();
      document.body.appendChild(audio);
      audio.play();
      audio.addEventListener("ended", () => audio.remove());
    }
  }, []);
};

export default useSpeak;
