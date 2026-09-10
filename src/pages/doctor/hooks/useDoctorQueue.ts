import { useCallback, useState } from "react";
import {
  ACTIVE_PATIENT,
  QUEUE_PATIENTS,
} from "../data/doctorMockData";
import type { PatientRecord } from "../data/doctorMockData";

function sortByPriority(queue: PatientRecord[]): PatientRecord[] {
  return [...queue].sort((a, b) => b.priorityScore - a.priorityScore);
}

export function useDoctorQueue() {
  const [activePatient, setActivePatient] = useState<PatientRecord | null>(
    ACTIVE_PATIENT,
  );
  const [queue, setQueue] = useState<PatientRecord[]>(() =>
    sortByPriority(QUEUE_PATIENTS),
  );
  const [finishedEncounters, setFinishedEncounters] = useState<string[]>([]);

  const callNext = useCallback(() => {
    setQueue((latest) => {
      if (latest.length === 0) return latest;
      const next = latest[0];
      setActivePatient((current) => (current ? current : next));
      return latest.slice(1);
    });
  }, []);

  const skipPatient = useCallback((ticketNumber: string) => {
    setQueue((latest) => {
      const target = latest.find((p) => p.ticketNumber === ticketNumber);
      if (!target) return latest;
      const rest = latest.filter((p) => p.ticketNumber !== ticketNumber);
      return sortByPriority([
        ...rest,
        {
          ...target,
          waitingMinutes: target.waitingMinutes + 4,
          priorityScore: Math.max(20, target.priorityScore - 30),
        },
      ]);
    });
  }, []);

  const finishEncounter = useCallback(
    (encounterId: string) => {
      if (!activePatient) return;
      setActivePatient(null);
      setFinishedEncounters((prev) => [...prev, encounterId]);
    },
    [activePatient],
  );

  const waitingCount = queue.length;
  const emergencyCount = queue.filter((p) => p.triage === "P1").length;

  return {
    activePatient,
    queue,
    waitingCount,
    emergencyCount,
    finishedEncounters,
    callNext,
    skipPatient,
    finishEncounter,
  };
}