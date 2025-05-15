import { ItemCategory, ItemType } from "@/types";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { useCallback, useMemo } from "react";

export function useShopManager(items: ItemType[]) {
  const purchaseItem = useGameStore((state) => state.purchaseItem);
  const isPurchasable = useGameStore((state) => state.isPurchasable);
  const getItemQuantity = useGameStore((state) => state.getItemQuantity);
  const playerPoints = useGameStore((state) => state.playerPoints);
  const getPrice = useGameStore((state) => state.getPrice);
  
  // kategorie
  const categorizedItems = useMemo(() => {
    const result: Record<ItemCategory, ItemType[]> = {
      [ItemCategory.Upgrade]: [],
      [ItemCategory.Alert]: [],
      [ItemCategory.Event]: [],
      [ItemCategory.Consumable]: [],
    };
    
    items.forEach(item => {
      if (item.category) {
        result[item.category].push(item);
      } else {
        if (item.oneTimeUse) {
          result[ItemCategory.Consumable].push(item);
        } else {
          result[ItemCategory.Upgrade].push(item);
        }
      }
    });
    
    return result;
  }, [items]);
  
  const buyItem = useCallback((item: ItemType) => {
    return purchaseItem(item);
  }, [purchaseItem]);
  
  const canBuyItem = useCallback((item: ItemType) => {
    return isPurchasable(item);
  }, [isPurchasable, playerPoints]);
  
  const getQuantity = useCallback((item: ItemType) => {
    return getItemQuantity(item.id);
  }, [getItemQuantity]);
  
  const getCurrentPrice = useCallback((item: ItemType) => {
    return getPrice(item);
  }, [getPrice]);
  
  return {
    categorizedItems,
    buyItem,
    canBuyItem,
    getQuantity,
    getCurrentPrice
  };
}