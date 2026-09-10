import { useState } from "react";
import Icd10Selector from "./Icd10Selector";
import PrescriptionDraftTable from "./PrescriptionDraftTable";
import type { IcdCode, RxLine, SoapDraft } from "../data/doctorMockData";
import type { ConsultationStatus } from "../hooks/useAmbientConsultation";

interface SoapNoteEditorProps {
  status: ConsultationStatus;
  soapDraft: SoapDraft;
  setSoapDraft: React.Dispatch<React.SetStateAction<SoapDraft>>;
  icdSuggestions: IcdCode[];
  icdAccepted: IcdCode[];
  setIcdAccepted: React.Dispatch<React.SetStateAction<IcdCode[]>>;
  rxLines: RxLine[];
  setRxLines: React.Dispatch<React.SetStateAction<RxLine[]>>;
}

const SOAP_FIELDS: {
  key: keyof SoapDraft;
  label: string;
  placeholder: string;
}[] = [
  {
    key: "subjective",
    label: "S - Subjective",
    placeholder: "Patient complaints, timeline, and reported symptoms...",
  },
  {
    key: "objective",
    label: "O - Objective",
    placeholder: "Physical exam findings, throat inspection, lung sounds, vitals...",
  },
  {
    key: "assessment",
    label: "A - Assessment",
    placeholder: "Primary clinical assessment and reasoning with ICD-10 codes...",
  },
  {
    key: "plan",
    label: "P - Plan",
    placeholder: "Treatment protocol, diagnostic orders, and home-care advice...",
  },
];

export default function SoapNoteEditor({
  status,
  soapDraft,
  setSoapDraft,
  icdSuggestions,
  icdAccepted,
  setIcdAccepted,
  rxLines,
  setRxLines,
}: SoapNoteEditorProps) {
  const [expanded, setExpanded] = useState<keyof SoapDraft | null>(null);

  const showBanner = status === "DRAFT_READY" || status === "APPROVED";

  function toggleIcd(item: IcdCode) {
    setIcdAccepted((prev) =>
      prev.some((a) => a.code === item.code)
        ? prev.filter((a) => a.code !== item.code)
        : [...prev, item],
    );
  }

  function addIcd(item: IcdCode) {
    if (!icdAccepted.some((a) => a.code === item.code)) {
      setIcdAccepted((prev) => [...prev, item]);
    }
  }

  function removeIcd(code: string) {
    setIcdAccepted((prev) => prev.filter((a) => a.code !== code));
  }

  return (
    <div className="flex-1 space-y-3 overflow-y-auto p-3">
      {showBanner && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          <span className="font-bold">[AI-Draft]</span> Generated via Whisper +
          GPT-4o - Please review and adjust before signing.
        </div>
      )}

      {/* SOAP framework */}
      <div className="grid grid-cols-2 gap-3">
        {SOAP_FIELDS.map((field) => (
          <div
            key={field.key}
            className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-card"
          >
            <label
              htmlFor={`soap-${field.key}`}
              className="text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {field.label}
            </label>
            <textarea
              id={`soap-${field.key}`}
              rows={expanded === field.key ? 8 : 3}
              value={soapDraft[field.key]}
              onChange={(e) =>
                setSoapDraft((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              onFocus={() => setExpanded(field.key)}
              onBlur={() => setExpanded(null)}
              placeholder={field.placeholder}
              className="mt-1.5 w-full resize-none rounded-md border border-slate-200 bg-white p-2 text-xs leading-relaxed text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        ))}
      </div>

      {/* ICD-10 codes */}
      <Icd10Selector
        suggestions={icdSuggestions}
        accepted={icdAccepted}
        onToggle={toggleIcd}
        onAdd={addIcd}
        onRemove={removeIcd}
      />

      {/* Prescription */}
      <PrescriptionDraftTable rxLines={rxLines} setRxLines={setRxLines} />
    </div>
  );
}