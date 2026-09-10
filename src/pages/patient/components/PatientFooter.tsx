import { Link } from "react-router-dom";
import { Activity, BadgeCheck, PhoneCall, ShieldCheck } from "lucide-react";
import { CLINIC_SERVICES } from "../data/clinicContent";

const QUICK_LINKS = [
  { label: "Chuyên khoa", href: "#services" },
  { label: "Quy trình khám", href: "#how-it-works" },
  { label: "Đội ngũ Bác sĩ", href: "#doctors" },
  { label: "Cơ sở phòng khám", href: "#locations" },
  { label: "Lịch hẹn & Bảng giá", href: "#faq" },
];

export default function PatientFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clinical-600 text-white">
                <Activity className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Smart Clinic
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Mạng lưới phòng khám hiện đại, ứng dụng AI, tập trung vào chăm sóc
              an toàn, dễ tiếp cận và bệnh án điện tử hoàn toàn không giấy.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-clinical-600" />
                ISO 27001
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <BadgeCheck className="h-3.5 w-3.5 text-clinical-600" />
                HL7 FHIR R4
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Liên kết nhanh</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-clinical-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Chuyên khoa khám
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {CLINIC_SERVICES.map((service) => (
                <li key={service.title}>
                  <a
                    href="#services"
                    className="transition-colors hover:text-clinical-700"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Cấp cứu &amp; Liên hệ
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="tel:1900 123 456"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-clinical-700"
                >
                  <PhoneCall className="h-4 w-4 text-clinical-600" />
                  1900 123 456
                </a>
              </li>
              <li className="text-sm text-slate-500">
                T2 - CN: 07:30 - 20:30
              </li>
              <li className="text-sm text-slate-500">
                Liên hệ qua tổng đài, cổng bệnh nhân hoặc trực tiếp tại bất kỳ
                cơ sở nào.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 py-6">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Hệ thống Quản lý Phòng khám Smart
            Clinic. Bảo lưu mọi quyền.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Mạng lưới phòng khám được cấp phép &middot; Mã cơ sở KCB 12345
            &middot; Hạ tầng đạt chuẩn bảo mật ISO 27001 &middot; Liên thông HL7
            FHIR R4. Trường hợp khẩn cấp nguy hiểm tính mạng, vui lòng gọi cấp
            cứu 115.
          </p>
        </div>
      </div>
    </footer>
  );
}