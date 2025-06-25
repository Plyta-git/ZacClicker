import { StoreActions } from "./hooks/useGameStore/useGameStore";

export type ItemType = {
  id: number;
  name: string;
  deafulfPrice: number;
  growthFactor: number;
  effect: (gameStore: StoreActions) => void;
  img: string;
  oneTimeUse?: boolean;
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
  Slots = "slots",
}
