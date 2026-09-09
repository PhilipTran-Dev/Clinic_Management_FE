import PatientNavbar from "./components/PatientNavbar";
import HeroSection from "./components/HeroSection";
import TrustMetrics from "./components/TrustMetrics";
import ClinicalServices from "./components/ClinicalServices";
import AiWorkflowSteps from "./components/AiWorkflowSteps";
import ClinicLocations from "./components/ClinicLocations";
import ClinicalFaq from "./components/ClinicalFaq";
import PatientFooter from "./components/PatientFooter";
import MobileFloatingBar from "./components/MobileFloatingBar";

export default function PatientLandingPage() {
  return (
    <div className="min-h-screen bg-surface-light pb-24 text-slate-900 md:pb-0">
      <PatientNavbar />
      <main>
        <HeroSection />
        <TrustMetrics />
        <ClinicalServices />
        <AiWorkflowSteps />
        <ClinicLocations />
        <ClinicalFaq />
      </main>
      <PatientFooter />
      <MobileFloatingBar />
    </div>
  );
}