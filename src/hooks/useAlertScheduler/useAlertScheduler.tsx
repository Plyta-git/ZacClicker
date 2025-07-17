import { useState, useEffect, useRef } from "react";
import useGameStore from "@/hooks/useGameStore/useGameStore";
import { AlertTypes } from "@/types";
import { ALERT_CONFIG } from "@/const/config";
import { calculateIndividualDelay } from "./alertUtils";

/**
 * Custom hook to manage alert scheduling and display.
 * It handles individual timers for each alert type and a queue to prevent overlap.
 */
export const useAlertScheduler = (): {
  currentAlert: AlertTypes | null;
} => {
  const activeAlerts = useGameStore((state) => state.activeAlerts);
  const [currentAlert, setCurrentAlert] = useState<AlertTypes | null>(null);
  const alertQueue = useRef<AlertTypes[]>([]).current;
  const isDisplayingAlert = useRef(false);
  const timers = useRef<Record<string, NodeJS.Timeout>>({}).current;

  const scheduleAlert = (type: AlertTypes) => {
    // Clear any existing timer for this alert type
    if (timers[type]) {
      clearTimeout(timers[type]);
    }

    // Schedule a new alert
    const delay = calculateIndividualDelay(type);
    console.log(
      `[AlertScheduler] Alert '${type}' scheduled to trigger in ${(
        delay / 1000
      ).toFixed(2)}s`
    );
    timers[type] = setTimeout(() => {
      console.log(
        `[AlertScheduler] Alert '${type}' triggered, adding to queue.`
      );
      alertQueue.push(type);
      processQueue();
      // Reschedule after it has been queued
      scheduleAlert(type);
    }, delay);
  };

  const processQueue = () => {
    if (isDisplayingAlert.current || alertQueue.length === 0) {
      return;
    }

    isDisplayingAlert.current = true;
    const nextAlert = alertQueue.shift();

    if (nextAlert) {
      console.log(
        `[AlertScheduler] Displaying alert '${nextAlert}' from queue. Queue size: ${alertQueue.length}`
      );
      setCurrentAlert(nextAlert);
      setTimeout(() => {
        setCurrentAlert(null);
        isDisplayingAlert.current = false;
        processQueue(); // Look for the next alert in the queue
      }, ALERT_CONFIG.VISIBLE_DURATION);
    } else {
      isDisplayingAlert.current = false;
    }
  };

  useEffect(() => {
    console.log(
      "[AlertScheduler] Active alerts updated:",
      JSON.stringify(activeAlerts)
    );
    // Start scheduling for all active alerts
    activeAlerts.forEach((type) => scheduleAlert(type));

    // Cleanup timers for alerts that are no longer active
    Object.keys(timers).forEach((type) => {
      if (!activeAlerts.includes(type as AlertTypes)) {
        console.log(
          `[AlertScheduler] Clearing schedule for inactive alert: ${type}`
        );
        clearTimeout(timers[type]);
        delete timers[type];
      }
    });

    return () => {
      // Clear all timers on unmount
      Object.values(timers).forEach(clearTimeout);
    };
  }, [activeAlerts]);

  return { currentAlert };
};
