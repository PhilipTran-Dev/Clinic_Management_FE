import { useCallback, useState } from "react";
import { KIOSK_PATIENT } from "../data/kioskMockData";
import type { SymptomOption } from "../data/kioskMockData";

export type KioskStep =
  | "IDLE"
  | "QR_SCAN"
  | "CARD_OCR"
  | "SYMPTOM_TRIAGE"
  | "PRINTING_TICKET"
  | "SUCCESS_SUMMARY";

export interface KioskSelection {
  symptom: SymptomOption | null;
  viaQr: boolean;
}

export function useKioskSession() {
  const [step, setStep] = useState<KioskStep>("IDLE");
  const [selection, setSelection] = useState<KioskSelection>({
    symptom: null,
    viaQr: false,
  });

  const startQrScan = useCallback(() => {
    setSelection({ symptom: null, viaQr: true });
    setStep("QR_SCAN");
  }, []);

  const startCardOcr = useCallback(() => {
    setSelection({ symptom: null, viaQr: false });
    setStep("CARD_OCR");
  }, []);

  const handleQrMatched = useCallback(() => {
    setStep("PRINTING_TICKET");
  }, []);

  const handleCardOcrComplete = useCallback(() => {
    setStep("SYMPTOM_TRIAGE");
  }, []);

  const selectSymptom = useCallback((symptom: SymptomOption) => {
    setSelection((prev) => ({ ...prev, symptom }));
  }, []);

  const proceedToPrint = useCallback(() => {
    setStep("PRINTING_TICKET");
  }, []);

  const handleTicketIssued = useCallback(() => {
    setStep("SUCCESS_SUMMARY");
  }, []);

  const openWayfinding = useCallback(() => {
    setStep("SUCCESS_SUMMARY");
  }, []);

  const reset = useCallback(() => {
    setSelection({ symptom: null, viaQr: false });
    setStep("IDLE");
  }, []);

  return {
    step,
    selection,
    patient: KIOSK_PATIENT,
    startQrScan,
    startCardOcr,
    handleQrMatched,
    handleCardOcrComplete,
    selectSymptom,
    proceedToPrint,
    handleTicketIssued,
    openWayfinding,
    reset,
  };
}