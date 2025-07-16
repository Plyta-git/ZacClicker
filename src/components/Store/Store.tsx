import items from "@/const/items";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { ItemType } from "@/types";
import useSound from "use-sound";

const Item: React.FC<{
  item: ItemType;
  isAvailable: boolean;
  canBuy: boolean;
  isBlurred: boolean;
}> = ({ item, isAvailable, canBuy, isBlurred }) => {
  const gameStore = useGameStore((store) => store);
  const { getPrice, eq, buyItem } = gameStore;
  const itemPrice = getPrice(item);
  const [playBuyItemSound] = useSound("/buyitem.wav", { volume: 0.7 });

  if (item.oneTimeUse && eq.has(item.id)) return;
  return (
    <div
      onClick={() => canBuy && !isBlurred && buyItem(item, playBuyItemSound)}
      className={`select-none transition-all flex justify-between p-2
        ${
          canBuy && !isBlurred
            ? "bg-sidebar-bg hover:bg-sidebar-acrive cursor-pointer"
            : isAvailable
            ? "bg-sidebar-bg opacity-60"
            : "bg-sidebar-bg opacity-30"
        }
        ${canBuy && !isBlurred ? "" : "cursor-not-allowed"}
        ${isBlurred ? "blur-sm" : ""}
      `}
    >
      <div className="flex items-center">
        <img
          className={`rounded-2xl transition-all duration-1000 mr-4 w-12 h-12 ${
            !canBuy && isAvailable ? "grayscale" : ""
          } ${!isAvailable ? "brightness-0" : ""}`}
          src={item.img}
        />
        <div>
          <div
            className={`transition-all duration-1000 select-none text-2xl ${
              !canBuy && isAvailable ? "text-gray-400" : ""
            } ${!isAvailable ? "blur-xs select-none" : ""}`}
          >
            {item.name}
          </div>
          <div className="text-neutral-400">{itemPrice} zakoli</div>
        </div>
      </div>
      <div className="flex justify-end">{eq.get(item.id) ?? 0}</div>
    </div>
  );
};

const Store = () => {
  const store = useGameStore((s) => s);
  const { discoveredItems, discoverItem, availableItems, markItemAvailable } =
    store;
  // Wywołaj discoverItem dla itemów, które właśnie spełniają unlockCondition
  items.forEach((item) => {
    if (
      item.unlockCondition &&
      item.unlockCondition(store) &&
      !discoveredItems.has(item.id)
    ) {
      discoverItem(item.id);
    }
    // Dodaj do discoveredItems itemy bez unlockCondition
    if (!item.unlockCondition && !discoveredItems.has(item.id)) {
      discoverItem(item.id);
    }
  });
  // Oznaczaj item jako available, jeśli masz >=60% punktów na niego
  items.forEach((item) => {
    const itemPrice = store.getPrice(item);
    const minPoints = itemPrice * 0.6;
    if (
      discoveredItems.has(item.id) &&
      store.playerPoints >= minPoints &&
      !availableItems.has(item.id)
    ) {
      markItemAvailable(item.id);
    }
  });
  const visibleItems = items.filter((item) => discoveredItems.has(item.id));
  return (
    <div className="rounded-none h-full">
      {visibleItems.map((item, idx) => {
        const itemPrice = store.getPrice(item);
        const minPoints = itemPrice * 0.6;
        const canBuy = store.playerPoints >= itemPrice;
        const isAvailable =
          availableItems.has(item.id) || store.playerPoints >= minPoints;
        const isBlurred = !availableItems.has(item.id);
        return (
          <Item
            key={item.id ?? idx}
            item={item as ItemType}
            isAvailable={isAvailable}
            canBuy={canBuy}
            isBlurred={isBlurred}
          />
        );
      })}
    </div>
  );
};

export default Store;
