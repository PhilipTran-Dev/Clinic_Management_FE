import { ShieldCheck } from "lucide-react";
import { MEDICAL_TEAM_IMAGE } from "../data/clinicContent";

const HIGHLIGHTS = [
  "Board-certified senior specialists across allergy, respiratory, and internal medicine",
  "Same-day clinical review and sign-off of every diagnostic result",
  "Secure patient records and e-prescriptions via HL7 FHIR interoperability",
];

export default function MedicalSpecialists() {
  return (
    <section id="specialists" className="scroll-mt-24 bg-surface-light py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Image */}
        <div
          className={`relative order-2 overflow-hidden rounded-2xl border border-slate-200/80 shadow-elevated lg:order-1 ${MEDICAL_TEAM_IMAGE.aspect}`}
        >
          <img
            src={MEDICAL_TEAM_IMAGE.url}
            alt={MEDICAL_TEAM_IMAGE.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinical-600">
            Our Medical Specialists
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Experts Who Listen, Not Just Diagnose
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Care is provided by a dedicated team of board-certified consultants
            who review every test result in person. What you see on our screens
            is shared with you in plain language - because informed patients
            recover faster.
          </p>
          <ul className="mt-6 space-y-4">
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clinical-50 text-clinical-600">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span className="text-base leading-relaxed text-slate-700">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex gap-10 border-t border-slate-200/80 pt-6">
            <div>
              <p className="text-2xl font-bold text-slate-900">15,000+</p>
              <p className="mt-1 text-sm text-slate-500">
                Consultations completed
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">4.9/5</p>
              <p className="mt-1 text-sm text-slate-500">
                Verified patient rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}