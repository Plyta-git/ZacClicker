import useAlert from "@/hooks/useAlert";
import { AlertTypes } from "@/types";

function monthFormat(monthCount: number): string {
  const lastTwoDigits = monthCount % 100;
  const lastDigit = monthCount % 10;

  let suffix: string;

  if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
    suffix = "miesięcy";
  } else if (lastDigit === 1) {
    suffix = "miesiąc";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    suffix = "miesiące";
  } else {
    suffix = "miesięcy";
  }

  return suffix;
}

const SubAlert = () => {
  const { nickname, message, amount } = useAlert(AlertTypes.Sub);
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center">
        <div className="text-xl font-bold font-[Nunito]">
          <span className=" text-donate font-bold">{nickname} </span>
          jest już w Guciowni{" "}
          <span className="text-donate font-bold">{amount}</span>{" "}
          {monthFormat(amount)}!
        </div>
        <div className="m-2 text-sm font-nunito text-center">{message}</div>
      </div>
    </div>
  );
};

export default SubAlert;
