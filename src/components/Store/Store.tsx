import items from "@/const/items";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { ItemType } from "@/types";
import useSound from "use-sound";

const Item: React.FC<{ item: ItemType }> = ({ item }) => {
  const gameStore = useGameStore((store) => store);
  const { getPrice, eq, playerPoints, buyItem } = gameStore;
  const itemPrice = getPrice(item);
  const [playBuyItemSound] = useSound("/buyitem.wav", { volume: 0.7 });
  const available = itemPrice < 2 * playerPoints || (eq.get(item.id) || 0) > 0;

  if (item.oneTimeUse && eq.has(item.id)) return;
  return (
    <div
      onClick={() => buyItem(item, playBuyItemSound)}
      className={`select-none transition-all flex justify-between p-2 ${
        available &&
        itemPrice < playerPoints &&
        " hover:bg-sidebar-acrive  cursor-pointer"
      }`}
    >
      <div className="flex items-center">
        <img
          className={` rounded-2xl transition-all duration-1000 mr-4 w-12 h-12 ${
            !available && " brightness-0"
          }`}
          src={item.img}
        />
        <div>
          <div
            className={` transition-all duration-1000 select-none text-2xl ${
              !available && "blur-xs select-none"
            } `}
          >
            {item.name}
          </div>
          <div className=" text-neutral-400">{itemPrice} zakoli</div>
        </div>
      </div>
      <div className="flex justify-end">{eq.get(item.id) ?? 0}</div>
    </div>
  );
};

const Store = () => {
  return (
    <div className=" rounded-none h-full">
      {items.map((item: ItemType) => (
        <Item item={item} />
      ))}
    </div>
  );
};

export default Store;
