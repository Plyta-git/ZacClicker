import { create } from "zustand";
import { AlertTypes, EventTypes, ItemType } from "@/types";
import { calculateItemPrice } from "./utils";

export type StoreState = {
  playerPoints: number;
  pointsMultiplier: number;
  pointsPSec: number;
  eq: Map<number, number>;
  activeAlerts: AlertTypes[];
  activeEvents: Record<EventTypes, boolean>;
  purchasedItems: ItemType[];
};

export type StoreActions = {
  buttonClick: () => void;
  addPoints: (qty: number) => void;
  addPointsPSec: (qty: number) => void;
  decreasePoints: (qty: number) => void;
  getPrice: (item: ItemType) => number;
  addPointsMultiplier: (qty: number) => void;
  addAlert: (alert: AlertTypes) => void;
  addEvent: (event: EventTypes) => void;
  removeEvent: (event: EventTypes) => void;
  getPlayerPoints: () => number;
  purchaseItem: (item: ItemType) => boolean;
  getItemQuantity: (itemId: number) => number;
  isPurchasable: (item: ItemType) => boolean;
  addItemToInventory: (item: ItemType) => void;
};

const useGameStore = create<StoreState & StoreActions>((set, get) => ({
  playerPoints: 0,
  pointsMultiplier: 1,
  pointsPSec: 0,
  eq: new Map<number, number>(),
  activeAlerts: [],
  activeEvents: {
    [EventTypes.MediaRequest]: false,
    [EventTypes.SongRequest]: false,
    [EventTypes.ShowEmotes]: false,
  },
  purchasedItems: [],
  addPointsPSec: (qty: number) =>
    set((state) => ({
      pointsPSec: state.pointsPSec + qty,
    })),
  addPoints: (qty: number) =>
    set((state) => ({
      playerPoints: state.playerPoints + qty,
    })),
  decreasePoints: (qty: number) =>
    set((state) => ({
      playerPoints: state.playerPoints - qty,
    })),
  buttonClick: () =>
    set((state) => ({
      playerPoints: state.playerPoints + 1 * state.pointsMultiplier,
    })),
  getPrice: (item: ItemType) => {
    const itemCount = get().eq.get(item.id) ?? 0;
    return Math.ceil(
      item.deafulfPrice * Math.pow(item.growthFactor, itemCount)
    );
  },
  addPointsMultiplier: (qty: number) => {
    const currentMult = get().pointsMultiplier;
    set({ pointsMultiplier: currentMult + qty });
  },
  addAlert: (alert: AlertTypes) => {
    const currentAlerts = get().activeAlerts;
    set({ activeAlerts: [...currentAlerts, alert] });
  },
  addEvent: (event: EventTypes) => {
    set((state) => ({
      activeEvents: {
        ...state.activeEvents,
        [event]: true,
      },
    }));
  },
  removeEvent: (event: EventTypes) => {
    set((state) => ({
      activeEvents: {
        ...state.activeEvents,
        [event]: false,
      },
    }));
  },
  getPlayerPoints: () => get().playerPoints,
  purchaseItem: (item: ItemType) => {
    const state = get();
    const itemQuantity = state.eq.get(item.id) || 0;
    const price = calculateItemPrice(item, itemQuantity);

    if (state.playerPoints < price) {
      return false;
    }

    // jednorazowe przedmioty
    if (item.oneTimeUse && itemQuantity > 0) {
      return false;
    }

    // apdejt
    set((state) => {
      const newEq = new Map(state.eq);
      newEq.set(item.id, (newEq.get(item.id) || 0) + 1);

      // dodajemy do listy
      const purchasedItems = [...state.purchasedItems];
      if (!purchasedItems.some((i) => i.id === item.id)) {
        purchasedItems.push(item);
      }

      return {
        playerPoints: state.playerPoints - price,
        eq: newEq,
        purchasedItems,
      };
    });

    item.effect(get());

    return true;
  },
  getItemQuantity: (itemId: number) => {
    return get().eq.get(itemId) || 0;
  },
  isPurchasable: (item: ItemType) => {
    const state = get();
    const itemQuantity = state.eq.get(item.id) || 0;
    const price = calculateItemPrice(item, itemQuantity);

    if (item.oneTimeUse && itemQuantity > 0) {
      return false;
    }

    return state.playerPoints >= price;
  },
  addItemToInventory: (item: ItemType) => {
    set((state) => {
      const newEq = new Map(state.eq);
      newEq.set(item.id, (newEq.get(item.id) || 0) + 1);

      return { eq: newEq };
    });
  },
}));

export default useGameStore;
