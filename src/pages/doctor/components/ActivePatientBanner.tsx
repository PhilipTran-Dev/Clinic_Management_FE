import { AlertTriangle, FileText } from "lucide-react";
import type { Allergy, PatientRecord } from "../data/doctorMockData";

interface ActivePatientBannerProps {
  patient: PatientRecord;
  onOpenHistory: () => void;
}

function AllergyBadge({ allergy }: { allergy: Allergy }) {
  const severe = allergy.severity === "SEVERE";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        severe
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-amber-200 bg-amber-50 text-amber-700"
      }`}
    >
      <AlertTriangle className="h-3 w-3" aria-hidden="true" />
      {allergy.name}
    </span>
  );
}

export default function ActivePatientBanner({
  patient,
  onOpenHistory,
}: ActivePatientBannerProps) {
  return (
    <div className="grid shrink-0 grid-cols-12 gap-3 border-b border-slate-200/80 bg-white p-3">
      {/* Demographics */}
      <div className="col-span-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base font-bold text-slate-900">{patient.name}</h2>
          <span className="text-xs font-medium text-slate-500">
            {patient.age} yrs, {patient.gender}
          </span>
          <span className="text-xs font-semibold text-teal-700">
            {patient.ticketNumber}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          Patient ID:{" "}
          <span className="font-mono font-medium text-slate-700">
            {patient.patientId}
          </span>{" "}
          &middot; DOB: {patient.dob}
        </p>
        <div className="mt-1.5 flex items-center gap-1.5">
          {patient.allergies.length > 0 ? (
            patient.allergies.map((allergy) => (
              <AllergyBadge key={allergy.name} allergy={allergy} />
            ))
          ) : (
            <span className="text-xs text-slate-400">No known allergies</span>
          )}
        </div>
      </div>

      {/* Vitals */}
      <div className="col-span-4 flex items-center gap-5 border-x border-slate-200/80 px-4">
        <Vital label="BP" value={patient.vitals.bp} unit="mmHg" />
        <Vital label="HR" value={String(patient.vitals.hr)} unit="bpm" />
        <Vital label="Temp" value={patient.vitals.temp} unit="" />
        <Vital label="SpO2" value={String(patient.vitals.spo2)} unit="%" />
      </div>

      {/* Medical history trigger */}
      <div className="col-span-4 flex items-center justify-end">
        <button
          type="button"
          onClick={onOpenHistory}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-teal-300 hover:text-teal-700"
        >
          <FileText className="h-4 w-4 text-teal-600" aria-hidden="true" />
          View Medical History ({patient.pastEncounters.length} previous visits)
        </button>
      </div>
    </div>
  );
}

function Vital({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-900">
        {value}
        {unit && <span className="ml-0.5 text-xs font-medium text-slate-500">{unit}</span>}
      </p>
    </div>
  );
}