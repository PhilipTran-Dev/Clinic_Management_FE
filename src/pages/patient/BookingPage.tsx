import { useState, type FormEvent } from "react";
import { Calendar, ChevronLeft, Check, PhoneCall } from "lucide-react";
import { toast } from "sonner";
import PatientNavbar from "./components/PatientNavbar";
import PatientFooter from "./components/PatientFooter";
import SymptomsStep from "./components/SymptomsStep";
import { CLINIC_SERVICES } from "./data/clinicContent";
import type { Service } from "./data/clinicContent";

const TIME_SLOTS = [
  "08:30",
  "09:30",
  "10:30",
  "11:30",
  "14:00",
  "15:30",
  "16:30",
  "17:30",
];

const STEP_LABELS = ["Symptoms", "Department", "Confirm"];

function suggestDepartment(symptoms: string): Service | null {
  const text = symptoms.toLowerCase();
  const allergyPattern =
    /allerg|rash|itch|sneeze|hay\s?fever|wheez|hive|eczema|skin/;
  const respiratoryPattern = /asthma|cough|short\s?of\s?breath|breathless|cold/;
  const childPattern = /child|baby|toddler|infant|kid/;

  if (childPattern.test(text)) {
    return (
      CLINIC_SERVICES.find((s) => s.title === "Pediatric Healthcare") ??
      CLINIC_SERVICES[0]
    );
  }
  if (allergyPattern.test(text)) {
    return (
      CLINIC_SERVICES.find((s) => s.title === "Comprehensive Allergy Testing") ??
      CLINIC_SERVICES[0]
    );
  }
  if (respiratoryPattern.test(text)) {
    return (
      CLINIC_SERVICES.find((s) => s.title === "Respiratory & Asthma Management") ??
      CLINIC_SERVICES[0]
    );
  }
  return null;
}

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [symptoms, setSymptoms] = useState("");
  const [deptIdx, setDeptIdx] = useState<number | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const suggestion = suggestDepartment(symptoms);
  const suggestedIdx = suggestion
    ? CLINIC_SERVICES.findIndex((s) => s.title === suggestion.title)
    : null;

  function reset() {
    setStep(0);
    setSymptoms("");
    setDeptIdx(null);
    setTimeSlot(null);
    setFullName("");
    setPhone("");
  }

  function validateStep(): boolean {
    if (step === 0 && !symptoms.trim()) {
      toast.error("Please tell us a little about your symptoms so we can guide you.");
      return false;
    }
    if (step === 1) {
      if (deptIdx === null) {
        toast.error("Please choose a department.");
        return false;
      }
      if (!timeSlot) {
        toast.error("Please pick a time slot.");
        return false;
      }
    }
    if (step === 2) {
      if (!fullName.trim()) {
        toast.error("Please provide your full name.");
        return false;
      }
      if (!phone.trim() || phone.trim().length < 8) {
        toast.error("Please provide a valid phone number.");
        return false;
      }
    }
    return true;
  }

  function handleNext() {
    if (!validateStep()) return;

    if (step === 2) {
      const service = deptIdx !== null ? CLINIC_SERVICES[deptIdx] : null;
      toast.success(
        `Appointment requested for ${service?.title ?? "General Consultation"} at ${timeSlot}. We'll confirm by SMS shortly.`,
      );
      reset();
      return;
    }
    setStep((s) => s + 1);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleNext();
  }

  const inputBase =
    "h-11 w-full rounded-lg border border-slate-200 bg-white py-2.5 px-4 text-base text-slate-900 placeholder-slate-400 transition-colors focus:border-clinical-600 focus:outline-none focus:ring-2 focus:ring-clinical-500/20";

  return (
    <div className="min-h-screen bg-surface-light">
      <PatientNavbar />

      <main className="py-10 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-600 shadow-card">
              <Calendar className="h-4 w-4 text-clinical-600" />
              No upfront payment &middot; Walk-ins welcome
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Book an Appointment
            </h1>
            <p className="mt-2 text-base leading-relaxed text-slate-500">
              Three quick steps and you&apos;re done - we&apos;ll confirm by SMS.
            </p>
          </div>

          {/* Step indicator */}
          <ol className="mt-8 flex items-center">
            {STEP_LABELS.map((label, index) => {
              const done = index < step;
              const active = index === step;
              return (
                <li key={label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-300 ${
                        done
                          ? "border-clinical-600 bg-clinical-600 text-white"
                          : active
                            ? "border-clinical-600 text-clinical-700"
                            : "border-slate-200 bg-white text-slate-400"
                      }`}
                    >
                      {done ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        active ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {index < STEP_LABELS.length - 1 && (
                    <span className="mx-2 mb-5 h-px flex-1 bg-slate-200 sm:mx-4" />
                  )}
                </li>
              );
            })}
          </ol>

          {/* Step card */}
          <div className="mt-8 rounded-xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {step === 0 && (
                <SymptomsStep
                  symptoms={symptoms}
                  onChange={setSymptoms}
                  onContinue={handleNext}
                />
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <p className="mb-3 text-base font-medium text-slate-900">
                      Choose a department
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {CLINIC_SERVICES.map((service, index) => (
                        <button
                          key={service.title}
                          type="button"
                          onClick={() => setDeptIdx(index)}
                          aria-pressed={deptIdx === index}
                          className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-base transition-colors ${
                            deptIdx === index
                              ? "border-clinical-600 bg-clinical-50 text-clinical-700"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {service.title}
                          {index === suggestedIdx && (
                            <span className="ml-auto shrink-0 rounded-full bg-triage-p3-bg px-2 py-0.5 text-xs font-semibold text-triage-p3">
                              Suggested
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-base font-medium text-slate-900">
                      Pick a time slot today
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTimeSlot(slot)}
                          aria-pressed={timeSlot === slot}
                          className={`inline-flex h-10 items-center rounded-lg border px-4 text-base font-medium transition-colors ${
                            timeSlot === slot
                              ? "border-clinical-600 bg-clinical-600 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="mb-1.5 block text-base font-medium text-slate-900"
                    >
                      Full Name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="mb-1.5 block text-base font-medium text-slate-900"
                    >
                      Phone Number
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. 09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputBase}
                    />
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Booking Summary
                    </p>
                    <dl className="mt-2 space-y-1.5 text-base text-slate-600">
                      <div className="flex justify-between">
                        <dt>Department</dt>
                        <dd className="font-medium text-slate-900">
                          {deptIdx !== null
                            ? CLINIC_SERVICES[deptIdx].title
                            : "General Consultation"}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Time slot</dt>
                        <dd className="font-medium text-slate-900">
                          {timeSlot}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>Upfront payment</dt>
                        <dd className="font-medium text-slate-900">None</dd>
                      </div>
                    </dl>
                  </div>

                  <p className="inline-flex items-center gap-2 text-base font-medium text-slate-600">
                    <PhoneCall className="h-5 w-5 text-clinical-600" />
                    Need help? Call us on (028) 1900-xxxx
                  </p>
                </div>
              )}

              {/* Navigation */}
              {step > 0 && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>

                  <button
                    type="submit"
                    className={`inline-flex h-11 items-center justify-center rounded-lg px-6 text-base font-semibold text-white shadow-card transition-all hover:shadow-elevated ${
                      step === 2
                        ? "bg-cta hover:bg-cta-hover"
                        : "bg-clinical-600 hover:bg-clinical-700"
                    }`}
                  >
                    {step === 2 ? "Confirm Appointment" : "Continue"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <PatientFooter />
    </div>
  );
}