import { Bell, FileText, Stethoscope, Users } from "lucide-react";

interface DoctorHeaderProps {
  waitingCount: number;
  emergencyCount: number;
}

const SEEN_TODAY = 12;
const AVG_CONSULTATION = "9.4 mins";

export default function DoctorHeader({
  waitingCount,
  emergencyCount,
}: DoctorHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
          <Stethoscope className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold leading-tight text-slate-900">
            Smart Clinic{" "}
            <span className="ml-1 rounded-md bg-teal-50 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-teal-700">
              Doctor EHR Portal
            </span>
          </p>
          <p className="text-xs text-slate-500">
            Current Room:{" "}
            <span className="font-medium text-slate-700">
              Room 201 (Allergy &amp; Immunology)
            </span>
          </p>
        </div>
      </div>

      {/* Consultation metrics */}
      <div className="hidden items-center gap-6 lg:flex">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-teal-600" />
          <span className="text-xs font-medium text-slate-600">
            Queue:{" "}
            <span className="font-bold text-slate-900">{waitingCount} Waiting</span>{" "}
            {emergencyCount > 0 && (
              <span className="rounded-full bg-red-50 px-1.5 py-0.5 font-semibold text-red-700">
                {emergencyCount} Emergency
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-teal-600" />
          <span className="text-xs font-medium text-slate-600">
            Seen Today:{" "}
            <span className="font-bold text-slate-900">{SEEN_TODAY} Patients</span>
          </span>
        </div>
        <div className="text-xs font-medium text-slate-600">
          Avg Consultation:{" "}
          <span className="font-bold text-slate-900">{AVG_CONSULTATION}</span>
        </div>
      </div>

      {/* Station status + profile */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Accepting Patients
        </span>
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-2.5 border-l border-slate-200/80 pl-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
            MV
          </span>
          <div>
            <p className="text-xs font-semibold text-slate-900">
              Dr. Marcus Vance, MD
            </p>
            <p className="text-[11px] text-slate-500">
              FRACP &middot; Allergist &amp; Immunologist
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}