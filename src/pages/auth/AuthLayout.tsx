import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { ROLE_THEMES } from "../../config/roleThemes";
import type { UserRole } from "../../types/auth";

const FEATURES = [
  "HIPAA-compliant data encryption",
  "ISO 27001 certified infrastructure",
  "Real-time FHIR R4 interoperability",
  "AI-assisted clinical decision support",
];

export default function AuthLayout() {
  const [activeRole, setActiveRole] = useState<UserRole>("PATIENT");
  const theme = ROLE_THEMES[activeRole];

  return (
    <div className="flex min-h-screen bg-surface-light">
      {/* Left / Hero Brand Section — desktop only */}
      <div
        className={`hidden w-1/2 flex-col justify-between p-10 text-white transition-colors duration-300 ease-in-out lg:flex ${theme.heroBg}`}
      >
        <div>
          <Link to="/login" className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-sm font-bold">
              SC
            </span>
            Smart Clinic
          </Link>
        </div>

        <div className="space-y-8">
          {/* Active portal mode indicator */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold transition-colors duration-300 ease-in-out">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              {theme.portalLabel} Portal Mode
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              Trusted Clinical
              <br />
              Management Platform
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-white/85">
              Streamline patient care workflows, medication dispensing, and
              administrative operations through a unified, secure dashboard.
            </p>
          </div>

          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs font-medium text-white/60">
          &copy; {new Date().getFullYear()} Smart Clinic Management System. All
          rights reserved.
        </p>
      </div>

      {/* Right / Form Section */}
      <div className="flex w-full flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile-only brand */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-600 text-sm font-bold text-white">
              SC
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Smart Clinic
            </span>
          </div>

          <Outlet context={{ activeRole, setActiveRole, theme }} />
        </div>
      </div>
    </div>
  );
}