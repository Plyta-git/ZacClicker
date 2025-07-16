import { create } from "zustand";
import { AlertTypes, EventTypes, ItemType } from "@/types";
import { ALERT_CONFIG } from "@/const/config";

export type StoreState = {
  playerPoints: number;
  pointsMultiplier: number;
  pointsPSec: number;
  itemCounts: Map<number, number>;
  activeAlerts: AlertTypes[];
  activeEvents: Record<EventTypes, boolean>;
  skips: number;
  discoveredItems: Set<number>;
  availableItems: Set<number>;
  alertLevels: Map<AlertTypes, number>;
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
  discoverItem: (id: number) => void;
  markItemAvailable: (id: number) => void;
  increaseAlertLevel: (type: AlertTypes) => void;
  getAlertLevel: (type: AlertTypes) => number;
  getAlertReward: (type: AlertTypes) => number;
};

const useGameStore = create<StoreState & StoreActions>((set, get) => ({
  playerPoints: 0,
  pointsMultiplier: 1,
  pointsPSec: 0,
  itemCounts: new Map<number, number>(),
  activeAlerts: [],
  skips: 0,
  activeEvents: {
    [EventTypes.MediaRequest]: false,
    [EventTypes.SongRequest]: false,
    [EventTypes.ShowEmotes]: false,
    [EventTypes.Slots]: false,
    [EventTypes.ReactionTimeTest]: false,
    [EventTypes.EmoteChat]: false,
  },
  discoveredItems: new Set<number>(),
  availableItems: new Set<number>(),
  alertLevels: new Map<AlertTypes, number>(),
  addPointsPSec: (qty: number) =>
    set((state) => ({
      pointsPSec: state.pointsPSec + qty,
    })),
  /** @description Adds points to the player's total. */
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
    const itemCount = get().itemCounts.get(item.id) ?? 0;
    return Math.ceil(
      item.defaultPrice * Math.pow(item.growthFactor, itemCount)
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
      const currentItemCount = get().itemCounts.get(item.id) || 0;
      const newItemCounts = get().itemCounts;
      newItemCounts.set(item.id, currentItemCount + 1);
      set({ itemCounts: newItemCounts });
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
  discoverItem: (id: number) => {
    set((state) => {
      if (state.discoveredItems.has(id)) return {};
      const newSet = new Set(state.discoveredItems);
      newSet.add(id);
      return { discoveredItems: newSet };
    });
  },
  markItemAvailable: (id: number) => {
    set((state) => {
      if (state.availableItems.has(id)) return {};
      const newSet = new Set(state.availableItems);
      newSet.add(id);
      return { availableItems: newSet };
    });
  },
  increaseAlertLevel: (type: AlertTypes) => {
    set((state) => {
      const newMap = new Map(state.alertLevels);
      const current = newMap.get(type) || 0;
      newMap.set(type, current + 1);
      return { alertLevels: newMap };
    });
  },
  getAlertLevel: (type: AlertTypes) => {
    return get().alertLevels.get(type) || 0;
  },
  getAlertReward: (type: AlertTypes) => {
    // Przykład: bazowa nagroda * (1 + 0.5 * poziom)
    const { REWARD_BASE, REWARD_LEVEL_MULTIPLIER } = ALERT_CONFIG;
    const lvl = get().alertLevels.get(type) || 0;
    return Math.round(REWARD_BASE * (1 + REWARD_LEVEL_MULTIPLIER * lvl));
  },
}));

export default useGameStore;
