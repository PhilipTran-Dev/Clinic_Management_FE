import { WORKFLOW_STEPS } from "../data/clinicContent";

export default function AiWorkflowSteps() {
  return (
    <section id="how-ai-works" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinical-600">
            How AI Works
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            From Symptom to Seat in Three Steps
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            A fully digital patient journey designed to remove waiting-room noise
            and paperwork.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative rounded-xl border border-slate-200/80 bg-white p-6 shadow-card"
              >
                <span className="absolute right-5 top-5 text-xs font-bold tracking-wide text-slate-300">
                  0{index + 1}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clinical-50 text-clinical-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}