import { twitchNicks } from "@/const/nicknames";

export const getRandomNickName = () =>
  twitchNicks[Math.floor(Math.random() * twitchNicks.length)];
