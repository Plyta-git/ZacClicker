import { useEffect, useRef } from "react";

const SETTINGS = {
  voice: "Jacek",
  volume: 1.0,
  rate: 1.5, // Dodana prędkość odtwarzania
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
      audio.playbackRate = 1.4;
      document.body.appendChild(audio);
      audio.play();
      audio.addEventListener("ended", () => audio.remove());
    }
  }, []);
};

export default useSpeak;
