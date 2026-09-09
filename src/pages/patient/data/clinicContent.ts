import {
  Baby,
  Bus,
  Car,
  Clock,
  Droplets,
  FileText,
  HeartPulse,
  Microscope,
  MousePointerClick,
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
    title: "Choose or Describe",
    description:
      "Pick your specialist or let our assistant identify the right department from your symptoms.",
    icon: MousePointerClick,
  },
  {
    title: "Instant Booking Pass",
    description:
      "Receive a clear SMS and QR code confirmation with your exact appointment window.",
    icon: QrCode,
  },
  {
    title: "5-Second Express Check-in",
    description:
      "Walk into our clinic, tap your QR code at the entrance kiosk, and head straight to your consultation room.",
    icon: ScanLine,
  },
];

export interface ClinicImage {
  url: string;
  alt: string;
  aspect: string;
}

export const HERO_CONSULTATION_IMAGE: ClinicImage = {
  url: "https://images.squarespace-cdn.com/content/v1/638de650c7378132a12e7c95/44b144e6-000e-4683-ad81-67a3aaf73089/TR4-5-min.jpg",
  alt: "A warm, reassuring conversation between a senior doctor and a patient at the clinic.",
  aspect: "aspect-[4/3]",
};

export const CLINIC_FACILITY_IMAGE: ClinicImage = {
  url: "https://www.albanyclinic.ca/wp-content/uploads/2024/10/albany-medical-clinic-walk-in-clinic.jpg",
  alt: "Modern, clean and sterile medical facility with a walk-in reception area.",
  aspect: "aspect-[16/10]",
};

export interface StaffMember {
  id: string;
  name: string;
  role: "DOCTOR" | "NURSE";
  title: string;
  age: number;
  department: string;
  specialty: string;
  experienceYears: number;
  qualifications: string[];
  languages: string[];
  email: string;
  phone: string;
  extension: string;
  roomNumber: string;
  imageUrl: string;
  availableToday: boolean;
  bio: string;
}

export const MEDICAL_STAFF: StaffMember[] = [
  {
    id: "marcus-vance",
    name: "Dr. Marcus Vance",
    role: "DOCTOR",
    title: "Senior Consultant, Allergy & Immunology",
    age: 48,
    department: "Allergy & Clinical Immunology",
    specialty: "Adult Anaphylaxis & Desensitization",
    experienceYears: 18,
    qualifications: ["MD", "FRACP"],
    languages: ["English", "French"],
    email: "dr.marcus.vance@smartclinic.com",
    phone: "+84 (028) 3900 1201",
    extension: "Ext. 201",
    roomNumber: "Suite 201 (Level 2)",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBr682FWZs0BV7dL-JcrfD6AXLDzubmbjCQ4XEHJjcWhYDGbCtYEL8-os&s=10",
    availableToday: true,
    bio: "Senior Consultant specializing in complex allergen immunotherapy, patch testing, and respiratory immunology.",
  },
  {
    id: "muzammil-ahmed",
    name: "Dr. Muzammil Ahmed",
    role: "DOCTOR",
    title: "Consultant Physician, Internal Medicine",
    age: 42,
    department: "General Internal Medicine",
    specialty: "Preventive Medicine & Diagnostic Triage",
    experienceYears: 14,
    qualifications: ["MBBS", "MD"],
    languages: ["English", "Hindi", "Urdu"],
    email: "dr.ahmed.muzammil@smartclinic.com",
    phone: "+84 (028) 3900 1104",
    extension: "Ext. 104",
    roomNumber: "Suite 104 (Level 1)",
    imageUrl:
      "https://content.jdmagicbox.com/v2/comp/hyderabad/m7/040pxx40.xx40.221119220243.t2m7/catalogue/health-care-clinic-dr-muzammil-ahmed-santosh-nagar-hyderabad-clinics-q70ci2fawq.jpg",
    availableToday: true,
    bio: "Board-certified physician dedicated to outpatient diagnostic triage, chronic disorder stabilization, and metabolic care.",
  },
  {
    id: "elena-rostova",
    name: "Dr. Elena Rostova",
    role: "DOCTOR",
    title: "Consultant ENT Surgeon",
    age: 45,
    department: "Ear, Nose & Throat (ENT)",
    specialty: "Rhinology, Sinus Surgery & Airway Care",
    experienceYears: 16,
    qualifications: ["MD", "PhD"],
    languages: ["English", "Russian"],
    email: "dr.elena.rostova@smartclinic.com",
    phone: "+84 (028) 3900 1205",
    extension: "Ext. 205",
    roomNumber: "Suite 205 (Level 2)",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5QbsbX2YbWKJgZlFJhxs8qOjEw1FrCdCepjQi-sHvwrV4KesoqxqIIA&s=10",
    availableToday: true,
    bio: "ENT specialist with extensive clinical research in allergic rhinitis, vocal health, and minimally invasive nasal treatments.",
  },
  {
    id: "julian-chen",
    name: "Dr. Julian Chen",
    role: "DOCTOR",
    title: "Consultant Pediatrician",
    age: 39,
    department: "Pediatrics & Family Medicine",
    specialty: "Pediatric Asthma & Food Allergy Screening",
    experienceYears: 11,
    qualifications: ["BMed", "FRACGP"],
    languages: ["English", "Mandarin"],
    email: "dr.julian.chen@smartclinic.com",
    phone: "+84 (028) 3900 1108",
    extension: "Ext. 108",
    roomNumber: "Suite 108 (Level 1)",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuCAPQj7GqGxzxy5XysDPR2WuiS7o1U_WR7dIzgAFYppclhcDcEjpO0qc&s=10",
    availableToday: true,
    bio: "Empathetic pediatrician focused on gentle childhood allergy assessment, early respiratory support, and family health education.",
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "NURSE",
    title: "Lead Triage Nurse",
    age: 36,
    department: "Outpatient Clinical Diagnostics",
    specialty: "Lead Triage Nurse & Allergy Testing Coordinator",
    experienceYears: 12,
    qualifications: ["BSN", "RN"],
    languages: ["English"],
    email: "nurse.sarah.jenkins@smartclinic.com",
    phone: "+84 (028) 3900 1011",
    extension: "Ext. 111",
    roomNumber: "Triage Station A (Level 1)",
    imageUrl:
      "https://cdn.prod.website-files.com/5babc11099f97ea5dbcf24d5/674e02bfb70719d29df790c2_clinic-nurse.jpg",
    availableToday: true,
    bio: "Supervises the intradermal allergy diagnostic wing, pre-consultation vitals monitoring, and emergency response readiness.",
  },
  {
    id: "emily-rodriguez",
    name: "Emily Rodriguez",
    role: "NURSE",
    title: "Registered Nurse",
    age: 31,
    department: "Pediatric Care",
    specialty: "Pediatric Comfort & Vaccination Coordination",
    experienceYears: 8,
    qualifications: ["RN"],
    languages: ["English", "Spanish"],
    email: "nurse.emily.rodriguez@smartclinic.com",
    phone: "+84 (028) 3900 1012",
    extension: "Ext. 112",
    roomNumber: "Pediatric Care Bay (Level 1)",
    imageUrl:
      "https://eaglegatecollege.edu/wp-content/uploads/2023/09/shutterstock_2279543395-scaled.jpg",
    availableToday: true,
    bio: "Dedicated to soothing clinical care for infants, pediatric allergy patch preparation, and family guidance.",
  },
  {
    id: "amina-patel",
    name: "Amina Patel",
    role: "NURSE",
    title: "Infusion Treatment Nurse",
    age: 33,
    department: "Ambulatory & Infusion Wing",
    specialty: "Immunotherapy Injection & Biologics Monitoring",
    experienceYears: 9,
    qualifications: ["BSN"],
    languages: ["English", "Gujarati"],
    email: "nurse.amina.patel@smartclinic.com",
    phone: "+84 (028) 3900 1013",
    extension: "Ext. 113",
    roomNumber: "Treatment Room 3 (Level 2)",
    imageUrl:
      "https://xpresshealth.co.uk/_next/image?url=https%3A%2F%2Fbackend.xpresshealth.co.uk%2Fuploads%2F2025%2F04%2F513-min.jpg&w=1920&q=100",
    availableToday: true,
    bio: "Administers targeted desensitization injections, sublingual drops, and monitors patient post-treatment recovery.",
  },
  {
    id: "zainab-okafor",
    name: "Zainab Okafor",
    role: "NURSE",
    title: "Intake Coordinator Nurse",
    age: 37,
    department: "Express Intake & Kiosk Navigation",
    specialty: "Rapid Triage Assessment & Patient Support",
    experienceYears: 13,
    qualifications: ["RN", "MSN"],
    languages: ["English"],
    email: "nurse.zainab.okafor@smartclinic.com",
    phone: "+84 (028) 3900 1014",
    extension: "Ext. 114",
    roomNumber: "Welcome Kiosk Hub (Ground Floor)",
    imageUrl:
      "https://media.istockphoto.com/id/2187596982/photo/portrait-of-smiling-african-woman-nurse.jpg?s=612x612&w=0&k=20&c=OC0idN57sR1dpEOCIaBX9ger5rJk9tl5hK7HX-xM8nA=",
    availableToday: true,
    bio: "Assists incoming walk-ins and seniors with kiosk check-in, preliminary vitals, and electronic medical intake.",
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