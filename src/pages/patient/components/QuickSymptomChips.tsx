import { Plus } from "lucide-react";

interface SymptomChip {
  id: string;
  label: string;
  emoji: string;
  value: string;
}

const SYMPTOM_CHIPS: SymptomChip[] = [
  { id: "fever", label: "Sốt & ớn lạnh", emoji: "🌡️", value: "Sốt và ớn lạnh" },
  { id: "sore-throat", label: "Đau rát họng", emoji: "🗣️", value: "Đau rát họng" },
  {
    id: "cough",
    label: "Ho kéo dài",
    emoji: "🫁",
    value: "Ho kéo dài",
  },
  {
    id: "rash",
    label: "Nổi mẩn ngứa",
    emoji: "🩹",
    value: "Nổi mẩn ngứa trên da",
  },
  {
    id: "stomach",
    label: "Đau bụng / buồn nôn",
    emoji: "🤢",
    value: "Đau bụng và buồn nôn",
  },
];

interface QuickSymptomChipsProps {
  onSelect: (value: string) => void;
}

export default function QuickSymptomChips({ onSelect }: QuickSymptomChipsProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Chọn triệu chứng nhanh">
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