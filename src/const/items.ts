import { StoreActions } from "@/hooks/useGameStore/useGameStore";
import { AlertTypes, EventTypes } from "@/types";

const items = [
  {
    id: 1,
    name: "Większe zakole",
    deafulfPrice: 5,
    growthFactor: 1.8,
    effect: (gameStore: StoreActions) => gameStore.addPointsMultiplier(1),
    img: "/zac2.jpg",
  },
  {
    id: 2,
    name: "Gucci Armia",
    deafulfPrice: 25,
    growthFactor: 1.5,
    effect: (gameStore: StoreActions) => gameStore.addPointsPSec(2),
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 3,
    name: "Follow Alert",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Follow),
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 4,
    name: "Donate",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Donate),
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 5,
    name: "Suby",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Sub),
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 6,
    name: "Gift Suby",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Gift),
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 7,
    name: "Media request",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.MediaRequest);
      gameStore.addPointsPSec(10);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 8,
    name: "Song request",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.SongRequest);
      gameStore.addPointsPSec(10);
    },
    img: "/gucciKiedyFortnajt.gif",
  },
  {
    id: 9,
    name: "Show Emotes",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => {
      gameStore.addEvent(EventTypes.ShowEmotes);
      gameStore.addPointsPSec(10);
    },
    img: "/gucioF.png",
  },
];

export default items;
