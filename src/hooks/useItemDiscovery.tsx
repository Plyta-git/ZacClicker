import { useEffect } from "react";
import useGameStore from "./useGameStore/useGameStore";
import items from "@/const/items";
import { STORE_CONFIG } from "@/const/config";

export const useItemDiscovery = () => {
  const store = useGameStore();
  const { discoveredItems, discoverItem, availableItems, markItemAvailable } =
    store;

  useEffect(() => {
    items.forEach((item) => {
      if (
        item.unlockCondition &&
        item.unlockCondition(store) &&
        !discoveredItems.has(item.id)
      ) {
        discoverItem(item.id);
      }
      if (!item.unlockCondition && !discoveredItems.has(item.id)) {
        discoverItem(item.id);
      }
    });
  }, [store, discoverItem, discoveredItems]);

  useEffect(() => {
    items.forEach((item) => {
      const itemPrice = store.getPrice(item);
      const minPoints = itemPrice * STORE_CONFIG.MIN_POINTS_RATIO;
      if (
        discoveredItems.has(item.id) &&
        store.playerPoints >= minPoints &&
        !availableItems.has(item.id)
      ) {
        markItemAvailable(item.id);
      }
    });
  }, [
    store,
    markItemAvailable,
    availableItems,
    discoveredItems,
    store.playerPoints,
  ]);
};
