import { TRUST_METRICS } from "../data/clinicContent";

export default function TrustMetrics() {
  return (
    <section className="border-y border-slate-200/80 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
        {TRUST_METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold leading-tight text-slate-900">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {metric.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}