import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  BHYT_OCR_PILL_TEXT,
  EXTRACTED_BHYT,
} from "../data/patientMockRecords";
import type { BhyTelemetry } from "../data/patientMockRecords";

type ScanStatus = "IDLE" | "SCANNING" | "DONE";

interface BhyTOcrUploadProps {
  onExtracted: (info: BhyTelemetry) => void;
}

const DEFAULT_TOAST = "Thẻ BHYT hợp lệ. Đã tự động điền thông tin bệnh nhân.";

export default function BhyTOcrUpload({ onExtracted }: BhyTOcrUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSample, setIsSample] = useState(false);
  const [status, setStatus] = useState<ScanStatus>("IDLE");
  const [toastText, setToastText] = useState<string>(DEFAULT_TOAST);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (status !== "SCANNING") return;
    const handle = window.setTimeout(() => {
      setStatus("DONE");
      onExtracted(EXTRACTED_BHYT);
      setToastText(DEFAULT_TOAST);
      toast.success(DEFAULT_TOAST);
    }, 1500);
    return () => window.clearTimeout(handle);
  }, [status, onExtracted]);

  useEffect(() => {
    return () => {
      if (previousUrlRef.current) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
    };
  }, []);

  const beginScan = useCallback(() => {
    setStatus("SCANNING");
  }, []);

  function handleFile(file: File) {
    if (previousUrlRef.current) URL.revokeObjectURL(previousUrlRef.current);
    const url = URL.createObjectURL(file);
    previousUrlRef.current = url;
    setPreviewUrl(url);
    setIsSample(false);
    beginScan();
  }

  function handleSample() {
    if (previousUrlRef.current) {
      URL.revokeObjectURL(previousUrlRef.current);
      previousUrlRef.current = null;
    }
    setPreviewUrl(null);
    setIsSample(true);
    beginScan();
  }

  const showPreview = Boolean(previewUrl) || isSample;

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-5 text-center transition-colors hover:border-clinical-500">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Quét thẻ BHYT / Đơn thuốc cũ tự động
      </p>

      {showPreview ? (
        <div className="mx-auto mt-3 max-w-sm">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-3 shadow-card">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Ảnh thẻ BHYT"
                className="mx-auto max-h-48 w-auto object-contain"
              />
            ) : (
              <MockBhyCard />
            )}
            {status === "SCANNING" && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 h-1 rounded-full bg-clinical-400 shadow-[0_0_12px_2px_rgba(14,165,233,0.7)] animate-laser-scan"
              />
            )}
          </div>

          {status === "SCANNING" ? (
            <p className="mt-3 text-sm font-medium text-clinical-700 animate-pulse">
              🔍 {BHYT_OCR_PILL_TEXT}
            </p>
          ) : (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {toastText}
            </p>
          )}

          {status === "DONE" && (
            <dl className="mt-3 grid gap-2 rounded-lg border border-slate-200 bg-white p-3 text-left sm:grid-cols-2">
              <MetaItem label="Họ và Tên" value={EXTRACTED_BHYT.fullName} />
              <MetaItem label="Số điện thoại" value={EXTRACTED_BHYT.phone} />
              <MetaItem
                label="Mã thẻ BHYT"
                value={EXTRACTED_BHYT.insuranceCode}
              />
              <MetaItem label="Ngày sinh" value={EXTRACTED_BHYT.dateOfBirth} />
              <MetaItem
                label="Nơi KCB ban đầu"
                value={EXTRACTED_BHYT.initialHospitalCode}
                wide
              />
            </dl>
          )}
        </div>
      ) : (
        <div className="mt-3 space-y-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-clinical-600 px-6 text-base font-semibold text-white shadow-sm transition-all hover:bg-clinical-700"
          >
            <Camera className="h-5 w-5" aria-hidden="true" />
            📷 Chụp / Tải ảnh thẻ BHYT
            <Upload className="h-4 w-4" aria-hidden="true" />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={handleSample}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:border-clinical-400 hover:text-clinical-700"
          >
            <Sparkles className="h-4 w-4 text-clinical-600" aria-hidden="true" />
            Xem ảnh thẻ mẫu
          </button>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-500">
            Chụp hoặc tải ảnh thẻ BHYT Việt Nam hoặc đơn thuốc cũ để tự động
            điền thông tin cá nhân của bạn.
          </p>
        </div>
      )}
    </div>
  );
}

function MetaItem({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
}

function MockBhyCard() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-xl border border-slate-200 bg-white shadow-card">
      <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2.5 text-white">
        <p className="text-xs font-bold uppercase tracking-wide">
          Bảo Hiểm Xã Hội Việt Nam
        </p>
        <p className="text-xs font-semibold">BHYT</p>
      </div>
      <div className="space-y-2 px-4 py-3 text-left">
        <p className="font-mono text-base font-bold tracking-wider text-slate-900">
          DN 4 79 79 12345678
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="font-medium uppercase text-slate-400">Họ và Tên</p>
            <p className="font-semibold text-slate-800">NGUYỄN VĂN AN</p>
          </div>
          <div>
            <p className="font-medium uppercase text-slate-400">Ngày Sinh</p>
            <p className="font-semibold text-slate-800">14/08/1984</p>
          </div>
        </div>
      </div>
    </div>
  );
}