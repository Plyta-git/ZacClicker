import { create } from "zustand";
import { AlertTypes, EventTypes, ItemType } from "@/types";

export type StoreState = {
  playerPoints: number;
  pointsMultiplier: number;
  pointsPSec: number;
  eq: Map<number, number>;
  activeAlerts: AlertTypes[];
  activeEvents: Record<EventTypes, boolean>;
  skips: number;
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
  buyItem: (item: ItemType, callback: () => void) => void;
  addSkip: (qty: number) => void;
  removeSkip: (qty: number) => void;
};

const useGameStore = create<StoreState & StoreActions>((set, get) => ({
  playerPoints: 0,
  pointsMultiplier: 1,
  pointsPSec: 0,
  eq: new Map<number, number>(),
  activeAlerts: [],
  skips: 0,
  activeEvents: {
    [EventTypes.MediaRequest]: false,
    [EventTypes.SongRequest]: false,
    [EventTypes.ShowEmotes]: false,
    [EventTypes.Slots]: false,
  },
  addPointsPSec: (qty: number) =>
    set((state) => ({
      pointsPSec: state.pointsPSec + qty,
    })),
  addPoints: (qty: number) =>
    set((state) => ({
      playerPoints: state.playerPoints + qty,
    })),
  addSkip: (qty: number) =>
    set((state) => ({
      skips: state.skips + qty,
    })),
  removeSkip: (qty: number) =>
    set((state) => ({
      skips: state.skips - qty,
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
  buyItem: (item: ItemType, callback: () => void) => {
    const currentItemPrice = get().getPrice(item);
    const playerPoints = get().playerPoints;
    if (playerPoints >= currentItemPrice) {
      callback();
      item.effect(get());
      get().decreasePoints(currentItemPrice);
      const currentItemCount = get().eq.get(item.id) || 0;
      const newEq = get().eq;
      newEq.set(item.id, currentItemCount + 1);
      set({ eq: newEq });
    }
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
}));

export default useGameStore;
