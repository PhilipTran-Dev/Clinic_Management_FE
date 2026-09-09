import { Link } from "react-router-dom";
import { Activity, BadgeCheck, PhoneCall, ShieldCheck } from "lucide-react";
import { CLINIC_SERVICES } from "../data/clinicContent";

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Doctors", href: "#specialists" },
  { label: "Locations", href: "#locations" },
  { label: "Appointments & Pricing", href: "#faq" },
];

export default function PatientFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-600 text-white">
                <Activity className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Smart Clinic
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              A modern, AI-informed clinic network focused on safe, accessible
              and completely paperless patient care.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-clinical-600" />
                ISO 27001
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <BadgeCheck className="h-3.5 w-3.5 text-clinical-600" />
                HL7 FHIR R4
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-clinical-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Clinical Services
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {CLINIC_SERVICES.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="transition-colors hover:text-clinical-700"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Emergency & Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="tel:1900 123 456"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-clinical-700"
                >
                  <PhoneCall className="h-4 w-4 text-clinical-600" />
                  1900 123 456
                </a>
              </li>
              <li className="text-sm text-slate-500">
                Mon - Sun: 07:30 - 20:30
              </li>
              <li className="text-sm text-slate-500">
                Contactable by phone, portal chat, or in-person at any branch.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 py-6">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Smart Clinic Management System. All
            rights reserved.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Accredited clinic network &middot; Practice ID 12345 &middot; ISO
            27001 certified infrastructure &middot; HL7 FHIR R4 interoperable.
            For life-threatening emergencies, call 000.
          </p>
        </div>
      </div>
    </footer>
  );
}