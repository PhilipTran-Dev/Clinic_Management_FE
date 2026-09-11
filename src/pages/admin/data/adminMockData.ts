export type AdminTab = "OVERVIEW" | "USERS" | "RAG_KB" | "CATALOGS" | "AI_CONFIG";

export interface SystemMetrics {
  activeEncounters: number;
  queueDepth: number;
  ocrSuccessRate: number;
  avgAiLatencyMs: number;
  dailyConsultations: number;
  totalRevenueVnd: number;
  encountersDeltaPercent: number;
  triageAccuracyPercent: number;
}

export interface StaffAccount {
  id: string;
  fullName: string;
  email: string;
  role: "DOCTOR" | "PHARMACIST" | "ADMIN";
  department: string;
  roomNumber?: string;
  phone: string;
  status: "ACTIVE" | "SUSPENDED";
  lastLogin: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: "BHYT_POLICY" | "PRICING" | "DOCTOR_SCHEDULE" | "CLINIC_GUIDE";
  contentSnippet: string;
  chunkCount: number;
  embeddingModel: string;
  updatedAt: string;
  status: "INDEXED" | "SYNCING" | "STALE";
}

export interface OcrAuditLog {
  id: string;
  documentType: "BHYT_CARD" | "OLD_PRESCRIPTION" | "CCCD";
  patientName: string;
  confidenceScore: number;
  extractedId: string;
  timestamp: string;
  status: "SUCCESS" | "FLAGGED_FOR_REVIEW";
}

export interface HospitalCode {
  code: string;
  name: string;
  copayPercent: number;
}

export interface DrugItem {
  id: string;
  name: string;
  concentration: string;
  unitPrice: number;
  stockUnits: number;
  bhytCoverage: "BHYT 80%" | "BHYT 100%" | "Tự túc";
}

export interface ServiceFee {
  id: string;
  code: string;
  name: string;
  price: number;
  bhytCovered: boolean;
}

export interface InfrastructureService {
  name: string;
  status: "operational" | "degraded" | "down";
  latencyMs?: number;
}

export interface TriageDistribution {
  level: string;
  count: number;
  color: string;
  bgColor: string;
}

export const MOCK_SYSTEM_METRICS: SystemMetrics = {
  activeEncounters: 42,
  queueDepth: 17,
  ocrSuccessRate: 98.5,
  avgAiLatencyMs: 820,
  dailyConsultations: 128,
  totalRevenueVnd: 187500000,
  encountersDeltaPercent: 12,
  triageAccuracyPercent: 96.2,
};

export const MOCK_STAFF: StaffAccount[] = [
  {
    id: "STF-001",
    fullName: "PGS. TS. BS. Trần Minh Tuấn",
    email: "tuan.tran@smartclinic.vn",
    role: "DOCTOR",
    department: "Khoa Dị ứng & Miễn dịch lâm sàng",
    roomNumber: "Phòng 201",
    phone: "0901 234 567",
    status: "ACTIVE",
    lastLogin: "10/09/2026 08:12",
  },
  {
    id: "STF-002",
    fullName: "BS. CKI. Nguyễn Văn Dũng",
    email: "dung.nguyen@smartclinic.vn",
    role: "DOCTOR",
    department: "Khoa Nội Tổng quát",
    roomNumber: "Phòng 104",
    phone: "0912 345 678",
    status: "ACTIVE",
    lastLogin: "10/09/2026 07:45",
  },
  {
    id: "STF-003",
    fullName: "DS. Đặng Thu Thảo",
    email: "pharmacy@smartclinic.vn",
    role: "PHARMACIST",
    department: "Quầy Dược Lâm Sàng #1",
    phone: "0923 456 789",
    status: "ACTIVE",
    lastLogin: "10/09/2026 08:00",
  },
  {
    id: "STF-004",
    fullName: "Quản trị viên Hệ thống",
    email: "admin@smartclinic.vn",
    role: "ADMIN",
    department: "Phòng Quản trị & CNTT",
    phone: "0934 567 890",
    status: "ACTIVE",
    lastLogin: "10/09/2026 09:00",
  },
];

export const MOCK_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: "KB-001",
    title: "Chính sách BHYT Phòng khám 2026",
    category: "BHYT_POLICY",
    contentSnippet:
      "Quy định mức hưởng BHYT đúng tuyến 80%, trái tuyến 40%. Hồ sơ giấy tờ cần thiết: Thẻ BHYT photo, CCCD/CMND, Giấy giới thiệu (nếu có).",
    chunkCount: 12,
    embeddingModel: "text-embedding-3-small (1536d)",
    updatedAt: "10/09/2026",
    status: "INDEXED",
  },
  {
    id: "KB-002",
    title: "Bảng giá dịch vụ & Xét nghiệm Dị ứng Q3/2026",
    category: "PRICING",
    contentSnippet:
      "Xét nghiệm IgE Total: 250.000đ. Test lẩy Da (Prick Test) 12 allergen: 480.000đ. Consultation Specialist: 350.000đ.",
    chunkCount: 8,
    embeddingModel: "text-embedding-3-small (1536d)",
    updatedAt: "08/09/2026",
    status: "INDEXED",
  },
  {
    id: "KB-003",
    title: "Lịch công tác Bác sĩ Chuyên khoa Tuần này",
    category: "DOCTOR_SCHEDULE",
    contentSnippet:
      "PGS.TS Trần Minh Tuấn: Thứ 2, 4, 6 (Sáng 7h-11h). BS.CKI Nguyễn Văn Dũng: Thứ 2-6 (Cả ngày). BSCK2 Phạm Thị Hoa: Thứ 3, 5 (Chiều 13h-17h).",
    chunkCount: 6,
    embeddingModel: "text-embedding-3-small (1536d)",
    updatedAt: "10/09/2026",
    status: "INDEXED",
  },
  {
    id: "KB-004",
    title: "Quy trình Tiếp đón Kiosk & Check-in QR v3.1",
    category: "CLINIC_GUIDE",
    contentSnippet:
      "Bước 1: Quét mã QR tại Kiosk. Bước 2: Xác thực CCCD/Thẻ BHYT qua PaddleOCR. Bước 3: Chọn chuyên khoa. Bước 4: In phiếu & chuyển hàng đợi.",
    chunkCount: 15,
    embeddingModel: "text-embedding-3-small (1536d)",
    updatedAt: "05/09/2026",
    status: "INDEXED",
  },
];

export const MOCK_OCR_LOGS: OcrAuditLog[] = [
  {
    id: "OCR-20260910-001",
    documentType: "BHYT_CARD",
    patientName: "Nguyễn Văn An",
    confidenceScore: 98.2,
    extractedId: "DN 4 79 79 12345678",
    timestamp: "10/09/2026 08:14:32",
    status: "SUCCESS",
  },
  {
    id: "OCR-20260910-002",
    documentType: "BHYT_CARD",
    patientName: "Trần Thị Mai",
    confidenceScore: 99.1,
    extractedId: "DN 4 79 79 87654321",
    timestamp: "10/09/2026 08:21:05",
    status: "SUCCESS",
  },
  {
    id: "OCR-20260910-003",
    documentType: "CCCD",
    patientName: "Lê Hoàng Nam",
    confidenceScore: 72.4,
    extractedId: "079123456789",
    timestamp: "10/09/2026 08:35:17",
    status: "FLAGGED_FOR_REVIEW",
  },
  {
    id: "OCR-20260910-004",
    documentType: "OLD_PRESCRIPTION",
    patientName: "Phạm Minh Đức",
    confidenceScore: 94.7,
    extractedId: "PRE-2025-4421",
    timestamp: "10/09/2026 09:02:44",
    status: "SUCCESS",
  },
  {
    id: "OCR-20260910-005",
    documentType: "BHYT_CARD",
    patientName: "Hoàng Thị Lan",
    confidenceScore: 97.6,
    extractedId: "DN 4 79 79 11223344",
    timestamp: "10/09/2026 09:15:28",
    status: "SUCCESS",
  },
  {
    id: "OCR-20260910-006",
    documentType: "CCCD",
    patientName: "Vũ Thanh Hằng",
    confidenceScore: 68.9,
    extractedId: "079987654321",
    timestamp: "10/09/2026 09:30:11",
    status: "FLAGGED_FOR_REVIEW",
  },
];

export const MOCK_HOSPITAL_CODES: HospitalCode[] = [
  { code: "79-014", name: "BV Đa Khoa Sài Gòn", copayPercent: 20 },
  { code: "01-002", name: "BV Bạch Mai", copayPercent: 20 },
  { code: "79-021", name: "BV Nhi Đồng 2", copayPercent: 20 },
  { code: "79-018", name: "BV FV", copayPercent: 40 },
  { code: "01-001", name: "BV Trung ương Huế", copayPercent: 40 },
];

export const MOCK_DRUGS: DrugItem[] = [
  {
    id: "DRG-001",
    name: "Amoxicillin",
    concentration: "500mg",
    unitPrice: 15000,
    stockUnits: 2400,
    bhytCoverage: "BHYT 80%",
  },
  {
    id: "DRG-002",
    name: "Cefuroxime",
    concentration: "500mg",
    unitPrice: 35000,
    stockUnits: 1200,
    bhytCoverage: "BHYT 80%",
  },
  {
    id: "DRG-003",
    name: "Paracetamol",
    concentration: "500mg",
    unitPrice: 3000,
    stockUnits: 5000,
    bhytCoverage: "BHYT 100%",
  },
  {
    id: "DRG-004",
    name: "Cetirizine",
    concentration: "10mg",
    unitPrice: 8000,
    stockUnits: 1800,
    bhytCoverage: "BHYT 80%",
  },
  {
    id: "DRG-005",
    name: "Prednisolone",
    concentration: "5mg",
    unitPrice: 5000,
    stockUnits: 900,
    bhytCoverage: "BHYT 80%",
  },
  {
    id: "DRG-006",
    name: "Ventolin Inhaler",
    concentration: "100mcg",
    unitPrice: 95000,
    stockUnits: 350,
    bhytCoverage: "Tự túc",
  },
];

export const MOCK_SERVICE_FEES: ServiceFee[] = [
  { id: "SVC-001", code: "CONS-GEN", name: "Khám Tổng quát", price: 150000, bhytCovered: true },
  { id: "SVC-002", code: "CONS-SPC", name: "Khám Chuyên khoa Dị ứng", price: 350000, bhytCovered: true },
  { id: "SVC-003", code: "LAB-IGE", name: "Xét nghiệm IgE Total", price: 250000, bhytCovered: true },
  { id: "SVC-004", code: "LAB-PRICK", name: "Test lẩy Da (Prick Test 12 allergen)", price: 480000, bhytCovered: false },
  { id: "SVC-005", code: "LAB-SPT", name: "Test lẩy Da mở rộng (Extended Panel)", price: 620000, bhytCovered: false },
  { id: "SVC-006", code: "IMG-XQ", name: "Chụp X-Quang Ngực", price: 300000, bhytCovered: true },
];

export const MOCK_INFRA_SERVICES: InfrastructureService[] = [
  { name: "Patient Service (Node.js)", status: "operational", latencyMs: 12 },
  { name: "Doctor EHR Service (Node.js)", status: "operational", latencyMs: 18 },
  { name: "AI Gateway (Python/FastAPI)", status: "operational", latencyMs: 820 },
  { name: "Redis Sentinel", status: "operational", latencyMs: 2 },
  { name: "PostgreSQL 16 + pgvector", status: "operational", latencyMs: 8 },
  { name: "PaddleOCR Worker", status: "operational", latencyMs: 340 },
];

export const MOCK_TRIAGE_DISTRIBUTION: TriageDistribution[] = [
  { level: "P1 - Cấp cứu", count: 3, color: "text-triage-p1", bgColor: "bg-triage-p1-bg" },
  { level: "P2 - Khẩn trương", count: 11, color: "text-triage-p2", bgColor: "bg-triage-p2-bg" },
  { level: "P3 - Thường quy", count: 28, color: "text-triage-p3", bgColor: "bg-triage-p3-bg" },
];

export const CATEGORY_LABELS: Record<KnowledgeDocument["category"], string> = {
  BHYT_POLICY: "Chính sách BHYT",
  PRICING: "Bảng giá",
  DOCTOR_SCHEDULE: "Lịch trực",
  CLINIC_GUIDE: "Quy trình",
};

export const ROLE_LABELS: Record<StaffAccount["role"], string> = {
  DOCTOR: "Bác sĩ",
  PHARMACIST: "Dược sĩ",
  ADMIN: "Quản trị viên",
};

export const DOC_TYPE_LABELS: Record<OcrAuditLog["documentType"], string> = {
  BHYT_CARD: "Thẻ BHYT",
  OLD_PRESCRIPTION: "Đơn thuốc cũ",
  CCCD: "CCCD",
};
