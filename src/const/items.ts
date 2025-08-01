import { StoreActions, StoreState } from "@/hooks/useGameStore/useGameStore";
import { AlertTypes, EventTypes } from "@/types";

/**
 * Oblicza ile punktów na sekundę daje kolejny zakup Gucci Armia.
 * @param owned - liczba już posiadanych przed zakupem
 * @param base - bazowa liczba punktów za pierwszy zakup
 * @param growth - współczynnik wzrostu
 */
function getScalingPointsValue(owned: number, base = 2, growth = 1.5): number {
  return Math.round(base * Math.pow(growth, owned));
}

const items = [
  {
    id: 1,
    name: "Większe zakole",
    defaultPrice: 10,
    growthFactor: 1.9,
    effect: (gameStore: StoreActions & StoreState) => {
      const owned = gameStore.itemCounts.get(1) || 0;
      const toAdd = getScalingPointsValue(owned, 1, 1.1);
      gameStore.addPointsMultiplier(toAdd);
    },
    img: "/zac2.jpg",
  },
  {
    id: 2,
    name: "Gucci Armia",
    defaultPrice: 25,
    growthFactor: 1.5,
    effect: (gameStore: StoreActions & StoreState) => {
      const owned = gameStore.itemCounts.get(2) || 0;
      const toAdd = getScalingPointsValue(owned, 2, 1.1);
      gameStore.addPointsPSec(toAdd);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 9,
    name: "Show Emotes",
    defaultPrice: 100,
    growthFactor: 1,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.ShowEmotes);
      gameStore.addPointsPSec(5);
    },
    img: "/gucioF.png",
  },
  {
    id: 3,
    name: "Follow Alert",
    defaultPrice: 500,
    growthFactor: 1.2,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Follow);
      gameStore.increaseAlertLevel(AlertTypes.Follow);
      gameStore.addPointsPSec(12);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 11,
    name: "Twitch chat",
    defaultPrice: 200,
    growthFactor: 1.4,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.TwitchChat);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 13,
    name: "Emote Chat",
    defaultPrice: 1000,
    growthFactor: 1,
    oneTimeUse: true,
    effect: (gameStore: StoreActions & StoreState) => {
      gameStore.addEvent(EventTypes.EmoteChat);
      gameStore.addPointsPSec(25);
    },
    img: "/gucioF.png",
  },
  {
    id: 4,
    name: "Donate",
    defaultPrice: 2000,
    growthFactor: 1.2,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Donate);
      gameStore.increaseAlertLevel(AlertTypes.Donate);
      gameStore.addPointsPSec(50);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 5,
    name: "Suby",
    defaultPrice: 5000,
    growthFactor: 1.2,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Sub);
      gameStore.increaseAlertLevel(AlertTypes.Sub);
      gameStore.addPointsPSec(100);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 14,
    name: "Reklamy",
    // defaultPrice: 4000,
    defaultPrice: 1,
    growthFactor: 1,
    oneTimeUse: false,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.Ads);
      gameStore.addPointsPSec(100);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 8,
    name: "Song Request",
    defaultPrice: 7000,
    growthFactor: 1,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.SongRequest);
      gameStore.addPointsPSec(80);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 6,
    name: "Gift Suby",
    defaultPrice: 9000,
    growthFactor: 1.4,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Gift);
      gameStore.increaseAlertLevel(AlertTypes.Gift);
      gameStore.addPointsPSec(200);
    },
    img: "/gucciKiedyFortnajt.gif",
    unlockCondition: (store: StoreState) => !!store.itemCounts.get(5),
  },
  {
    id: 7,
    name: "Media Request",
    defaultPrice: 12000,
    growthFactor: 1,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.MediaRequest);
      gameStore.addPointsPSec(200);
    },
    img: "/gucciKiedyFortnajt.gif",
    unlockCondition: (store: StoreState) => !!store.itemCounts.get(8),
  },
  {
    id: 10,
    name: "Sloty",
    defaultPrice: 18000,
    growthFactor: 2.5,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addEvent(EventTypes.Slots),
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 12,
    name: "Reaction Time Test",
    defaultPrice: 22000,
    growthFactor: 2.5,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) =>
      gameStore.addEvent(EventTypes.ReactionTimeTest),
    img: "/gucciKiedyFortnajt.gif",
  },
];

export default items;

/*
Item List with default prices:
- Większe zakole: 10
- Gucci Armia: 25
- Show Emotes: 200
- Follow Alert: 500
- Media/Song Request Skip: 500
- Emote Chat: 1000
- Donate: 2000
- Suby: 4000
- reklamy: 5000
- Song Request: 7000
- Gift Suby: 9000
- Media Request: 12000
- Sloty: 18000
- Reaction Time Test: 220000
*/
