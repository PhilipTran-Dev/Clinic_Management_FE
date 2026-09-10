export type PrescriptionStatus =
  | "PENDING_PREPARATION" // Chờ soạn thuốc
  | "PREPARING" // Đang soạn thuốc
  | "READY_FOR_PICKUP" // Đã soạn xong / Chờ bệnh nhân quét mã
  | "DISPENSED"; // Đã bàn giao thuốc

export type PaymentStatus =
  | "PAID_ONLINE" // Đã thanh toán qua App / VietQR
  | "PENDING_AT_COUNTER" // Chờ thanh toán tại quầy
  | "SETTLED_AT_COUNTER"; // Đã thu tiền mặt tại quầy

export interface MedicationItem {
  id: string;
  name: string;
  activeIngredient: string;
  dosageForm: string;
  instructions: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  bhytCoveragePercent: number; // 80 or 100 or 0
  stockUnits: number;
  isPacked: boolean;
  isAllergyRisk?: boolean;
}

export interface PharmacyOrder {
  orderId: string; // e.g. "RX-8821"
  encounterId: string; // "FHIR-ENC-8821"
  ticketCode: string; // "#APT-2026-8821"
  patientName: string; // "NGUYỄN VĂN AN"
  patientId: string; // "FHIR-P-88219"
  dob: string; // "14/08/1984"
  age: number; // 42
  gender: "Nam" | "Nữ";
  insuranceCode: string; // "DN 4 79 79 12345678" (from BHYT OCR)
  initialHospitalCode: string; // "79-014 (BV Đa Khoa Sài Gòn)"
  isOcrVerified: boolean;
  allergies: string[]; // ["Penicillin (Phản vệ)", "Hải sản"]
  prescribingDoctor: string; // "PGS. TS. BS. Trần Minh Tuấn"
  roomNumber: string; // "Phòng khám 201 (Tầng 2)"
  diagnosis: string; // "J02.9 - Viêm họng cấp tính, không đặc hiệu"
  createdAt: string; // "09:15"
  status: PrescriptionStatus;
  paymentStatus: PaymentStatus;
  items: MedicationItem[];
}

export const DISPENSED_TODAY_COUNT = 28;

export const PHARMACY_ORDERS: PharmacyOrder[] = [
  {
    orderId: "RX-8821",
    encounterId: "FHIR-ENC-8821",
    ticketCode: "#APT-2026-8821",
    patientName: "NGUYỄN VĂN AN",
    patientId: "FHIR-P-88219",
    dob: "14/08/1984",
    age: 42,
    gender: "Nam",
    insuranceCode: "DN 4 79 79 12345678",
    initialHospitalCode: "79-014 (BV Đa Khoa Sài Gòn)",
    isOcrVerified: true,
    allergies: ["Penicillin (Phản vệ)", "Hải sản"],
    prescribingDoctor: "PGS. TS. BS. Trần Minh Tuấn",
    roomNumber: "Phòng khám 201 (Tầng 2)",
    diagnosis: "J02.9 - Viêm họng cấp tính, không đặc hiệu",
    createdAt: "09:15",
    status: "PENDING_PREPARATION",
    paymentStatus: "PENDING_AT_COUNTER",
    items: [
      {
        id: "MED-01",
        name: "Cefuroxime 500mg",
        activeIngredient: "Cefuroxime axetil",
        dosageForm: "Viên nén bao phim",
        instructions: "1 viên x 2 lần/ngày sau ăn",
        quantity: 14,
        unit: "viên",
        unitPrice: 12000,
        bhytCoveragePercent: 80,
        stockUnits: 60,
        isPacked: false,
        isAllergyRisk: false,
      },
      {
        id: "MED-02",
        name: "Paracetamol 500mg",
        activeIngredient: "Paracetamol",
        dosageForm: "Viên nén",
        instructions: "1 viên mỗi 6 giờ khi sốt > 38.5°C",
        quantity: 10,
        unit: "viên",
        unitPrice: 2000,
        bhytCoveragePercent: 100,
        stockUnits: 250,
        isPacked: false,
        isAllergyRisk: false,
      },
    ],
  },
  {
    orderId: "RX-8820",
    encounterId: "FHIR-ENC-8820",
    ticketCode: "#APT-2026-8820",
    patientName: "TRẦN THỊ MAI",
    patientId: "FHIR-P-88107",
    dob: "02/03/1968",
    age: 58,
    gender: "Nữ",
    insuranceCode: "DN 4 96 79 55512345",
    initialHospitalCode: "79-014 (BV Đa Khoa Sài Gòn)",
    isOcrVerified: true,
    allergies: ["Aspirin"],
    prescribingDoctor: "PGS. TS. BS. Trần Minh Tuấn",
    roomNumber: "Phòng khám 201 (Tầng 2)",
    diagnosis: "J45.901 - Hen suyễn không đặc hiệu",
    createdAt: "08:42",
    status: "READY_FOR_PICKUP",
    paymentStatus: "PAID_ONLINE",
    items: [
      {
        id: "MED-01",
        name: "Budesonide 200mcg",
        activeIngredient: "Budesonide",
        dosageForm: "Bình xịt định liều",
        instructions: "2 nhịp xịt x 2 lần/ngày",
        quantity: 1,
        unit: "bình",
        unitPrice: 96000,
        bhytCoveragePercent: 0,
        stockUnits: 18,
        isPacked: true,
        isAllergyRisk: false,
      },
      {
        id: "MED-02",
        name: "Loratadine 10mg",
        activeIngredient: "Loratadine",
        dosageForm: "Viên nén",
        instructions: "1 viên/ngày (buổi tối)",
        quantity: 30,
        unit: "viên",
        unitPrice: 4000,
        bhytCoveragePercent: 80,
        stockUnits: 24,
        isPacked: true,
        isAllergyRisk: false,
      },
    ],
  },
  {
    orderId: "RX-8819",
    encounterId: "FHIR-ENC-8819",
    ticketCode: "#APT-2026-8819",
    patientName: "LÊ HOÀNG NAM",
    patientId: "FHIR-P-88202",
    dob: "09/07/1991",
    age: 35,
    gender: "Nam",
    insuranceCode: "DN 4 79 79 00234567",
    initialHospitalCode: "79-014 (BV Đa Khoa Sài Gòn)",
    isOcrVerified: true,
    allergies: [],
    prescribingDoctor: "BS. CKI. Nguyễn Văn Dũng",
    roomNumber: "Phòng khám 202 (Tầng 2)",
    diagnosis: "L50.0 - Mề đay dị ứng",
    createdAt: "08:05",
    status: "DISPENSED",
    paymentStatus: "PAID_ONLINE",
    items: [
      {
        id: "MED-01",
        name: "Cetirizine 10mg",
        activeIngredient: "Cetirizine",
        dosageForm: "Viên nén",
        instructions: "1 viên/ngày x 5 ngày",
        quantity: 5,
        unit: "viên",
        unitPrice: 3000,
        bhytCoveragePercent: 80,
        stockUnits: 80,
        isPacked: true,
        isAllergyRisk: false,
      },
    ],
  },
];