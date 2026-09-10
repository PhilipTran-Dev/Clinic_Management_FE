import { Link } from "react-router-dom";
import { ChevronRight, Clock } from "lucide-react";
import { CLINIC_SERVICES } from "../data/clinicContent";

export default function ClinicalServices() {
  return (
    <section id="services" className="scroll-mt-24 bg-surface-light py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-clinical-600">
            Chuyên khoa khám
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Chuyên sâu, Trọn Gói Trong Một Mái Nhà
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            Mọi quy trình khám đều được kết nối số hóa - từ tiếp nhận triệu
            chứng đến đơn thuốc điện tử - giúp bác sĩ tập trung hoàn toàn vào
            bạn.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CLINIC_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group flex flex-col rounded-xl border border-slate-200/80 bg-white p-6 shadow-card transition-all hover:border-clinical-300 hover:shadow-elevated"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clinical-50 p-3 text-clinical-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                  <Clock className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                  {service.duration}
                </span>
                <Link
                  to="/patient/booking"
                  className="mt-4 inline-flex items-center gap-1 text-base font-medium text-clinical-600 transition-colors hover:text-clinical-700"
                >
                  Đặt lịch khám
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}