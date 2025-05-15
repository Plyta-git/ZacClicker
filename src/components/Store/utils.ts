import { StoreActions, StoreState } from "@/hooks/useGameStore/useGameStore";
import { ItemType } from "@/types";
import { PlayFunction } from "node_modules/use-sound/dist/types";

export const onBuyItem = (
  item: ItemType,
  gameStore: StoreActions & StoreState,
  playBuyItemSound: PlayFunction
) => {
  const { getPrice, decreasePoints, playerPoints, eq } = gameStore;
  const currentItemPrice = getPrice(item);
  if (playerPoints >= currentItemPrice) {
    playBuyItemSound();
    item.effect(gameStore);
    decreasePoints(currentItemPrice);
    const currentItemCount = eq.get(item.id) || 0;
    eq.set(item.id, currentItemCount + 1);
  }
};
