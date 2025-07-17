import { REACTION_TEST_CONFIG } from "@/const/config";
/**
 * Zwraca losowe opóźnienie w ms (1-3 sekundy).
 */
export function getRandomDelay(): number {
  const { DELAY_MIN, DELAY_MAX } = REACTION_TEST_CONFIG;
  return Math.floor(Math.random() * (DELAY_MAX - DELAY_MIN)) + DELAY_MIN;
}

/**
 * Nieliniowa skala punktów za czas reakcji:
 * 300ms = 5p, 200ms = 20p, 150ms = 100p, 100ms = 400p
 * Im szybciej, tym więcej punktów (max 400, min 1)
 */
export function getPointsForReaction(ms: number): number {
  const {
    POINTS_TIER_1_MS,
    POINTS_TIER_1_VAL,
    POINTS_TIER_2_MS,
    POINTS_TIER_2_VAL,
    POINTS_TIER_3_MS,
    POINTS_TIER_3_VAL,
    POINTS_TIER_4_MS,
    POINTS_TIER_4_VAL,
  } = REACTION_TEST_CONFIG;
  if (ms >= POINTS_TIER_1_MS) return POINTS_TIER_1_VAL;
  if (ms >= POINTS_TIER_2_MS)
    return Math.round(
      POINTS_TIER_2_VAL +
        ((POINTS_TIER_1_VAL - POINTS_TIER_2_VAL) * (ms - POINTS_TIER_2_MS)) / 10
    ); // 200-299ms: 20->5
  if (ms >= POINTS_TIER_3_MS) {
    // 150-199ms: 100->20 (nieliniowo)
    // Skala wykładnicza
    const scale = (ms - POINTS_TIER_3_MS) / 5; // 0..1
    return Math.round(POINTS_TIER_3_VAL * Math.pow(0.2, scale)); // 100->20
  }
  if (ms >= POINTS_TIER_4_MS) {
    // 100-149ms: 400->100 (nieliniowo)
    const scale = (ms - POINTS_TIER_4_MS) / 5; // 0..1
    return Math.round(POINTS_TIER_4_VAL * Math.pow(0.25, scale)); // 400->100
  }
  // <100ms: zawsze 400
  return POINTS_TIER_4_VAL;
}
