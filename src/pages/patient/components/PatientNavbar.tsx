import { Link } from "react-router-dom";
import { Activity, ChevronDown, Clock, MapPin, PhoneCall } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Doctors", href: "#specialists" },
  { label: "Locations", href: "#locations" },
  { label: "FAQ", href: "#faq" },
];

export default function PatientNavbar() {
  return (
    <header>
      {/* Top Utility Strip */}
      <div className="hidden border-b border-slate-200/80 bg-slate-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[13px] text-slate-700 sm:px-6 lg:px-8">
          <a
            href="tel:1900 123 456"
            className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-clinical-700"
          >
            <PhoneCall className="h-3.5 w-3.5 text-clinical-600" />
            Emergency Call: 1900 123 456
          </a>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              Mon - Sun: 07:30 - 20:30
            </span>
            <span className="h-4 w-px bg-slate-300" />
            <button
              type="button"
              className="inline-flex items-center gap-1 font-medium transition-colors hover:text-clinical-700"
            >
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              Adelaide Central
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-600 text-white">
              <Activity className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Smart Clinic
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-clinical-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login?role=PATIENT"
              className="hidden h-10 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 md:inline-flex"
            >
              Patient Portal Login
            </Link>
            <Link
              to="/patient/booking"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-cta px-5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-cta-hover"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}