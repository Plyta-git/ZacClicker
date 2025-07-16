import useAlert from "@/hooks/useAlert";
import { AlertTypes } from "@/types";

const GiftAlert = () => {
  const { nickname, amount } = useAlert(AlertTypes.Gift);
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex flex-col justify-center items-center">
        <div className="text-xl font-bold font-[Nunito]">
          <span className=" text-donate font-bold">{nickname} </span>
          podarował <span className="text-donate font-bold">{amount}</span>{" "}
          subów!
        </div>
      </div>
    </div>
  );
};

export default GiftAlert;
