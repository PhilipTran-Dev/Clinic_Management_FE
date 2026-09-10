import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, RotateCcw, Square, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { useSpeechRecognition } from "../../../hooks/useSpeechRecognition";

interface VoiceInputCardProps {
  value: string;
  onChange: (value: string) => void;
}

const LANGS = [
  { code: "en-US", label: "EN" },
  { code: "vi-VN", label: "VI" },
];

const SIMULATION_MESSAGE =
  "Microphone access unavailable. Starting dictation simulation.";

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

export default function VoiceInputCard({
  value,
  onChange,
}: VoiceInputCardProps) {
  const {
    isListening,
    isFallback,
    transcript,
    interimTranscript,
    isSupported,
    error,
    recordingTime,
    lang,
    setLang,
    start,
    stop,
    reset,
  } = useSpeechRecognition();

  const [base, setBase] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const spoken = [transcript, interimTranscript]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");

  const liveValue = isListening
    ? base
      ? `${base.trimEnd()}. ${spoken}`
      : spoken
    : value;

  useEffect(() => {
    if (error === SIMULATION_MESSAGE) {
      toast.info("Thiết bị chưa cấp quyền micro. Đang kích hoạt mô phỏng giọng nói.");
    }
  }, [error]);

  useEffect(() => {
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }
    if (!isListening && base !== null) {
      const finalSpoken = [transcript, interimTranscript]
        .map((part) => part.trim())
        .filter(Boolean)
        .join(" ");
      if (finalSpoken) {
        onChange(base.trim() ? `${base.trimEnd()}. ${finalSpoken}` : finalSpoken);
      }
      reset();
    }
  }, [base, interimTranscript, isListening, onChange, reset, transcript]);

  function startListening() {
    if (isListening) return;
    cancelledRef.current = false;
    setBase(value);
    start();
  }

  function doneListening() {
    stop();
  }

  function cancelDictation() {
    cancelledRef.current = true;
    stop();
    reset();
  }

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
      {/* Label */}
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clinical-50 text-clinical-600">
          <Mic className="h-5 w-5" />
        </span>
        <label
          htmlFor="booking-symptoms"
          className="text-lg font-semibold text-slate-900"
        >
          Lý do bạn đến khám hôm nay là gì?
        </label>
      </div>
      <p className="mt-2 text-base leading-relaxed text-slate-500">
        Mô tả tình trạng của bạn theo lời nói, hoặc chạm micro để ghi âm.
      </p>

      {/* Textarea */}
      <textarea
        id="booking-symptoms"
        rows={5}
        value={liveValue}
        onChange={(e) => onChange(e.target.value)}
        readOnly={isListening}
        placeholder="Ví dụ: Tôi bị nổi mẩn ngứa ở tay một tuần nay, kèm hắt hơi nhiều lúc sáng..."
        className="mt-4 min-h-[160px] w-full rounded-lg border border-slate-200 bg-white p-4 text-base leading-relaxed text-slate-800 placeholder:text-slate-400 transition-colors outline-none focus:border-clinical-600 focus:ring-2 focus:ring-clinical-500/20 md:text-lg"
      />

      {/* Active recording banner */}
      {isListening && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-clinical-100 bg-clinical-50 p-3"
        >
          <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>

          {/* Animated waveform */}
          <span className="flex h-5 items-center gap-1" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={`w-1 rounded-full bg-clinical-600 animate-pulse ${
                  bar % 2 === 0 ? "h-3" : "h-5"
                }`}
                style={{ animationDelay: `${bar * 120}ms` }}
              />
            ))}
          </span>

          <span className="text-base font-medium text-slate-900">
            {isFallback ? "Đang mô phỏng lời nói..." : "Đang lắng nghe..."}
          </span>
          <span className="tabular-nums text-base font-semibold text-clinical-700">
            {formatDuration(recordingTime)}
          </span>

          <span className="ml-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={doneListening}
              className="inline-flex h-12 items-center gap-1.5 rounded-lg bg-clinical-600 px-4 text-base font-medium text-white transition-colors hover:bg-clinical-700"
            >
              <Square className="h-4 w-4" aria-hidden="true" />
              Xong
            </button>
            <button
              type="button"
              onClick={cancelDictation}
              className="inline-flex h-12 items-center gap-1.5 px-3 text-base font-medium text-slate-500 transition-colors hover:text-slate-700"
            >
              <MicOff className="h-4 w-4" aria-hidden="true" />
              Hủy
            </button>
          </span>
        </div>
      )}

      {/* Default mic controls */}
      {!isListening && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={startListening}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-clinical-200 bg-clinical-50 px-5 text-base font-medium text-clinical-700 shadow-sm transition-all hover:bg-clinical-100"
          >
            <Mic className="h-5 w-5" aria-hidden="true" />
            Chạm để nói
          </button>

          <div
            role="group"
            aria-label="Ngôn ngữ đọc lời nói"
            className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1"
          >
            {LANGS.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLang(item.code)}
                aria-pressed={lang === item.code}
                className={`inline-flex h-12 min-w-12 items-center justify-center rounded-lg px-3 text-base font-medium transition-colors ${
                  lang === item.code
                    ? "bg-white text-clinical-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex h-12 items-center gap-1.5 rounded-xl px-4 text-base font-medium text-slate-500 transition-colors hover:text-slate-700"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Xóa nội dung
            </button>
          )}
        </div>
      )}

      {/* Unsupported / error info */}
      {!isSupported && !isListening && (
        <p className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
          <Volume2 className="h-4 w-4 shrink-0 text-clinical-600" />
          Trình duyệt không hỗ trợ nhập liệu bằng giọng nói. Bạn có thể gõ
          triệu chứng hoặc chọn các thẻ triệu chứng nhanh bên dưới.
        </p>
      )}
    </div>
  );
}