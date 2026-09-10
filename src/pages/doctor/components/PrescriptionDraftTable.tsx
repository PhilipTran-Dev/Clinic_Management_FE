import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PHARMACY_FORMULARY } from "../data/doctorMockData";
import type { Allergy, RxLine } from "../data/doctorMockData";

interface PrescriptionDraftTableProps {
  rxLines: RxLine[];
  setRxLines: React.Dispatch<React.SetStateAction<RxLine[]>>;
  allergies: Allergy[];
}

export default function PrescriptionDraftTable({
  rxLines,
  setRxLines,
  allergies,
}: PrescriptionDraftTableProps) {
  const [selected, setSelected] = useState(PHARMACY_FORMULARY[0].name);

  function addMedicine() {
    const med = PHARMACY_FORMULARY.find((m) => m.name === selected);
    if (!med) return;
    const newLine: RxLine = {
      id: `RX-${Date.now()}`,
      medication: med.name,
      dosageForm: med.dosageForm,
      routeFrequency: med.defaultFrequency,
      duration: med.defaultDuration,
      quantity: 1,
      stockUnits: med.stockUnits,
      bhytCoverage: med.bhytCoverage,
      isPenicillinClass: med.isPenicillinClass,
    };
    setRxLines((prev) => [...prev, newLine]);
  }

  function updateLine(id: string, patch: Partial<RxLine>) {
    setRxLines((prev) =>
      prev.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  }

  const hasPenicillinAllergy = allergies.some((a) =>
    a.name.toLowerCase().includes("penicillin"),
  );
  const hasPenicillinRx = rxLines.some((line) => line.isPenicillinClass);
  const showConflictWarning = hasPenicillinAllergy && hasPenicillinRx;

  return (
    <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Bảng Kê Đơn Thuốc
        </p>
        <span className="rounded-md bg-teal-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-teal-700">
          Đề xuất AI
        </span>
      </div>

      {showConflictWarning && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          ⚠️ CẢNH BÁO DỊ ỨNG: Bệnh nhân có tiền sử dị ứng với Penicillin! Vui
          lòng thay thế bằng nhóm kháng sinh khác.
        </div>
      )}

      <table className="mt-2 w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200 text-left text-[11px] font-semibold text-slate-500">
            <th className="py-1.5 pr-2">Tên Thuốc &amp; Hoạt chất</th>
            <th className="py-1.5 pr-2">Dạng bào chế</th>
            <th className="py-1.5 pr-2">Cách dùng &amp; Tần suất</th>
            <th className="py-1.5 pr-2">Liều dùng</th>
            <th className="py-1.5 pr-2">SL</th>
            <th className="py-1.5 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {rxLines.map((line) => {
            const lowStock = line.stockUnits < 30;
            return (
              <tr key={line.id} className="border-b border-slate-100 align-top">
                <td className="py-2 pr-2">
                  <p className="font-semibold text-slate-900">
                    {line.medication}
                  </p>
                  <span
                    className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      lowStock
                        ? "border border-amber-200 bg-amber-50 text-amber-700"
                        : "border border-teal-200 bg-teal-50 text-teal-700"
                    }`}
                  >
                    ● {lowStock ? "Sắp hết" : "Còn hàng"}: {line.stockUnits} đơn
                    vị
                  </span>
                  <span className="mt-0.5 ml-1 inline-block rounded-full border border-teal-200 bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700">
                    ● {line.bhytCoverage}
                  </span>
                </td>
                <td className="py-2 pr-2 text-slate-600">
                  {line.dosageForm}
                </td>
                <td className="py-2 pr-2">
                  <input
                    value={line.routeFrequency}
                    onChange={(e) =>
                      updateLine(line.id, { routeFrequency: e.target.value })
                    }
                    className="h-8 w-full rounded border border-slate-200 px-2 text-xs text-slate-700 focus:border-teal-500 focus:outline-none"
                  />
                </td>
                <td className="py-2 pr-2 text-slate-600">{line.duration}</td>
                <td className="py-2 pr-2">
                  <input
                    type="number"
                    min={1}
                    value={line.quantity}
                    onChange={(e) =>
                      updateLine(line.id, {
                        quantity: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                    className="h-8 w-16 rounded border border-slate-200 px-2 text-xs text-slate-700 focus:border-teal-500 focus:outline-none"
                  />
                </td>
                <td className="py-2 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setRxLines((prev) =>
                        prev.filter((item) => item.id !== line.id),
                      )
                    }
                    aria-label={`Xóa ${line.medication}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            );
          })}
          {rxLines.length === 0 && (
            <tr>
              <td colSpan={6} className="py-4 text-center text-slate-400">
                Chưa có thuốc nào được kê.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add medicine */}
      <div className="mt-2 flex items-center gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="h-9 flex-1 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:border-teal-500 focus:outline-none"
        >
          {PHARMACY_FORMULARY.map((med) => (
            <option key={med.name} value={med.name}>
              {med.name} ({med.dosageForm}) — Còn {med.stockUnits} đơn vị
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={addMedicine}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-teal-600 bg-teal-50 px-3 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-600 hover:text-white"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Thêm thuốc vào đơn
        </button>
      </div>
    </div>
  );
}