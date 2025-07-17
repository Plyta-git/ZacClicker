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
    points: 100,
  },
  [AlertTypes.Follow]: {
    sound: "/donate.wav",
    volume: 0.2,
    points: 100,
  },
  [AlertTypes.Gift]: {
    sound: "/sub.wav",
    volume: 0.2,
    points: 100,
  },
  [AlertTypes.Sub]: {
    sound: "/sub.wav",
    volume: 0.2,
    points: 100,
  },
  [AlertTypes.Null]: {
    sound: "/donate.wav",
    volume: 0.2,
    points: 100,
  },
};

const useAlert = (alertType: AlertTypes) => {
  const addPoints = useGameStore((store) => store.addPoints);
  const getAlertLevel = useGameStore((store) => store.getAlertLevel);
  const getAlertReward = useGameStore((store) => store.getAlertReward);
  const addGeneratedPoints = useGameStore((store) => store.addGeneratedPoints);
  const alertLevel = getAlertLevel(alertType);
  const { sound, volume } = getAlertConfig[alertType];
  const [playSound] = useSound(sound, { volume });
  const memoizedNick = useMemo(getRandomNickName, []);
  const memoizedMessage = useMemo(getRandomDonateMessage, []);
  // Kwota rośnie z poziomem alertu
  const memoizedAmount = useMemo(
    () => getRandomDonateAmount(1 + alertLevel, 10 + alertLevel * 5),
    [alertLevel]
  );
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
      addPoints(getAlertReward(alertType));
      if (alertType === AlertTypes.Donate) {
        addGeneratedPoints(4, getAlertReward(alertType));
      }
      if (alertType === AlertTypes.Sub) {
        addGeneratedPoints(5, getAlertReward(alertType));
      }
      if (alertType === AlertTypes.Follow) {
        addGeneratedPoints(3, getAlertReward(alertType));
      }
      if (alertType === AlertTypes.Gift) {
        addGeneratedPoints(6, getAlertReward(alertType));
      }
      hasAdded.current = true;
    }
  }, [addPoints, playSound, getAlertReward, alertType]);
  return {
    nickname: memoizedNick,
    amount: memoizedAmount,
    message: memoizedMessage,
    alertLevel,
  };
};

export default useAlert;
