import { Car, Clock, MapPin, QrCode } from "lucide-react";
import { CLINIC_FACILITY_IMAGE } from "../data/clinicContent";

const FACILITY_DETAILS = [
  {
    icon: Clock,
    label: "Opening Hours",
    value: "Mon - Sun: 07:30 - 20:30",
  },
  {
    icon: Car,
    label: "Parking",
    value: "Free onsite parking at rear entrance",
  },
  {
    icon: QrCode,
    label: "Express Check-in",
    value: "~5 min QR kiosk queue, then straight to your consultation room",
  },
];

export default function ClinicFacility() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Image */}
        <div
          className={`relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-elevated ${CLINIC_FACILITY_IMAGE.aspect}`}
        >
          <img
            src={CLINIC_FACILITY_IMAGE.url}
            alt={CLINIC_FACILITY_IMAGE.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-clinical-600">
            Walk-In Ready
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            A Modern, Accredited Facility
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            Our clinics are designed to feel calm, clean, and easy to navigate.
            At peak times, the express QR kiosk keeps your wait to just a few
            minutes from the front door to the consultation room.
          </p>

          <ul className="mt-6 space-y-4">
            {FACILITY_DETAILS.map((detail) => {
              const Icon = detail.icon;
              return (
                <li key={detail.label} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {detail.label}
                    </p>
                    <p className="mt-0.5 text-base leading-relaxed text-slate-600">
                      {detail.value}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 inline-flex items-center gap-2 text-base font-medium text-slate-600">
            <MapPin className="h-5 w-5 text-clinical-600" />
            All branches accept walk-ins throughout opening hours.
          </p>
        </div>
      </div>
    </section>
  );
}