import { useState, useCallback } from "react";
import type { StaffAccount, OcrAuditLog } from "../data/adminMockData";
import { MOCK_SYSTEM_METRICS, MOCK_STAFF, MOCK_OCR_LOGS } from "../data/adminMockData";

export function useAdminMetrics() {
  const metrics = MOCK_SYSTEM_METRICS;
  const [staffList, setStaffList] = useState<StaffAccount[]>(MOCK_STAFF);
  const [ocrLogs] = useState<OcrAuditLog[]>(MOCK_OCR_LOGS);

  const toggleStaffStatus = useCallback((staffId: string) => {
    setStaffList((prev) =>
      prev.map((s) =>
        s.id === staffId
          ? { ...s, status: s.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" }
          : s,
      ),
    );
  }, []);

  const addStaff = useCallback((newStaff: StaffAccount) => {
    setStaffList((prev) => [...prev, newStaff]);
  }, []);

  return { metrics, staffList, ocrLogs, toggleStaffStatus, addStaff };
}
