import useAlert from "@/hooks/useAlert";
import { AlertTypes } from "@/types";

const FollowAlert = () => {
  const { nickname } = useAlert(AlertTypes.Follow);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      nowy follow:<div className=" text-donate text-xl">{nickname}</div>
    </div>
  );
};

export default FollowAlert;
