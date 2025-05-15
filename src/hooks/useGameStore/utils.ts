import { ItemType } from "@/types";
import { StoreActions } from "./useGameStore";

/**
 * jakas tam matma ceny
 */
export const calculateItemPrice = (
  item: ItemType,
  quantity: number = 0
): number => {
  return Math.ceil(item.deafulfPrice * Math.pow(item.growthFactor, quantity));
};

/**
 * czy gracz może kupić przedmiot
 */
export const canBuyItem = (
  item: ItemType,
  playerPoints: number,
  ownedQuantity: number = 0
): boolean => {
  const price = calculateItemPrice(item, ownedQuantity);
  return playerPoints >= price;
};

/**
 * kupowanie przedmiotuf
 */
export const buyItem = (
  item: ItemType,
  gameStore: StoreActions,
  ownedQuantity: number = 0
): boolean => {
  const price = calculateItemPrice(item, ownedQuantity);
  
  if (gameStore.getPlayerPoints() < price) {
    return false;
  }
  
  // Pobierz punkty i aktywuj efekt
  gameStore.decreasePoints(price);
  item.effect(gameStore);
  
  return true;
};

/**
 * kategorie
 */
export const categorizeItems = (items: ItemType[]): Record<string, ItemType[]> => {
  const categories: Record<string, ItemType[]> = {
    upgrades: [],
    consumables: [],
    events: [],
    alerts: [],
  };
  
  items.forEach(item => {
    if (item.oneTimeUse) {
      // Rozróżnij eventy od alertów
      if (item.name.toLowerCase().includes("alert") || 
          item.name.toLowerCase().includes("sub") ||
          item.name.toLowerCase().includes("donate") ||
          item.name.toLowerCase().includes("gift")) {
        categories.alerts.push(item);
      } else {
        categories.events.push(item);
      }
    } else {
      categories.upgrades.push(item);
    }
  });
  
  return categories;
};