import { useState } from "react";
import { Camera, CheckCircle2, X } from "lucide-react";
import type { KioskPatient } from "../data/kioskMockData";
import { OCR_EXTRACT_SECTIONS } from "../data/kioskMockData";

interface KioskCardOcrModalProps {
  patient: KioskPatient;
  onClose: () => void;
  onComplete: () => void;
}

export default function KioskCardOcrModal({
  patient,
  onClose,
  onComplete,
}: KioskCardOcrModalProps) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  function startScan() {
    setScanning(true);
    setProgress(0);
    let current = 0;
    const interval = window.setInterval(() => {
      current += 20;
      setProgress(current);
      if (current >= 100) {
        window.clearInterval(interval);
        setScanning(false);
        window.setTimeout(onComplete, 900);
      }
    }, 360);
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Đóng quét thẻ"
        onClick={scanning ? () => undefined : onClose}
        className="absolute inset-0 bg-slate-900/40"
      />

      <div className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-lg -translate-y-1/2 px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface-light shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-5 py-3">
            <div>
              <p className="text-lg font-bold text-slate-900">
                Đăng Ký Khám Mới - Quét Thẻ BHYT / CCCD
              </p>
              <p className="text-xs text-slate-500">
                Đặt thẻ gắn chip vào khe đọc bên dưới
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng cửa sổ"
              disabled={scanning}
              className="inline-flex h-14 w-14 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-5 p-5">
            {/* Card reader bay */}
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-slate-300 bg-slate-900 p-6">
              <div className="relative flex items-center justify-center">
                <div className="rounded-lg border border-emerald-300/60 bg-emerald-950/60 px-6 py-8 text-center">
                  <p className="text-sm font-bold text-emerald-300">
                    THẺ BHYT - CHỨNG MINH NHÂN DÂN
                  </p>
                  <p className="mt-1 font-mono text-xs text-emerald-200/80">
                    {patient.insuranceSerial}
                  </p>
                </div>
                {scanning && (
                  <span
                    className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_14px_3px_rgba(16,185,129,0.9)] animate-laser-scan"
                    aria-hidden="true"
                  />
                )}
              </div>
              <p className="mt-4 flex items-center justify-center gap-1 text-xs text-slate-400">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                Khe đọc thẻ từ dưới - giữ thẻ cố định
              </p>
            </div>

            {/* OCR telemetry */}
            <div className="space-y-2">
              <p className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                🔍 PaddleOCR:{" "}
                {scanning || progress > 0
                  ? "Đang trích xuất Mã thẻ BHYT 15 ký tự, Họ tên, Nơi KCB..."
                  : "Sẵn sàng - đặt thẻ vào khe đọc bên dưới"}
              </p>
              {progress > 0 && (
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-teal-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              {!scanning && progress === 100 && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                    Xác thực thành công: {patient.patientName}
                  </p>
                  <p className="mt-1 text-xs font-medium text-emerald-700">
                    {patient.initialHospitalCode}
                  </p>
                </div>
              )}
            </div>

            {!scanning && progress === 0 && (
              <button
                type="button"
                onClick={startScan}
                className="flex h-16 w-full items-center justify-center gap-3 rounded-xl bg-teal-600 text-lg font-bold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95"
              >
                <Camera className="h-6 w-6" aria-hidden="true" />
                📥 Đặt Thẻ BHYT Mẫu Vào Khe Đọc (DN 4 79 79 12345678)
              </button>
            )}
            {scanning && (
              <div className="space-y-1">
                {OCR_EXTRACT_SECTIONS.map((section, index) => (
                  <p key={section} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${
                        progress >= (index + 1) * 20
                          ? "text-teal-600"
                          : "text-slate-300"
                      }`}
                      aria-hidden="true"
                    />
                    {section}
                  </p>
                ))}
              </div>
            )}
            {!scanning && progress === 100 && (
              <button
                type="button"
                onClick={onComplete}
                className="flex h-16 w-full items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white shadow-md transition-all hover:bg-teal-700 active:scale-95"
              >
                Tiếp Tục Khai Báo Triệu Chứng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}