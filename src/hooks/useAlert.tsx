import useSound from "use-sound";
import useGameStore from "./useGameStore/useGameStore";
import { useEffect, useMemo, useRef } from "react";
import useSpeak from "./tts";
import {
  getRandomDonateAmount,
  getRandomDonateMessage,
  getRandomNickName,
} from "@/hooks/utils";
import { AlertTypes } from "@/types";

type AlertConfig = {
  sound: string;
  volume: number;
  points: number;
};

const getAlertConfig: Record<AlertTypes, AlertConfig> = {
  [AlertTypes.Donate]: {
    sound: "/donate.wav",
    volume: 0.2,
    points: 15,
  },
  [AlertTypes.Follow]: {
    sound: "/donate.wav",
    volume: 0.2,
    points: 15,
  },
  [AlertTypes.Gift]: {
    sound: "/donate.wav",
    volume: 0.2,
    points: 15,
  },
  [AlertTypes.Sub]: {
    sound: "/sub.wav",
    volume: 0.2,
    points: 15,
  },
  [AlertTypes.Null]: {
    sound: "/donate.wav",
    volume: 0.2,
    points: 15,
  },
};

const useAlert = (alertType: AlertTypes) => {
  const addPoints = useGameStore((store) => store.addPoints);
  const { sound, volume, points } = getAlertConfig[alertType];
  const [playSound] = useSound(sound, { volume });
  const memoizedNick = useMemo(getRandomNickName, []);
  const memoizedMessage = useMemo(getRandomDonateMessage, []);
  const memoizedAmount = useMemo(() => getRandomDonateAmount(1, 10), []);
  const hasAdded = useRef(false);
  const filteredMessage = useMemo(() => {
    if (alertType === AlertTypes.Donate && memoizedMessage) {
      const httpsIndex = memoizedMessage.indexOf("https");
      if (httpsIndex !== -1) {
        return memoizedMessage.substring(0, httpsIndex);
      }
      return memoizedMessage;
    }
    return "";
  }, [alertType, memoizedMessage]);

  useSpeak(filteredMessage);

  useEffect(() => {
    playSound();
    if (!hasAdded.current) {
      addPoints(alertType === AlertTypes.Follow ? points : memoizedAmount * 10);
      hasAdded.current = true;
    }
  }, [addPoints, playSound, points, memoizedAmount]);
  return {
    nickname: memoizedNick,
    amount: memoizedAmount,
    message: memoizedMessage,
  };
};

export default useAlert;
