import { useEffect, useState } from "react";
import FollowAlert from "./FollowAlert";
import SubAlert from "./SubAlert";
import DonateAlert from "./DonateAlert";
import { AlertTypes } from "@/types";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import GiftAlert from "./GiftAlert";

const AlertBox = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertTypes | null>(null);
  const activeAlerts = useGameStore((store) => store.activeAlerts);

  const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const showRandomAlert = () => {
      const randomDelay = getRandomInt(10000, 50000);
      timeoutId = setTimeout(() => {
        setAlertType(activeAlerts[getRandomInt(0, activeAlerts.length - 1)]);
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 10000);
        showRandomAlert();
      }, randomDelay);
    };
    showRandomAlert();
    return () => clearTimeout(timeoutId);
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
    <div className="w-1/4 h-1/6 absolute left-1/2 top-1/6 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
      {/* <DonateAlert /> */}
      {alertVisible && alertComponent}
    </div>
  );
};

export default AlertBox;
