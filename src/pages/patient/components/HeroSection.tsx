import { Link } from "react-router-dom";
import { Calendar, PhoneCall, ShieldCheck } from "lucide-react";
import { HERO_CONSULTATION_IMAGE } from "../data/clinicContent";

export default function HeroSection() {
  return (
    <section className="bg-surface-light py-14 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Column */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 shadow-card">
            <ShieldCheck className="h-4 w-4 shrink-0 text-clinical-600" />
            Official Partner of National Health Interoperability &middot; HL7
            FHIR Standard
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Compassionate Medical Care,{" "}
            <span className="text-clinical-600">Zero Waiting Lines.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
            Book a guaranteed consultation with our senior specialists in under
            2 minutes, or check in at our modern walk-in clinic.
          </p>

          <div className="mt-8">
            <Link
              to="/patient/booking"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-cta px-8 text-lg font-semibold text-white shadow-md transition-all hover:bg-cta-hover"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book an Appointment
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Quick 2-minute booking &middot; No upfront payment required
              &middot; Walk-ins welcome
            </p>
          </div>

          <a
            href="tel:028 1900 0000"
            className="mt-6 inline-flex items-center gap-2 text-base font-medium text-slate-600 transition-colors hover:text-clinical-700"
          >
            <PhoneCall className="h-5 w-5 text-clinical-600" />
            Emergency &amp; Assistance: (028) 1900-xxxx
          </a>
        </div>

        {/* Right Column - Clinical Imagery Anchor */}
        <div className="mx-auto w-full max-w-2xl">
          <div
            className={`relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-elevated ${HERO_CONSULTATION_IMAGE.aspect}`}
          >
            <img
              src={HERO_CONSULTATION_IMAGE.url}
              alt={HERO_CONSULTATION_IMAGE.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Glassmorphism queue badge */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3.5 py-2 shadow-elevated backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-triage-p3 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-triage-p3" />
              </span>
              <span className="text-sm font-semibold text-slate-900">
                Active Walk-in Queue:{" "}
                <span className="font-medium text-slate-600">
                  ~5 mins wait time
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}