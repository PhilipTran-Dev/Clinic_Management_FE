import { Plus } from "lucide-react";

interface SymptomChip {
  id: string;
  label: string;
  emoji: string;
  value: string;
}

const SYMPTOM_CHIPS: SymptomChip[] = [
  { id: "fever", label: "Fever & Chills", emoji: "🌡️", value: "Fever and chills" },
  { id: "sore-throat", label: "Sore Throat", emoji: "🗣️", value: "Sore throat" },
  {
    id: "cough",
    label: "Persistent Cough",
    emoji: "🫁",
    value: "Persistent cough",
  },
  {
    id: "rash",
    label: "Itchy Skin Rash",
    emoji: "🩹",
    value: "Itchy skin rash",
  },
  {
    id: "stomach",
    label: "Abdominal Pain / Nausea",
    emoji: "🤢",
    value: "Abdominal pain and nausea",
  },
];

interface QuickSymptomChipsProps {
  onSelect: (value: string) => void;
}

export default function QuickSymptomChips({ onSelect }: QuickSymptomChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Quick symptom tags">
      {SYMPTOM_CHIPS.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => onSelect(chip.value)}
          className="inline-flex min-h-12 cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-4 text-base text-slate-700 transition-colors hover:border-clinical-300 hover:bg-clinical-50 hover:text-clinical-700"
        >
          <span aria-hidden="true">{chip.emoji}</span>
          {chip.label}
          <Plus className="h-4 w-4 text-slate-400" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}