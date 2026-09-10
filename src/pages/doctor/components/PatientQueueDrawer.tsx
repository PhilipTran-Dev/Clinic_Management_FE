import { AlertTriangle, ChevronRight, QrCode, Users } from "lucide-react";
import { useState } from "react";
import type { PatientRecord, TriageLevel } from "../data/doctorMockData";

interface PatientQueueDrawerProps {
  queue: PatientRecord[];
  activePatient: PatientRecord | null;
  onCallNext: () => void;
  onSkip: (ticketNumber: string) => void;
}

const TRIAGE_STYLES: Record<
  TriageLevel,
  { label: string; className: string }
> = {
  P1: {
    label: "P1 - Khẩn cấp",
    className: "border-red-200 bg-red-50 text-red-700 font-bold",
  },
  P2: {
    label: "P2 - Cần khám sớm",
    className: "border-amber-200 bg-amber-50 text-amber-700 font-semibold",
  },
  P3: {
    label: "P3 - Khám thường",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700 font-medium",
  },
};

export default function PatientQueueDrawer({
  queue,
  activePatient,
  onCallNext,
  onSkip,
}: PatientQueueDrawerProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside className="flex w-12 shrink-0 flex-col items-center gap-3 border-r border-slate-200/80 bg-white py-3">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          aria-label="Mở rộng hàng đợi bệnh nhân"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-teal-700"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
          <Users className="h-4 w-4" />
        </span>
        <span className="text-xs font-bold text-slate-900">{queue.length}</span>
      </aside>
    );
  }

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-slate-200/80 bg-white">
      {/* Drawer header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 px-3 py-2.5">
        <div>
          <p className="text-sm font-bold text-slate-900">Hàng đợi Bệnh nhân</p>
          <p className="text-xs text-slate-500">
            Sắp xếp ưu tiên theo Triage &amp; Thời gian chờ.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Thu gọn hàng đợi bệnh nhân"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-teal-700"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
        </button>
      </div>

      {/* Call next action */}
      <div className="border-b border-slate-200/80 p-3">
        <button
          type="button"
          onClick={onCallNext}
          disabled={Boolean(activePatient)}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          {activePatient
            ? `Đang khám: ${activePatient.ticketNumber}`
            : "Gọi Bệnh Nhân Tiếp Theo"}
        </button>
      </div>

      {/* Queue list */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {queue.length === 0 && (
          <p className="py-6 text-center text-xs text-slate-400">
            Hàng đợi đang trống.
          </p>
        )}
        {queue.map((patient) => {
          const triage = TRIAGE_STYLES[patient.triage];
          return (
            <article
              key={patient.ticketNumber}
              className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] ${triage.className}`}
                >
                  {triage.label}
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {patient.ticketNumber}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">
                {patient.name}
              </p>
              <p className="text-xs text-slate-500">
                {patient.age} tuổi, {patient.gender} &middot; Đến lúc{" "}
                {patient.arrivalTime} &middot; Điểm{" "}
                <span className="font-semibold text-teal-700">
                  {patient.priorityScore}
                </span>
              </p>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                {patient.chiefComplaint}
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                  {patient.source === "Kiosk QR" ? (
                    <QrCode className="h-3 w-3" />
                  ) : (
                    <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
                  )}
                  {patient.source}
                </span>
                <button
                  type="button"
                  onClick={() => onSkip(patient.ticketNumber)}
                  className="rounded-md px-2 py-1 text-[11px] font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
Bỏ qua
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}