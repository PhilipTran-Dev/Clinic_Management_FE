export type TriageLevel = "P1" | "P2" | "P3";
export type BookingSource = "Kiosk QR" | "Online App";
export type Gender = "Male" | "Female";

export interface Allergy {
  name: string;
  severity: "SEVERE" | "MODERATE";
}

export interface Vitals {
  bp: string;
  hr: number;
  temp: string;
  spo2: number;
}

export interface PastEncounter {
  id: string;
  date: string;
  department: string;
  complaint: string;
  diagnosis: string;
  notes: string;
}

export interface LabReport {
  id: string;
  name: string;
  result: string;
  status: "Normal" | "Abnormal" | "Pending";
  date: string;
}

export interface PatientRecord {
  ticketNumber: string;
  name: string;
  patientId: string;
  dob: string;
  age: number;
  gender: Gender;
  arrivalTime: string;
  waitingMinutes: number;
  chiefComplaint: string;
  source: BookingSource;
  triage: TriageLevel;
  priorityScore: number;
  allergies: Allergy[];
  vitals: Vitals;
  pastEncounters: PastEncounter[];
  labReports: LabReport[];
}

const NGUYEN_VAN_AN: PatientRecord = {
  ticketNumber: "#A-102",
  name: "Nguyen Van An",
  patientId: "FHIR-P-88219",
  dob: "14/08/1984",
  age: 42,
  gender: "Male",
  arrivalTime: "08:42",
  waitingMinutes: 4,
  chiefComplaint: "Painful swallowing & high fever",
  source: "Kiosk QR",
  triage: "P1",
  priorityScore: 150,
  allergies: [
    { name: "Penicillin", severity: "SEVERE" },
    { name: "Shellfish", severity: "SEVERE" },
  ],
  vitals: { bp: "125/82", hr: 78, temp: "38.2°C", spo2: 98 },
  pastEncounters: [
    {
      id: "FHIR-ENC-8815",
      date: "12/06/2026",
      department: "General Internal Medicine",
      complaint: "Seasonal rhinitis review",
      diagnosis: "J30.1 - Allergic rhinitis",
      notes: "Antihistamine titration successful; no adverse events.",
    },
    {
      id: "FHIR-ENC-8802",
      date: "27/02/2026",
      department: "Allergy & Clinical Immunology",
      complaint: "Skin rash after seafood meal",
      diagnosis: "L50.0 - Allergic urticaria",
      notes: "Advise strict seafood avoidance; prescribed Loratadine 10mg PRN.",
    },
    {
      id: "FHIR-ENC-8771",
      date: "05/11/2025",
      department: "Pediatrics & Family Medicine",
      complaint: "Annual wellness screening",
      diagnosis: "Z00.00 - General adult exam",
      notes: "All vitals within normal limits; encourage regular exercise.",
    },
  ],
  labReports: [
    {
      id: "LAB-2210",
      name: "CBC - Complete Blood Count",
      result: "WBC 11.2 x10^9/L (elevated)",
      status: "Abnormal",
      date: "27/02/2026",
    },
    {
      id: "LAB-2211",
      name: "CRP - C-Reactive Protein",
      result: "18 mg/L (mild elevation)",
      status: "Abnormal",
      date: "27/02/2026",
    },
    {
      id: "LAB-2190",
      name: "IgE Total Serum",
      result: "214 IU/mL (borderline)",
      status: "Normal",
      date: "12/06/2026",
    },
  ],
};

const QUEUE_SEED: PatientRecord[] = [
  {
    ticketNumber: "#A-101",
    name: "Tran Thi Mai",
    patientId: "FHIR-P-88107",
    dob: "02/03/1968",
    age: 58,
    gender: "Female",
    arrivalTime: "08:36",
    waitingMinutes: 6,
    chiefComplaint: "Persistent cough & wheezing 2 days",
    source: "Online App",
    triage: "P1",
    priorityScore: 128,
    allergies: [{ name: "Aspirin", severity: "MODERATE" }],
    vitals: { bp: "138/88", hr: 92, temp: "38.6°C", spo2: 94 },
    pastEncounters: [
      {
        id: "FHIR-ENC-8788",
        date: "19/04/2026",
        department: "Respiratory & Asthma",
        complaint: "Asthma exacerbation",
        diagnosis: "J45.901 - Asthma unspecified",
        notes: "Inhaler technique reviewed; add maintenance budesonide.",
      },
    ],
    labReports: [
      {
        id: "LAB-2205",
        name: "Peak Flow",
        result: "310 L/min (68% of personal best)",
        status: "Abnormal",
        date: "19/04/2026",
      },
    ],
  },
  {
    ticketNumber: "#A-103",
    name: "Le Hoang Nam",
    patientId: "FHIR-P-88202",
    dob: "09/07/1991",
    age: 35,
    gender: "Male",
    arrivalTime: "08:51",
    waitingMinutes: 9,
    chiefComplaint: "Itchy skin rash after medication",
    source: "Online App",
    triage: "P2",
    priorityScore: 95,
    allergies: [],
    vitals: { bp: "118/76", hr: 74, temp: "36.9°C", spo2: 99 },
    pastEncounters: [],
    labReports: [],
  },
  {
    ticketNumber: "#A-105",
    name: "Bui Duc Minh",
    patientId: "FHIR-P-88044",
    dob: "22/11/2014",
    age: 12,
    gender: "Male",
    arrivalTime: "08:29",
    waitingMinutes: 12,
    chiefComplaint: "Child: throat pain & ongoing cough",
    source: "Online App",
    triage: "P3",
    priorityScore: 60,
    allergies: [{ name: "Peanuts", severity: "SEVERE" }],
    vitals: { bp: "110/70", hr: 88, temp: "37.8°C", spo2: 98 },
    pastEncounters: [],
    labReports: [],
  },
  {
    ticketNumber: "#A-104",
    name: "Pham Thu Huong",
    patientId: "FHIR-P-88231",
    dob: "12/01/1959",
    age: 67,
    gender: "Female",
    arrivalTime: "08:58",
    waitingMinutes: 2,
    chiefComplaint: "Routine allergy follow-up & refill",
    source: "Kiosk QR",
    triage: "P3",
    priorityScore: 44,
    allergies: [],
    vitals: { bp: "140/85", hr: 76, temp: "36.8°C", spo2: 97 },
    pastEncounters: [
      {
        id: "FHIR-ENC-8766",
        date: "08/02/2026",
        department: "Allergy & Clinical Immunology",
        complaint: "Immunotherapy maintenance week 12",
        diagnosis: "Z07.9 - Treatment aftercare",
        notes: "Continue sublingual immunotherapy; no reactions.",
      },
    ],
    labReports: [],
  },
];

export const ACTIVE_PATIENT = NGUYEN_VAN_AN;

export const QUEUE_PATIENTS: PatientRecord[] = QUEUE_SEED;

export type SpeakerRole = "DOCTOR" | "PATIENT";

export type TranscriptEntityType =
  | "SYMPTOM"
  | "DURATION"
  | "VITALS"
  | "ALLERGY";

export interface TranscriptEntity {
  type: TranscriptEntityType;
  term: string;
}

export interface TranscriptLine {
  id: string;
  speaker: SpeakerRole;
  timeOffset: string;
  text: string;
  entities: TranscriptEntity[];
}

export const TRANSCRIPT_LINES: TranscriptLine[] = [
  {
    id: "L1",
    speaker: "DOCTOR",
    timeOffset: "00:00",
    text: "Good morning Mr. An, please have a seat. What brings you in today?",
    entities: [],
  },
  {
    id: "L2",
    speaker: "PATIENT",
    timeOffset: "00:04",
    text: "Good morning doctor. I have had a sore throat and difficulty swallowing for about 2 days now.",
    entities: [
      { type: "SYMPTOM", term: "sore throat" },
      { type: "DURATION", term: "2 days" },
    ],
  },
  {
    id: "L3",
    speaker: "DOCTOR",
    timeOffset: "00:09",
    text: "Any fever or chills since yesterday? Any difficulty breathing?",
    entities: [],
  },
  {
    id: "L4",
    speaker: "PATIENT",
    timeOffset: "00:13",
    text: "Yes, I took my temperature this morning — 38.5°C. The throat pain gets worse when I swallow.",
    entities: [
      { type: "VITALS", term: "38.5°C" },
      { type: "SYMPTOM", term: "throat pain" },
    ],
  },
  {
    id: "L5",
    speaker: "DOCTOR",
    timeOffset: "00:18",
    text: "Let me examine your throat. Before we continue, any known allergies I should be careful with?",
    entities: [],
  },
  {
    id: "L6",
    speaker: "PATIENT",
    timeOffset: "00:22",
    text: "Yes — I am allergic to Penicillin and Shellfish.",
    entities: [
      { type: "ALLERGY", term: "Penicillin" },
      { type: "ALLERGY", term: "Shellfish" },
    ],
  },
  {
    id: "L7",
    speaker: "DOCTOR",
    timeOffset: "00:26",
    text: "Noted. Your pharynx is red with mild tonsillar swelling. I will avoid penicillin and check an alternative antibiotic.",
    entities: [{ type: "SYMPTOM", term: "tonsillar swelling" }],
  },
];

export interface SoapDraft {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export const AI_SOAP_DRAFT: SoapDraft = {
  subjective:
    "Patient reports sore throat and painful swallowing for 2 days, with subjective fever of 38.5°C this morning. Throat pain aggravated on swallowing. No cough, no rash. Allergy history: Penicillin and Shellfish (both severe).",
  objective:
    "BP 125/82 mmHg, HR 78 bpm, Temp 38.2°C, SpO2 98%. Oropharynx: erythema with mild tonsillar swelling, no exudate. Anterior cervical lymph nodes slightly enlarged, non-tender. Chest auscultation clear.",
  assessment:
    "J02.9 - Acute pharyngitis, unspecified. Most consistent with viral pharyngitis; bacterial pharyngitis considered due to fever and tonsillar involvement. Penicillin allergy documented — require non-beta-lactam alternatives.",
  plan:
    "1) Avoid ALL penicillin-class antibiotics (severe allergy). 2) Start Cefuroxime alternative pending review. 3) Paracetamol 500mg for fever > 38.5°C. 4) Hydration, warm saline gargles, rest. 5) Reassess in 48-72h if symptoms persist.",
};

export interface IcdCode {
  code: string;
  label: string;
  confidence: number;
}

export const AI_ICD_SUGGESTIONS: IcdCode[] = [
  { code: "J02.9", label: "Acute pharyngitis, unspecified", confidence: 94 },
  {
    code: "J00",
    label: "Acute nasopharyngitis [common cold]",
    confidence: 68,
  },
];

export const ICD10_FORMULARY: IcdCode[] = [
  { code: "J02.8", label: "Acute pharyngitis due to other specified organisms", confidence: 0 },
  { code: "J03.9", label: "Acute tonsillitis, unspecified", confidence: 0 },
  { code: "J45.901", label: "Unspecified asthma with acute exacerbation", confidence: 0 },
  { code: "R11.2", label: "Nausea with vomiting", confidence: 0 },
  { code: "J30.1", label: "Allergic rhinitis due to pollen", confidence: 0 },
  { code: "L50.0", label: "Allergic urticaria", confidence: 0 },
  { code: "K21.0", label: "Gastro-esophageal reflux disease with esophagitis", confidence: 0 },
  { code: "R50.9", label: "Fever, unspecified", confidence: 0 },
];

export interface FormularyMed {
  name: string;
  dosageForm: string;
  defaultFrequency: string;
  defaultDuration: string;
  stockUnits: number;
}

export const PHARMACY_FORMULARY: FormularyMed[] = [
  {
    name: "Amoxicillin 500mg",
    dosageForm: "capsule",
    defaultFrequency: "1 tab twice daily after meals",
    defaultDuration: "7 days",
    stockUnits: 140,
  },
  {
    name: "Paracetamol 500mg",
    dosageForm: "tablet",
    defaultFrequency: "1 tab every 6 hours if fever > 38.5°C",
    defaultDuration: "3 days",
    stockUnits: 250,
  },
  {
    name: "Cefuroxime 500mg",
    dosageForm: "tablet",
    defaultFrequency: "1 tab twice daily",
    defaultDuration: "7 days",
    stockUnits: 60,
  },
  {
    name: "Loratadine 10mg",
    dosageForm: "tablet",
    defaultFrequency: "1 tab daily",
    defaultDuration: "30 days",
    stockUnits: 24,
  },
  {
    name: "Budesonide 200mcg",
    dosageForm: "inhaler",
    defaultFrequency: "2 puffs twice daily",
    defaultDuration: "30 days",
    stockUnits: 18,
  },
];

export interface RxLine {
  id: string;
  medication: string;
  dosageForm: string;
  routeFrequency: string;
  duration: string;
  quantity: number;
  stockUnits: number;
}

export const AI_RX_DRAFT: RxLine[] = [
  {
    id: "RX-1",
    medication: "Amoxicillin 500mg",
    dosageForm: "capsule",
    routeFrequency: "1 tab twice daily after meals",
    duration: "7 days",
    quantity: 14,
    stockUnits: 140,
  },
  {
    id: "RX-2",
    medication: "Paracetamol 500mg",
    dosageForm: "tablet",
    routeFrequency: "1 tab every 6 hours if fever > 38.5°C",
    duration: "3 days",
    quantity: 10,
    stockUnits: 250,
  },
];

export const ENCOUNTER_ID = "FHIR-ENC-8821";