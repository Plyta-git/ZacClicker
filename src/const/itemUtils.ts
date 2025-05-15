import { ItemCategory, ItemType } from "@/types";
import { twitchNicks } from "./nicknames";

/**
 * generująca losowe efekty dla przedmiotów w zależności od kategorii
 */
export const generateItemEffect = (item: ItemType): string => {
  const randomNick = getRandomNick();
  
  switch (item.category) {
    case ItemCategory.Upgrade:
      if (item.name.toLowerCase().includes("zakole") || item.name.toLowerCase().includes("mnożnik")) {
        return `Zwiększa efektywność klikania o ${Math.round(item.growthFactor * 100)}%`;
      } else {
        return `Dodaje automatyczne generowanie zakoli`;
      }
    
    case ItemCategory.Alert:
      if (item.name.toLowerCase().includes("follow")) {
        return `${randomNick} zaczął Cię obserwować!`;
      } else if (item.name.toLowerCase().includes("donate")) {
        return `${randomNick} wpłacił datek 20 złotych!`;
      } else if (item.name.toLowerCase().includes("sub")) {
        return `${randomNick} subskrybował kanał!`;
      } else if (item.name.toLowerCase().includes("gift")) {
        return `${randomNick} podarował 5 subskrypcji!`;
      }
      return `Aktywuje alert: ${item.name}`;
    
    case ItemCategory.Event:
      if (item.name.toLowerCase().includes("media")) {
        return `${randomNick} zamówił film "Skibidi Toilet"`;
      } else if (item.name.toLowerCase().includes("song")) {
        return `${randomNick} zamówił piosenkę "Cypis - Gdzie jest biały węgorz"`;
      } else if (item.name.toLowerCase().includes("emote")) {
        return `Czat zaczyna spamować emotkami`;
      }
      return `Aktywuje wydarzenie: ${item.name}`;
    
    case ItemCategory.Consumable:
      return `Jednorazowy przedmiot z efektem specjalnym`;
    
    default:
      return item.description || "Brak opisu efektu";
  }
};

/**
 * zwracająca informację o perkach przedmiotu
 */
export const getItemBenefits = (item: ItemType): string => {
  if (item.oneTimeUse) {
    return "Przedmiot jednorazowego użytku";
  }
  
  if (item.category === ItemCategory.Upgrade) {
    if (item.effect.toString().includes("addPointsMultiplier")) {
      return `Zwiększa mnożnik kliknięcia`;
    } else if (item.effect.toString().includes("addPointsPSec")) {
      return `Zwiększa produkcję zakoli na sekundę`;
    }
  }
  
  return item.description || "Ten przedmiot ma ukryte właściwości";
};

/**
 * generująca losowy nick z listy
 */
export const getRandomNick = (): string => {
  const randomIndex = Math.floor(Math.random() * twitchNicks.length);
  return twitchNicks[randomIndex];
};

export default {
  generateItemEffect,
  getItemBenefits,
  getRandomNick
};