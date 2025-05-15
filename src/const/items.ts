import { StoreActions } from "@/hooks/useGameStore/useGameStore";
import { AlertTypes, EventTypes, ItemCategory } from "@/types";

const items = [
  {
    id: 1,
    name: "Większe zakole",
    deafulfPrice: 5,
    growthFactor: 1.8,
    effect: (gameStore: StoreActions) => gameStore.addPointsMultiplier(1),
    img: "/zac2.jpg",
    description: "Zwiększa mnożnik kliknięcia o +1",
    category: ItemCategory.Upgrade,
  },
  {
    id: 2,
    name: "Gucci Armia",
    deafulfPrice: 25,
    growthFactor: 1.5,
    effect: (gameStore: StoreActions) => gameStore.addPointsPSec(2),
    img: "/gucciKiedyFortnajt.gif",
    description: "Dodaje +2 zakola na sekundę",
    category: ItemCategory.Upgrade,
  },
  {
    id: 3,
    name: "Follow Alert",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Follow),
    img: "/gucciKiedyFortnajt.gif",
    description: "Aktywuje powiadomienie o nowym followie",
    category: ItemCategory.Alert,
  },
  {
    id: 4,
    name: "Donate",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Donate),
    img: "/gucciKiedyFortnajt.gif",
    description: "Aktywuje powiadomienie o donacji",
    category: ItemCategory.Alert,
  },
  {
    id: 5,
    name: "Suby",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Sub),
    img: "/gucciKiedyFortnajt.gif",
    description: "Aktywuje powiadomienie o nowej subskrypcji",
    category: ItemCategory.Alert,
  },
  {
    id: 6,
    name: "Gift Suby",
    deafulfPrice: 25,
    growthFactor: 100,
    oneTimeUse: true,
    effect: (gameStore: StoreActions) => gameStore.addAlert(AlertTypes.Gift),
    img: "/gucciKiedyFortnajt.gif",
    description: "Aktywuje powiadomienie o podarowanych subskrypcjach",
    category: ItemCategory.Alert,
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
    description:
      "Aktywuje żądanie multimediów i dodaje +10 zakoli na sekundę",
    category: ItemCategory.Event,
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
    description:
      "Aktywuje żądanie piosenki i dodaje +10 zakoli na sekundę",
    category: ItemCategory.Event,
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
    description:
      "Aktywuje wyświetlanie emotek i dodaje +10 zakoli na sekundę",
    category: ItemCategory.Event,
  },
];

export default items;
