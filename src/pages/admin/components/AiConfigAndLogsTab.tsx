import { useState } from "react";
import { toast } from "sonner";
import {
  Key,
  Eye,
  EyeOff,
  Settings,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import type { OcrAuditLog } from "../data/adminMockData";
import { DOC_TYPE_LABELS } from "../data/adminMockData";

interface AiConfigAndLogsTabProps {
  ocrLogs: OcrAuditLog[];
}

export default function AiConfigAndLogsTab({ ocrLogs }: AiConfigAndLogsTabProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSttKey, setShowSttKey] = useState(false);
  const [circuitThreshold, setCircuitThreshold] = useState(5);
  const [rateLimit, setRateLimit] = useState(120);

  function handleSaveConfig() {
    toast.success("Đã lưu cấu hình hệ thống AI Gateway thành công.", { duration: 3000 });
  }

  return (
    <div className="space-y-5">
      {/* AI Gateway Settings */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center gap-2">
          <Settings size={18} className="text-slate-600" aria-hidden="true" />
          <h3 className="text-sm font-bold text-slate-900">
            AI Gateway & Cấu hình LLM
          </h3>
        </div>

        <div className="space-y-4">
          {/* OpenAI Key */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              OpenAI API Key
            </label>
            <div className="relative">
              <Key
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type={showApiKey ? "text" : "password"}
                defaultValue="sk-proj-abcdefghijklmnopqrstuvwxyz1234567890"
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-10 font-mono text-xs text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showApiKey ? "Ẩn khóa API" : "Hiện khóa API"}
              >
                {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Whisper STT Endpoint */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Whisper Speech-to-Text Model Endpoint
            </label>
            <div className="relative">
              <Activity
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type={showSttKey ? "text" : "password"}
                defaultValue="https://ai-gateway.clinic.local/stt"
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-10 font-mono text-xs text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                readOnly
              />
              <button
                type="button"
                onClick={() => setShowSttKey(!showSttKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showSttKey ? "Ẩn endpoint" : "Hiện endpoint"}
              >
                {showSttKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* PaddleOCR Worker */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              PaddleOCR Worker Host
            </label>
            <div className="relative">
              <Activity
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="text"
                defaultValue="http://localhost:8000/ocr"
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 font-mono text-xs text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
                readOnly
              />
            </div>
          </div>

          {/* Resilience Controls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Circuit Breaker Failure Threshold
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={circuitThreshold}
                  onChange={(e) => setCircuitThreshold(Number(e.target.value))}
                  className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-800"
                />
                <span className="w-12 text-right text-xs font-bold text-slate-800">
                  {circuitThreshold}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                failures liên tiếp trước khi mở Circuit Breaker
              </p>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Rate Limit (Requests / Minute)
              </label>
              <input
                type="number"
                min={10}
                max={1000}
                value={rateLimit}
                onChange={(e) => setRateLimit(Number(e.target.value))}
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
              />
              <p className="mt-1 text-[11px] text-slate-400">Số request tối đa mỗi phút</p>
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={handleSaveConfig}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-900"
            >
              <ShieldCheck size={16} aria-hidden="true" />
              Lưu Cấu Hình Hệ Thống
            </button>
          </div>
        </div>
      </div>

      {/* OCR Audit Logs */}
      <div className="rounded-xl border border-slate-200/80 bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Nhật ký Kiểm toán OCR & Telemetry
            </h3>
            <p className="text-[11px] text-slate-400">
              Dữ liệu quét từ Patient intake và Kiosk terminal
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
            {ocrLogs.length} bản ghi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 font-semibold text-slate-600">Mã lượt quét</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Loại giấy tờ</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Tên trích xuất</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Mã số bóc tách</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Độ tin cậy (%)</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Thời gian</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Kết quả</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ocrLogs.map((log) => (
                <tr key={log.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-600">{log.id}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {DOC_TYPE_LABELS[log.documentType]}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">{log.patientName}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-700">
                    {log.extractedId}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        log.confidenceScore >= 90 ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {log.confidenceScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[11px] text-slate-500">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    {log.status === "SUCCESS" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 size={10} aria-hidden="true" />
                        Khớp 100%
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                        <AlertTriangle size={10} aria-hidden="true" />
                        Cần kiểm tra lại
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
