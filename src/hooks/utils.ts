import { donateMessages, twitchNicks } from "@/const/nicknames";

export const getRandomNickName = () =>
  twitchNicks[Math.floor(Math.random() * twitchNicks.length)];

export const getRandomDonateMessage = () =>
  donateMessages[Math.floor(Math.random() * donateMessages.length)];

export const getRandomDonateAmount = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
