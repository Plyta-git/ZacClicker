import { StoreActions, StoreState } from "@/hooks/useGameStore/useGameStore";
import { AlertTypes, EventTypes } from "@/types";

/**
 * Oblicza ile punktów na sekundę daje kolejny zakup Gucci Armia.
 * @param owned - liczba już posiadanych przed zakupem
 * @param base - bazowa liczba punktów za pierwszy zakup
 * @param growth - współczynnik wzrostu
 */
function getPointsPSec(owned: number, base = 2, growth = 1.5): number {
  return Math.round(base * Math.pow(growth, owned));
}

const items = [
  {
    id: 1,
    name: "Większe zakole",
    deafulfPrice: 10,
    growthFactor: 1.9,
    effect: (gameStore: StoreActions & StoreState) => {
      const owned = gameStore.eq.get(1) || 0;
      const toAdd = getPointsPSec(owned, 1, 1.1);
      gameStore.addPointsMultiplier(toAdd);
    },
    img: "/zac2.jpg",
  },
  {
    id: 2,
    name: "Gucci Armia",
    deafulfPrice: 25,
    growthFactor: 1.9,
    effect: (gameStore: StoreActions & StoreState) => {
      const owned = gameStore.eq.get(2) || 0;
      const toAdd = getPointsPSec(owned, 2, 1.1);
      gameStore.addPointsPSec(toAdd);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 3,
    name: "Follow Alert",
    deafulfPrice: 100,
    growthFactor: 2.2,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Follow);
      gameStore.increaseAlertLevel(AlertTypes.Follow);
      gameStore.addPointsPSec(5);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 9,
    name: "Show Emotes",
    deafulfPrice: 200,
    growthFactor: 2.2,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.ShowEmotes);
      gameStore.addPointsPSec(10);
    },
    img: "/gucioF.png",
  },
  {
    id: 4,
    name: "Donate",
    deafulfPrice: 1500,
    growthFactor: 2.2,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Donate);
      gameStore.increaseAlertLevel(AlertTypes.Donate);
      gameStore.addPointsPSec(10);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 5,
    name: "Suby",
    deafulfPrice: 1000,
    growthFactor: 2.2,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Sub);
      gameStore.increaseAlertLevel(AlertTypes.Sub);
      gameStore.addPointsPSec(20);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 8,
    name: "Song Request",
    deafulfPrice: 3000,
    growthFactor: 2.5,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.SongRequest);
      gameStore.addPointsPSec(10);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 7,
    name: "Media Request",
    deafulfPrice: 2000,
    growthFactor: 2.5,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.MediaRequest);
      gameStore.addPointsPSec(10);
    },
    img: "/gucciKiedyFortnajt.gif",
    unlockCondition: (store: StoreState) => !!store.eq.get(8),
  },
  {
    id: 11,
    name: "Media/Song Request Skip",
    deafulfPrice: 500,
    growthFactor: 1.5,
    effect: (gameStore: StoreActions) => gameStore.addSkip(1),
    img: "/gucciKiedyFortnajt.gif",
    unlockCondition: (store: StoreState) =>
      !!store.eq.get(7) || !!store.eq.get(8), // po Media lub Song
  },
  {
    id: 6,
    name: "Gift Suby",
    deafulfPrice: 3000,
    growthFactor: 2.2,
    effect: (gameStore: StoreActions) => {
      gameStore.addAlert(AlertTypes.Gift);
      gameStore.increaseAlertLevel(AlertTypes.Gift);
      gameStore.addPointsPSec(40);
    },
    img: "/gucciKiedyFortnajt.gif",
    unlockCondition: (store: StoreState) => !!store.eq.get(5),
  },
  {
    id: 13,
    name: "Emote Chat",
    deafulfPrice: 5000,
    growthFactor: 2.5,
    oneTimeUse: true,
    effect: (gameStore: StoreActions & StoreState) => {
      gameStore.addEvent(EventTypes.EmoteChat);
      gameStore.addPointsPSec(20);
    },
    img: "/gucioF.png",
  },
  {
    id: 10,
    name: "Sloty",
    deafulfPrice: 7000,
    growthFactor: 2.5,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addEvent(EventTypes.Slots),
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 12,
    name: "Reaction Time Test",
    deafulfPrice: 10000,
    growthFactor: 2.5,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) =>
      gameStore.addEvent(EventTypes.ReactionTimeTest),
    img: "/gucciKiedyFortnajt.gif",
    unlockCondition: (store: StoreState) => !!store.eq.get(5), // po Subach
  },
];

export default items;
