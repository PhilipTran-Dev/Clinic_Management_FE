import { useEffect, useState } from "react";
import { CheckCircle2, MapPin, Printer } from "lucide-react";
import type { KioskPatient, SymptomOption } from "../data/kioskMockData";
import {
  ESTIMATED_WAIT_MINUTES,
  PATIENTS_AHEAD,
  QUEUE_PRIORITY_SCORE,
  ROOMS,
  TICKET_NUMBER,
} from "../data/kioskMockData";

interface KioskTicketDispenserModalProps {
  patient: KioskPatient;
  symptom: SymptomOption | null;
  onIssued: () => void;
  onWayfinding: () => void;
  onClose: () => void;
  countdown: number;
}

export default function KioskTicketDispenserModal({
  patient,
  symptom,
  onIssued,
  onWayfinding,
  onClose,
  countdown,
}: KioskTicketDispenserModalProps) {
  const [peeling, setPeeling] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPeeling(true);
      window.setTimeout(onIssued, 700);
    }, 1300);
    return () => window.clearTimeout(timer);
  }, [onIssued]);

  const priorityLabel =
    symptom?.triage === "P1"
      ? "KHẨN CẤP"
      : symptom?.triage === "P2"
        ? "CẦN KHÁM SỚM"
        : "THƯỜNG";

  const triageClass =
    symptom?.triage === "P1"
      ? "border-red-200 bg-red-50 text-red-700"
      : symptom?.triage === "P2"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const room = symptom?.room ?? "Phòng 201";
  const department = symptom?.department ?? "Khoa Dị ứng & Miễn dịch lâm sàng";
  const roomInfo = ROOMS.find((r) => room.includes(r.number));
  const doctor = roomInfo?.doctor ?? "PGS. TS. BS. Trần Minh Tuấn";

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/40" />

      <div className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-md -translate-y-1/2 px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-light shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-5 py-3">
            <p className="flex items-center gap-2 text-lg font-bold text-slate-900">
              <Printer className="h-6 w-6 text-teal-600" aria-hidden="true" />
              In Phiếu Số Thứ Tự
            </p>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700">
              Redis Enqueue • {QUEUE_PRIORITY_SCORE} điểm
            </span>
          </div>

          <div className="relative overflow-hidden p-6">
            {/* Printer slot */}
            <div className="mx-auto mb-4 h-3 w-3/4 rounded-t-xl bg-slate-800" />
            <div className="h-px w-3/4 bg-slate-300" />

            {/* Thermal ticket paper */}
            <div
              className={`mx-auto w-3/4 rounded-b-xl border border-slate-300 bg-white p-4 text-center shadow-card transition-transform duration-500 ${
                peeling ? "translate-y-56" : ""
              }`}
              style={{ transformOrigin: "top" }}
            >
              <p className="text-[10px] font-bold tracking-wide text-slate-500">
                SMART CLINIC - PHÒNG KHÁM ĐA KHOA THÔNG MINH
              </p>
              <p className="mt-1 font-mono text-[10px] text-slate-400">
                *--- #APT-2026-*---*---2026-*
              </p>

              <p className="mt-3 text-[48px] font-bold leading-none text-slate-900">
                {TICKET_NUMBER}
              </p>

              <span
                className={`mx-auto mt-2 inline-block rounded-full border px-3 py-1 text-xs font-bold ${triageClass}`}
              >
                ƯU TIÊN {priorityLabel}
              </span>

              <p className="mt-3 text-[11px] font-semibold text-slate-700">
                {patient.patientName} • Mã BHYT: {patient.insuranceCode}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-slate-700">
                {room} (TẦNG 2) • Bác sĩ: {doctor}
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                ~{ESTIMATED_WAIT_MINUTES} phút ({PATIENTS_AHEAD} người đang khám
                phía trước)
              </p>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="flex h-12 w-12 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-400">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="h-10 w-px bg-slate-200" />
                <span className="font-mono text-[10px] text-slate-400">
                  |||||||||||||||||||||||||||||||||
                </span>
              </div>
            </div>
          </div>

          {!peeling ? (
            <p className="px-6 pb-6 text-center text-xs text-slate-500">
              Đang in phiếu xếp hàng... Vui lòng đợi giây lát
            </p>
          ) : (
            <div className="space-y-3 px-6 pb-6">
              <button
                type="button"
                onClick={onWayfinding}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-clinical-600 text-sm font-bold text-white shadow-md transition-all hover:bg-clinical-700 active:scale-95"
              >
                <MapPin className="h-5 w-5" aria-hidden="true" />
                🗺️ Xem Chỉ Đường Đến {department}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-14 w-full items-center justify-center rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-700 transition-all active:scale-95"
              >
                Hoàn Tất &amp; Về Màn Hình Chính ({countdown}s)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}