import { useEffect, useState, useRef } from "react";
import FollowAlert from "./FollowAlert";
import SubAlert from "./SubAlert";
import DonateAlert from "./DonateAlert";
import { AlertTypes } from "@/types";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import GiftAlert from "./GiftAlert";
import { ALERT_CONFIG } from "@/const/config";

const AlertBox = () => {
  const activeAlerts = useGameStore((store) => store.activeAlerts);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertTypes | null>(null);

  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const showAlert = (type: AlertTypes) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setAlertType(type);
    setAlertVisible(true);

    hideTimeoutRef.current = setTimeout(() => {
      setAlertVisible(false);
    }, ALERT_CONFIG.VISIBLE_DURATION); // alert visible for 10s
  };

  // Calculates delay based on current alert levels
  const calculateDelay = () => {
    const getAlertLevel = useGameStore.getState().getAlertLevel;
    let totalLevel = 0;
    activeAlerts.forEach((type) => {
      totalLevel += getAlertLevel(type);
    });

    const { MIN_DELAY, MAX_DELAY, LEVEL_FACTOR, RANDOM_DELAY } = ALERT_CONFIG;
    const levelFactor = Math.max(1, totalLevel);

    // Higher totalLevel -> shorter delay but never below minDelay
    return Math.max(
      MIN_DELAY,
      MAX_DELAY - levelFactor * LEVEL_FACTOR + getRandomInt(0, RANDOM_DELAY)
    );
  };

  // Schedule next random alert
  const scheduleNextAlert = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }
    const delay = calculateDelay();
    showTimeoutRef.current = setTimeout(() => {
      if (activeAlerts.length > 0) {
        const randomType =
          activeAlerts[getRandomInt(0, activeAlerts.length - 1)];
        showAlert(randomType);
      }
      scheduleNextAlert();
    }, delay);
  };

  // Start / restart scheduling whenever list of active alerts changes
  useEffect(() => {
    scheduleNextAlert();
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [activeAlerts]);

  let alertComponent = null;
  switch (alertType) {
    case AlertTypes.Follow:
      alertComponent = <FollowAlert />;
      break;
    case AlertTypes.Sub:
      alertComponent = <SubAlert />;
      break;
    case AlertTypes.Donate:
      alertComponent = <DonateAlert />;
      break;
    case AlertTypes.Gift:
      alertComponent = <GiftAlert />;
      break;
    default:
      alertComponent = null;
  }

  return (
    <div className=" w-1/4 h-1/6 absolute left-1/2 top-1/6 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
      {/* <DonateAlert /> */}
      {alertVisible && alertComponent}
    </div>
  );
};

export default AlertBox;
