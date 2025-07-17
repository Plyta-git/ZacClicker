import { useEffect, useMemo, useRef } from "react";
import useSound from "use-sound";
import useGameStore from "./useGameStore/useGameStore";
import useSpeak from "./tts";
import {
  getRandomDonateAmount,
  getRandomDonateMessage,
  getRandomNickName,
} from "@/hooks/utils";
import { AlertTypes } from "@/types";

interface AlertConfig {
  sound: string;
  volume: number;
  points: number;
}

const ALERT_CONFIG = {
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
} as const satisfies Record<AlertTypes, AlertConfig>;

const useAlert = (alertType: AlertTypes) => {
  const addPoints = useGameStore((state) => state.addPoints);
  const getAlertLevel = useGameStore((state) => state.getAlertLevel);
  const getAlertReward = useGameStore((state) => state.getAlertReward);

  const alertLevel = getAlertLevel(alertType);
  const { sound, volume } = ALERT_CONFIG[alertType];

  const [playSound] = useSound(sound, { volume });

  const nickname = useMemo(getRandomNickName, []);
  const message = useMemo(getRandomDonateMessage, []);
  const amount = useMemo(
    () => getRandomDonateAmount(1 + alertLevel, 10 + alertLevel * 5),
    [alertLevel]
  );

  const hasAdded = useRef(false);

  const filteredMessage = useMemo(() => {
    if (alertType === AlertTypes.Donate && message) {
      const httpsIndex = message.indexOf("https");
      return httpsIndex !== -1 ? message.substring(0, httpsIndex) : message;
    }
    return "";
  }, [alertType, message]);

  useSpeak(filteredMessage);

  useEffect(() => {
    playSound();

    if (!hasAdded.current) {
      addPoints(getAlertReward(alertType));
      hasAdded.current = true;
    }
  }, [addPoints, playSound, getAlertReward, alertType]);

  return {
    nickname,
    amount,
    message,
    alertLevel,
  } as const;
};

export default useAlert;
