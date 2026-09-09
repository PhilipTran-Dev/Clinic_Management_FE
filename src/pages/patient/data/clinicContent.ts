import {
  Baby,
  Bus,
  Car,
  Clock,
  Droplets,
  FileText,
  HeartPulse,
  Mic,
  Microscope,
  QrCode,
  ScanLine,
  Star,
  Stethoscope,
  Users,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  description: string;
  duration: string;
  icon: LucideIcon;
}

export const CLINIC_SERVICES: Service[] = [
  {
    title: "Comprehensive Allergy Testing",
    description:
      "Evidence-based skin prick and patch testing for common environmental and food allergens. Results are reviewed same-day by a board-certified allergist.",
    duration: "20-30 mins",
    icon: Droplets,
  },
  {
    title: "Respiratory & Asthma Management",
    description:
      "Spirometry-based assessment and structured asthma action plans tailored to your triggers. Includes ongoing monitoring and medication reviews.",
    duration: "15-20 mins",
    icon: Wind,
  },
  {
    title: "Pediatric Healthcare",
    description:
      "Gentle, family-centered care for infants and children, from developmental checks to allergy follow-ups. Minimally invasive sampling and clinical reassurance.",
    duration: "20-30 mins",
    icon: Baby,
  },
  {
    title: "General Internal Medicine",
    description:
      "Comprehensive adult consultations covering unexplained symptoms, chronic disease review, and preventive screening. Referrals coordinated across our network.",
    duration: "15-30 mins",
    icon: Stethoscope,
  },
  {
    title: "Dermatology & Skin Allergy",
    description:
      "Diagnosis and treatment of eczema, contact dermatitis, and urticaria with dermoscopic imaging. Personalized skincare and trigger-avoidance guidance.",
    duration: "20 mins",
    icon: Microscope,
  },
  {
    title: "Preventive Health Screenings",
    description:
      "Annual health checks covering blood panels, cardiovascular risk, and lifestyle counselling. Results delivered digitally to your patient portal.",
    duration: "30-45 mins",
    icon: HeartPulse,
  },
];

export interface Metric {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const TRUST_METRICS: Metric[] = [
  {
    value: "4.9/5",
    label: "Google Reviews & verified patient satisfaction",
    icon: Star,
  },
  {
    value: "15,000+",
    label: "Outpatient consultations completed",
    icon: Users,
  },
  {
    value: "5 Mins",
    label: "Average door-to-doctor wait with Kiosk QR",
    icon: Clock,
  },
  {
    value: "100%",
    label: "Paperless electronic health records & e-prescriptions",
    icon: FileText,
  },
];

export interface WorkflowStep {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    title: "Smart Symptom Triage",
    description:
      "Speak or type your symptoms. The AI maps them against clinical guidelines to suggest a department and assign a triage priority.",
    icon: Mic,
  },
  {
    title: "Instant Booking & Digital Pass",
    description:
      "Choose your preferred physician and receive an immediate confirmation with a VietQR digital check-in pass on your phone.",
    icon: QrCode,
  },
  {
    title: "5-Second Kiosk Check-in",
    description:
      "Scan the QR code at any clinic kiosk and receive a live queue ticket instantly - no reception lines, no paperwork.",
    icon: ScanLine,
  },
];

export interface TransitNote {
  icon: LucideIcon;
  text: string;
}

export interface ClinicLocation {
  name: string;
  address: string;
  phone: string;
  waitTime: string;
  hours: string;
  transit: TransitNote[];
}

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    name: "Adelaide Central",
    address: "12 Rundle Street, Adelaide SA 5000, Australia",
    phone: "1800 111 222",
    waitTime: "~8 mins",
    hours: "Mon - Sun: 07:30 - 20:30",
    transit: [
      { icon: Car, text: "Free onsite parking at rear entrance" },
      { icon: Bus, text: "5 min walk from Adelaide Central Bus Interchange" },
    ],
  },
  {
    name: "Hanoi Campus",
    address: "88 Hoang Dao Thuy, Cau Giay, Hanoi, Vietnam",
    phone: "1800 111 333",
    waitTime: "~12 mins",
    hours: "Mon - Sun: 07:30 - 20:30",
    transit: [
      { icon: Car, text: "Basement parking, entry via Hoang Dao Thuy lane" },
      { icon: Bus, text: "Direct bus lines 07, 24, 34 stop at the campus gate" },
    ],
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "How does the AI symptom checker protect my personal medical data?",
    answer:
      "All inputs are encrypted in transit and at rest on ISO 27001 certified infrastructure. Data is pseudonymized before analysis, never sold, and retained only as long as required by clinical and regulatory obligations.",
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer:
      "Yes. Appointments can be rescheduled or cancelled free of charge up to 4 hours before the start time directly from the patient portal or by calling the clinic line.",
  },
  {
    question: "What payment methods are supported at the clinic?",
    answer:
      "We accept VietQR and VNPay, all major credit and debit cards, and cash at our reception counters. e-Prescriptions are issued paperlessly where supported.",
  },
  {
    question: "Do I need a doctor's referral letter?",
    answer:
      "Not for most consultations. Some specialist allergy panels and insurer-reimbursed procedures may request a referral; our team will confirm this during booking.",
  },
];