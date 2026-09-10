import { useEffect } from "react";

export function useKioskInactivityTimer(
  timeoutMs: number,
  onExpired: () => void,
  active: boolean,
  activityKey: number,
) {
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(onExpired, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [active, timeoutMs, onExpired, activityKey]);
}