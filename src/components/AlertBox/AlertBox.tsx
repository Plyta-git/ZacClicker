import FollowAlert from "./FollowAlert";
import SubAlert from "./SubAlert";
import DonateAlert from "./DonateAlert";
import { AlertTypes } from "@/types";
import GiftAlert from "./GiftAlert";
import { useAlertScheduler } from "@/hooks/useAlertScheduler/useAlertScheduler";

const AlertBox = () => {
  const { currentAlert } = useAlertScheduler();

  const renderAlert = () => {
    if (!currentAlert) {
      return null;
    }

    switch (currentAlert) {
      case AlertTypes.Follow:
        return <FollowAlert />;
      case AlertTypes.Sub:
        return <SubAlert />;
      case AlertTypes.Donate:
        return <DonateAlert />;
      case AlertTypes.Gift:
        return <GiftAlert />;
      default:
        return null;
    }
  };

  return (
    <div className="w-1/4 h-1/6 absolute left-1/2 top-1/6 transform -translate-x-1/2 -translate-y-1/2 rounded-xl">
      {renderAlert()}
    </div>
  );
};

export default AlertBox;
