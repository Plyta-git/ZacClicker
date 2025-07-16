import { useState, useRef, useCallback, useEffect } from "react";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { getRandomDelay, getPointsForReaction } from "./reactionTimeUtils";
import { REACTION_TEST_CONFIG } from "@/const/config";

const { COOLDOWN_MS, LAST_TEST_KEY } = REACTION_TEST_CONFIG;

export type ReactionPhase =
  | "idle"
  | "waiting"
  | "ready"
  | "result"
  | "cooldown";

export interface ReactionTimeTestState {
  phase: ReactionPhase;
  message: string;
  reactionTime: number | null;
  points: number | null;
  cooldownLeft: number;
  handleStart: () => void;
  handleScreenClick: () => void;
}

/**
 * Sprawdza, czy test jest na cooldownie i zwraca pozostały czas.
 */
function getCooldownLeft(): number {
  const lastTest = Number(localStorage.getItem(LAST_TEST_KEY) || 0);
  const now = Date.now();
  return Math.max(0, COOLDOWN_MS - (now - lastTest));
}

/**
 * Hook zarządzający logiką testu czasu reakcji.
 */
export function useReactionTimeTest(): ReactionTimeTestState {
  const addPoints = useGameStore((store) => store.addPoints);
  const [phase, setPhase] = useState<ReactionPhase>("idle");
  const [message, setMessage] = useState("Kliknij START, aby rozpocząć test.");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [cooldownLeft, setCooldownLeft] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Ustawia komunikat i fazę na cooldown, uruchamia licznik.
  const startCooldown = useCallback((ms: number) => {
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    setPhase("cooldown");
    setCooldownLeft(ms);
    cooldownTimerRef.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(cooldownTimerRef.current!);
          setPhase("idle");
          setMessage("Kliknij START, aby rozpocząć test.");
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
  }, []);

  // Rozpoczyna test (ekran czerwony, potem zielony po losowym czasie).
  const startTest = useCallback(() => {
    setPhase("waiting");
    setMessage("Czekaj na zielony ekran...");
    setReactionTime(null);
    setPoints(null);
    const delay = getRandomDelay();
    timerRef.current = setTimeout(() => {
      setPhase("ready");
      setMessage("Kliknij TERAZ!");
      startTimeRef.current = Date.now();
    }, delay);
  }, []);

  // Obsługuje kliknięcie ekranu (za wcześnie lub pomiar czasu reakcji).
  const handleScreenClick = useCallback(() => {
    if (phase === "waiting") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase("idle");
      setMessage("E dziadek co ty robisz?");
      return;
    }
    if (phase === "ready") {
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      setPhase("result");
      const pts = getPointsForReaction(reaction);
      addPoints(pts);
      setPoints(pts);
      if (reaction > 200) {
        setMessage(
          `Ej dziadek: ${reaction} ms.
            Zdobywasz ${pts} tylko punktów.`
        );
      } else {
        setMessage(
          `Twój czas reakcji: ${reaction} ms.
            Zdobywasz ${pts} punktów!`
        );
      }
      localStorage.setItem(LAST_TEST_KEY, Date.now().toString());
      startCooldown(COOLDOWN_MS);
    }
  }, [phase, addPoints, startCooldown]);

  // Obsługuje kliknięcie START (sprawdza cooldown, uruchamia test lub cooldown).
  const handleStart = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const left = getCooldownLeft();
    if (left > 0) {
      startCooldown(left);
      return;
    }
    startTest();
  }, [startTest, startCooldown]);

  // Wrap in ErrorBoundary if needed, but for hook, add try-catch in effects.
  // Optimize useEffect deps.
  useEffect(() => {
    try {
      const left = getCooldownLeft();
      if (left > 0) {
        startCooldown(left);
      }
    } catch (err) {
      console.error("Cooldown error:", err);
    }
  }, [startCooldown]);

  return {
    phase,
    message,
    reactionTime,
    points,
    cooldownLeft,
    handleStart,
    handleScreenClick,
  };
}
