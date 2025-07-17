import useGameStore from "@/hooks/useGameStore/useGameStore";
import { ALERT_CONFIG } from "@/const/config";
import { AlertTypes } from "@/types";

/**
 * Calculates the delay for a specific alert type based on its level.
 * Higher level results in a shorter delay.
 *
 * @param type The type of the alert.
 * @returns The calculated delay in milliseconds.
 */
export const calculateIndividualDelay = (type: AlertTypes): number => {
  const getAlertLevel = useGameStore.getState().getAlertLevel;
  const level = getAlertLevel(type);

  const { MIN_DELAY, MAX_DELAY, RANDOM_DELAY } = ALERT_CONFIG;
  // Use a more aggressive factor for reduction.
  const LEVEL_FACTOR = 10000;

  // Linear reduction in delay. The first level has MAX_DELAY.
  // Each subsequent level reduces the delay significantly.
  const delayReduction = (level - 1) * LEVEL_FACTOR;

  const delay = Math.max(MIN_DELAY, MAX_DELAY - delayReduction);

  return delay + Math.random() * RANDOM_DELAY;
};
