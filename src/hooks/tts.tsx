import { useEffect, useRef } from "react";
import { TTS_CONFIG } from "@/const/config";

const { VOICE, VOLUME, RATE } = TTS_CONFIG;

const useSpeak = (text: string) => {
  const effectRunRef = useRef(false);
  useEffect(() => {
    if (!effectRunRef.current) {
      effectRunRef.current = true;
      const audio = document.createElement("audio");
      audio.volume = VOLUME;
      const ttsAPI = new URL("https://api.streamelements.com/kappa/v2/speech");
      ttsAPI.searchParams.append("voice", VOICE);
      ttsAPI.searchParams.append("text", text);
      audio.src = ttsAPI.toString();
      audio.playbackRate = RATE;
      document.body.appendChild(audio);
      audio.play();
      audio.addEventListener("ended", () => audio.remove());
    }
  }, []);
};

export default useSpeak;
