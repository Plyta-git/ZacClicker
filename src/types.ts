import { StoreActions } from "./hooks/useGameStore/useGameStore";

export enum ItemCategory {
  Upgrade = "upgrade",
  Alert = "alert",
  Event = "event",
  Consumable = "consumable",
}

export type ItemType = {
  id: number;
  name: string;
  deafulfPrice: number;
  growthFactor: number;
  effect: (gameStore: StoreActions) => void;
  img: string;
  oneTimeUse?: boolean;
  description?: string;
  category?: ItemCategory;
  maxQuantity?: number;
};

export enum AlertTypes {
  Follow = "follow",
  Sub = "sub",
  Donate = "donate",
  Gift = "gift",
  Null = "null",
}

export enum EventTypes {
  MediaRequest = "mediarequest",
  SongRequest = "songrequest",
  ShowEmotes = "showemotes",
}
