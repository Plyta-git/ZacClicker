/**
 * Zwraca losowe opóźnienie w ms (1-3 sekundy).
 */
export function getRandomDelay(): number {
  return Math.floor(Math.random() * 2000) + 1000;
}

/**
 * Nieliniowa skala punktów za czas reakcji:
 * 300ms = 5p, 200ms = 20p, 150ms = 100p, 100ms = 400p
 * Im szybciej, tym więcej punktów (max 400, min 1)
 */
export function getPointsForReaction(ms: number): number {
  if (ms >= 300) return 5;
  if (ms >= 200) return Math.round(20 + ((5 - 20) * (ms - 200)) / 100); // 200-299ms: 20->5
  if (ms >= 150) {
    // 150-199ms: 100->20 (nieliniowo)
    // Skala wykładnicza
    const scale = (ms - 150) / 50; // 0..1
    return Math.round(100 * Math.pow(0.2, scale)); // 100->20
  }
  if (ms >= 100) {
    // 100-149ms: 400->100 (nieliniowo)
    const scale = (ms - 100) / 50; // 0..1
    return Math.round(400 * Math.pow(0.25, scale)); // 400->100
  }
  // <100ms: zawsze 400
  return 400;
}
