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
  mediaSkipPrice: number;
  discoveredItems: Set<number>;
  availableItems: Set<number>;
  alertLevels: Map<AlertTypes, number>;
  // Developer statistics maps
  itemSpent: Map<number, number>;
  itemPointsPSec: Map<number, number>;
  itemGenerated: Map<number, number>;
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
  skipMedia: () => boolean;
  discoverItem: (id: number) => void;
  markItemAvailable: (id: number) => void;
  increaseAlertLevel: (type: AlertTypes) => void;
  getAlertLevel: (type: AlertTypes) => number;
  getAlertReward: (type: AlertTypes) => number;
  // Dev stats actions
  addItemSpent: (id: number, amount: number) => void;
  addItemPointsPSecContribution: (id: number, amount: number) => void;
  /**
   * Adds a given amount of points to the itemGenerated map for a specific source.
   * Allows features (e.g. alert rewards) to record points that were generated
   * outside the normal per-second tick so they show up in DEV STATS.
   * @param id Numeric identifier of the source (can reuse item id or any custom id)
   * @param amount How many points were generated
   */
  addGeneratedPoints: (id: number, amount: number) => void;
  tickPoints: () => void;
};

export const selectMediaSkipCost = (state: StoreState) =>
  Math.ceil(Math.max(state.playerPoints * 0.1, state.mediaSkipPrice));

const useGameStore = create<StoreState & StoreActions>((set, get) => ({
  playerPoints: 0,
  pointsMultiplier: 1,
  pointsPSec: 0,
  itemCounts: new Map<number, number>(),
  activeAlerts: [],
  mediaSkipPrice: 100,
  activeEvents: {
    [EventTypes.MediaRequest]: false,
    [EventTypes.SongRequest]: false,
    [EventTypes.ShowEmotes]: false,
    [EventTypes.Slots]: false,
    [EventTypes.ReactionTimeTest]: false,
    [EventTypes.EmoteChat]: false,
    [EventTypes.Ads]: false,
    [EventTypes.TwitchChat]: false,
  },
  discoveredItems: new Set<number>(),
  availableItems: new Set<number>(),
  alertLevels: new Map<AlertTypes, number>(),
  // dev stats initial maps
  itemSpent: new Map<number, number>(),
  itemPointsPSec: new Map<number, number>(),
  itemGenerated: new Map<number, number>(),
  addPointsPSec: (qty: number) =>
    set((state) => ({
      pointsPSec: state.pointsPSec + qty,
    })),
  // DEV: track spent per item
  addItemSpent: (id, amount) =>
    set((state) => {
      const newMap = new Map(state.itemSpent);
      newMap.set(id, (newMap.get(id) || 0) + amount);
      return { itemSpent: newMap } as Partial<StoreState>;
    }),
  // DEV: track psec contribution per item
  addItemPointsPSecContribution: (id, amount) =>
    set((state) => {
      const newMap = new Map(state.itemPointsPSec);
      newMap.set(id, (newMap.get(id) || 0) + amount);
      return { itemPointsPSec: newMap } as Partial<StoreState>;
    }),
  // DEV: record points generated instantly by a given source (e.g. alerts)
  addGeneratedPoints: (id, amount) =>
    set((state) => {
      const newGenerated = new Map(state.itemGenerated);
      newGenerated.set(id, (newGenerated.get(id) || 0) + amount);
      return { itemGenerated: newGenerated } as Partial<StoreState>;
    }),
  // DEV: tick each second, add points and accumulate generated
  tickPoints: () =>
    set((state) => {
      const newGenerated = new Map(state.itemGenerated);
      state.itemPointsPSec.forEach((psec, id) => {
        newGenerated.set(id, (newGenerated.get(id) || 0) + psec);
      });
      return {
        playerPoints: state.playerPoints + state.pointsPSec,
        itemGenerated: newGenerated,
      } as Partial<StoreState>;
    }),
  /** @description Adds points to the player's total. */
  addPoints: (qty: number) =>
    set((state) => ({
      playerPoints: state.playerPoints + qty,
    })),
  skipMedia: () => {
    const cost = selectMediaSkipCost(get());
    const currentPoints = get().playerPoints;

    if (currentPoints >= cost) {
      get().decreasePoints(cost);
      set({ mediaSkipPrice: Math.ceil(cost * 1.2) });
      return true;
    }
    return false;
  },
  decreasePoints: (qty: number) =>
    set((state) => ({
      playerPoints: state.playerPoints - qty,
    })),
  buttonClick: () => {
    const pointsMultiplier = get().pointsMultiplier;
    get().addGeneratedPoints(1, pointsMultiplier);
    set((state) => ({
      playerPoints: state.playerPoints + 1 * state.pointsMultiplier,
    }));
  },
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
    const price = get().getPrice(item);
    const playerPoints = get().playerPoints;
    if (playerPoints >= price) {
      const pointsPSecBefore = get().pointsPSec;
      callback();
      item.effect(get());
      const pointsPSecAfter = get().pointsPSec;
      const psecIncrease = pointsPSecAfter - pointsPSecBefore;

      set((state) => {
        // update counts
        const newItemCounts = new Map(state.itemCounts);
        newItemCounts.set(item.id, (newItemCounts.get(item.id) || 0) + 1);

        // track spent
        const newSpent = new Map(state.itemSpent);
        newSpent.set(item.id, (newSpent.get(item.id) || 0) + price);

        // track psec contribution
        const newPSecMap = new Map(state.itemPointsPSec);
        if (psecIncrease > 0) {
          newPSecMap.set(
            item.id,
            (newPSecMap.get(item.id) || 0) + psecIncrease
          );
        }

        return {
          playerPoints: state.playerPoints - price,
          itemCounts: newItemCounts,
          itemSpent: newSpent,
          itemPointsPSec: newPSecMap,
        } as Partial<StoreState>;
      });
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
