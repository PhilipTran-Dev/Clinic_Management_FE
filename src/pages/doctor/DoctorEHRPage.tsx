import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import DoctorHeader from "./components/DoctorHeader";
import PatientQueueDrawer from "./components/PatientQueueDrawer";
import ActivePatientBanner from "./components/ActivePatientBanner";
import AmbientRecordingBar from "./components/AmbientRecordingBar";
import PatientHistoryModal from "./components/PatientHistoryModal";
import WorkspaceSplitView from "./components/WorkspaceSplitView";
import LiveTranscriptPanel from "./components/LiveTranscriptPanel";
import SoapNoteEditor from "./components/SoapNoteEditor";
import { useDoctorQueue } from "./hooks/useDoctorQueue";
import { useAmbientConsultation } from "./hooks/useAmbientConsultation";
import { ENCOUNTER_ID } from "./data/doctorMockData";

export default function DoctorEHRPage() {
  const [historyOpen, setHistoryOpen] = useState(false);

  const queue = useDoctorQueue();
  const {
    status,
    elapsedSeconds,
    waveform,
    revealedLines,
    soapDraft,
    setSoapDraft,
    icdAccepted,
    setIcdAccepted,
    icdSuggestions,
    rxLines,
    setRxLines,
    start,
    pause,
    resume,
    finish,
    approve,
  } = useAmbientConsultation();

  function handleApprove() {
    if (status !== "DRAFT_READY") return;
    if (queue.activePatient) {
      queue.finishEncounter(ENCOUNTER_ID);
    }
    approve();
    toast.success(
      `Encounter ${ENCOUNTER_ID} finalized. Prescription sent to Pharmacy Counter.`,
      { duration: 4000 },
    );
  }

  function handleSaveDraft() {
    toast.info("Draft saved locally as incomplete. Continue later.");
  }

  function handleRefer() {
    toast.info("Referral workflow initiated to hospital specialist.");
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface-light text-slate-900">
      <DoctorHeader
        waitingCount={queue.waitingCount}
        emergencyCount={queue.emergencyCount}
      />

      <div className="flex min-h-0 flex-1">
        {/* Priority queue drawer */}
        <PatientQueueDrawer
          queue={queue.queue}
          activePatient={queue.activePatient}
          onCallNext={queue.callNext}
          onSkip={queue.skipPatient}
        />

        {/* Main workspace */}
        <main className="flex min-w-0 flex-1 flex-col">
          {queue.activePatient ? (
            <>
              <ActivePatientBanner
                patient={queue.activePatient}
                onOpenHistory={() => setHistoryOpen(true)}
              />
              <AmbientRecordingBar
                status={status}
                elapsedSeconds={elapsedSeconds}
                waveform={waveform}
                onStart={start}
                onPause={pause}
                onResume={resume}
                onFinish={finish}
              />
              <WorkspaceSplitView
                left={
                  <LiveTranscriptPanel
                    status={status}
                    revealedLines={revealedLines}
                    patient={queue.activePatient}
                  />
                }
                right={
                  <SoapNoteEditor
                    status={status}
                    soapDraft={soapDraft}
                    setSoapDraft={setSoapDraft}
                    icdSuggestions={icdSuggestions}
                    icdAccepted={icdAccepted}
                    setIcdAccepted={setIcdAccepted}
                    rxLines={rxLines}
                    setRxLines={setRxLines}
                  />
                }
              />

              {/* Approval dock */}
              <footer className="flex h-14 shrink-0 items-center justify-between gap-3 border-t border-slate-200/80 bg-white px-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="inline-flex h-10 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Save Draft / Incomplete
                  </button>
                  <button
                    type="button"
                    onClick={handleRefer}
                    className="inline-flex h-10 items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <Send className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    Refer to Hospital / Specialist
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {status === "DRAFT_READY"
                      ? "AI draft pending doctor review"
                      : status === "APPROVED"
                        ? "Encounter finalized"
                        : "Awaiting AI draft"}
                  </span>
                  <button
                    type="button"
                    onClick={handleApprove}
                    disabled={status !== "DRAFT_READY"}
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-teal-600 px-8 text-base font-bold text-white shadow-md transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  >
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    Approve Medical Record &amp; Send to Pharmacy
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <div>
                <p className="text-base font-bold text-slate-900">
                  Queue ready for the next patient
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Use "Call Next Patient" in the queue drawer to start the next
                  consultation.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      <PatientHistoryModal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        patient={queue.activePatient}
      />
    </div>
  );
}