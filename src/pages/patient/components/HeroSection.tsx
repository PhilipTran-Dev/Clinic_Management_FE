import { Link } from "react-router-dom";
import { Calendar, Mic, QrCode, Sparkles } from "lucide-react";

const WAVEFORM = [10, 16, 24, 14, 30, 18, 12, 26, 20, 14, 22, 11];

const QR_ROWS = [
  "1110111",
  "1001001",
  "1010111",
  "0001001",
  "1110101",
  "1001010",
  "1110111",
];

function QrMock() {
  return (
    <div className="grid shrink-0 grid-cols-7 gap-[3px] rounded-lg border border-slate-200 bg-white p-2">
      {QR_ROWS.flatMap((row, r) =>
        row.split("").map((cell, c) => (
          <span
            key={`${r}-${c}`}
            className={`h-[7px] w-[7px] rounded-[1px] ${cell === "1" ? "bg-slate-900" : "bg-white"}`}
          />
        )),
      )}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="book" className="scroll-mt-24 bg-surface-light py-14 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Column */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 shadow-card">
            <Sparkles className="h-3.5 w-3.5 text-clinical-600" />
            AI-Powered Care Navigation &middot; HL7 FHIR Compliant
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Specialized Healthcare, Streamlined by{" "}
            <span className="text-clinical-600">Clinical AI.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Self-triage your symptoms in under 30 seconds, select your physician,
            and skip the reception queue with instant Kiosk QR check-in at the
            clinic entrance.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/login?role=PATIENT"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-cta px-6 text-sm font-semibold text-white shadow-card transition-all hover:bg-cta-hover hover:shadow-elevated"
            >
              <Calendar className="h-4 w-4" />
              Book an Appointment
            </Link>
            <a
              href="#how-ai-works"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-clinical-200 bg-clinical-50 px-6 text-sm font-semibold text-clinical-700 transition-colors hover:bg-clinical-100"
            >
              <Sparkles className="h-4 w-4" />
              Start AI Symptom Triage
            </a>
          </div>
        </div>

        {/* Right Column - AI Symptom Intake Preview */}
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
            {/* Voice input waveform */}
            <div className="flex items-center gap-3 rounded-lg border border-slate-200/80 bg-slate-50 p-3.5">
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                <Mic className="relative h-4 w-4" />
              </span>
              <span className="flex h-8 flex-1 items-center gap-[3px]">
                {WAVEFORM.map((h, i) => (
                  <span
                    key={i}
                    className="w-1 animate-pulse rounded-full bg-clinical-600/70"
                    style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Listening...
              </span>
            </div>

            {/* Auto-suggested department */}
            <div className="mt-4">
              <p className="text-xs font-medium text-slate-500">
                Auto-suggested department
              </p>
              <span className="mt-1.5 inline-flex items-center rounded-full bg-triage-p2-bg px-3 py-1 text-xs font-semibold text-triage-p2">
                Allergy &amp; Clinical Immunology &middot; Priority P2 - Urgent
              </span>
            </div>

            {/* QR check-in pass mockup */}
            <div className="mt-5 flex items-center gap-4 rounded-lg border border-slate-200/80 bg-slate-50 p-3.5">
              <QrMock />
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Digital Check-in Pass
                </p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">
                  Minh Anh Tran-Lee
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Queue A-042 &middot; Adelaide Central
                </p>
              </div>
              <QrCode className="ml-auto h-4 w-4 text-clinical-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}