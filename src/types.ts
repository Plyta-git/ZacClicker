import { StoreActions, StoreState } from "./hooks/useGameStore/useGameStore";

export type ItemType = {
  id: number;
  name: string;
  defaultPrice: number;
  growthFactor: number;
  effect: (gameStore: StoreActions & StoreState) => void;
  img: string;
  oneTimeUse?: boolean;
  unlockCondition?: (store: StoreState) => boolean;
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
  ReactionTimeTest = "reactiontimetest",
  EmoteChat = "emotechat",
}
