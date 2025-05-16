import useAlert from "@/hooks/useAlert";
import { AlertTypes } from "@/types";

const DonateAlert = () => {
  const { nickname, message, amount } = useAlert(AlertTypes.Donate);
  return (
    <div className="w-full h-full flex items-center ">
      <img className=" size-40" src="./donate.jpg"></img>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="text-xl font-bold font-[Nunito]">
          <span className=" text-donate font-bold">{nickname} </span>
          przekazał <span className="text-donate font-bold">{amount}zł</span>!
        </div>
        <div className="m-2 text-sm font-nunito text-center">{message}</div>
      </div>
    </div>
  );
};

export default DonateAlert;
