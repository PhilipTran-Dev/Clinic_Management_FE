import { Loader2, Mic, MicOff, Pause, Play, Square } from "lucide-react";
import type { ConsultationStatus } from "../hooks/useAmbientConsultation";

interface AmbientRecordingBarProps {
  status: ConsultationStatus;
  elapsedSeconds: number;
  waveform: number[];
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

export default function AmbientRecordingBar({
  status,
  elapsedSeconds,
  waveform,
  onStart,
  onPause,
  onResume,
  onFinish,
}: AmbientRecordingBarProps) {
  if (status === "IDLE") {
    return (
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-4 py-2.5">
        <p className="text-xs text-slate-500">
          Trợ lý AI lắng nghe cuộc đối thoại lâm sàng để tự động soạn bệnh án
          SOAP &amp; gợi ý mã ICD-10.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          <Mic className="h-4 w-4" aria-hidden="true" />
          Bắt đầu Thu âm Cuộc khám
        </button>
      </div>
    );
  }

  if (status === "RECORDING" || status === "PAUSED") {
    const recording = status === "RECORDING";
    return (
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white px-4 py-2.5">
        <span className="flex items-center gap-2 text-sm font-semibold text-red-600">
          {recording ? (
            <>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              ĐANG THU ÂM CUỘC KHÁM
            </>
          ) : (
            <>
              <span className="inline-block h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
              TẠM DỪNG THU ÂM
            </>
          )}
        </span>

        {/* Live visualizer */}
        <span className="flex h-6 items-center gap-0.5" aria-hidden="true">
          {waveform.map((height, index) => (
            <span
              key={index}
              className="w-1 rounded-full bg-teal-600 transition-[height] duration-150"
              style={{ height: `${height}px`, opacity: recording ? 1 : 0.35 }}
            />
          ))}
        </span>

        <span className="text-sm font-semibold tabular-nums text-slate-900">
          {formatDuration(elapsedSeconds)} phút
        </span>

        <div className="flex items-center gap-2">
          {recording ? (
            <button
              type="button"
              onClick={onPause}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Pause className="h-4 w-4" aria-hidden="true" />
              Tạm dừng
            </button>
          ) : (
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Tiếp tục
            </button>
          )}
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-1.5 rounded-lg bg-cta px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cta-hover"
          >
            <Square className="h-4 w-4" aria-hidden="true" />
            Hoàn tất Khám &amp; Sinh Bệnh án AI
          </button>
        </div>
      </div>
    );
  }

  if (status === "ANALYZING") {
    return (
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-2.5">
        <Loader2 className="h-4 w-4 animate-spin text-teal-600" aria-hidden="true" />
        <span className="text-sm font-medium text-slate-700">
          Hệ thống đang chuyển ngữ qua Whisper &amp; bóc tách bệnh án FHIR
          SOAP...
        </span>
      </div>
    );
  }

  if (status === "DRAFT_READY") {
    return (
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-200/80 bg-teal-50 px-4 py-2.5">
        <MicOff className="h-4 w-4 text-teal-700" aria-hidden="true" />
        <span className="text-sm font-semibold text-teal-800">
          🤖 Bệnh án AI đã sẵn sàng — Bác sĩ vui lòng kiểm tra và chỉnh sửa
          trước khi ký duyệt.
        </span>
      </div>
    );
  }

  return null;
}