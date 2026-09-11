import { useState } from "react";
import { Pill, CreditCard, Building2, Edit } from "lucide-react";
import type { DrugItem, HospitalCode, ServiceFee } from "../data/adminMockData";
import {
  MOCK_DRUGS,
  MOCK_HOSPITAL_CODES,
  MOCK_SERVICE_FEES,
} from "../data/adminMockData";

type CatalogSubTab = "DRUGS" | "BHYT" | "SERVICES";

export default function MedicalCatalogTab() {
  const [activeSubTab, setActiveSubTab] = useState<CatalogSubTab>("DRUGS");
  const [drugs] = useState<DrugItem[]>(MOCK_DRUGS);
  const [hospitals] = useState<HospitalCode[]>(MOCK_HOSPITAL_CODES);
  const [services] = useState<ServiceFee[]>(MOCK_SERVICE_FEES);

  const subTabs: { key: CatalogSubTab; label: string; icon: typeof Pill }[] = [
    { key: "DRUGS", label: "Danh mục Thuốc & Tồn kho", icon: Pill },
    { key: "BHYT", label: "Danh mục BHYT & Bệnh viện ban đầu", icon: Building2 },
    { key: "SERVICES", label: "Bảng giá Dịch vụ", icon: CreditCard },
  ];

  const bhytCoverageColors: Record<DrugItem["bhytCoverage"], string> = {
    "BHYT 80%": "bg-blue-100 text-blue-800",
    "BHYT 100%": "bg-emerald-100 text-emerald-800",
    "Tự túc": "bg-slate-100 text-slate-600",
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Danh mục Thuốc, Viện phí & BHYT
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Quản lý danh mục thuốc, mã bệnh viện ban đầu và bảng giá dịch vụ khám chữa bệnh
        </p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 rounded-lg border border-slate-200/80 bg-white p-1 shadow-card">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveSubTab(tab.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
              activeSubTab === tab.key
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <tab.icon size={14} aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Drug Inventory */}
      {activeSubTab === "DRUGS" && (
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-slate-600">Thuốc</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Hàm lượng</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Đơn giá (VNĐ)</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Tồn kho (đơn vị)</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">BHYT Coverage</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {drugs.map((drug) => (
                  <tr key={drug.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-clinical-50">
                          <Pill size={14} className="text-clinical-600" aria-hidden="true" />
                        </div>
                        <span className="font-semibold text-slate-800">{drug.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{drug.concentration}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {drug.unitPrice.toLocaleString("vi-VN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          drug.stockUnits < 500 ? "text-red-600" : "text-slate-800"
                        }`}
                      >
                        {drug.stockUnits.toLocaleString("vi-VN")}
                      </span>
                      {drug.stockUnits < 500 && (
                        <span className="ml-1.5 text-[10px] text-red-500">Sắp hết</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${bhytCoverageColors[drug.bhytCoverage]}`}
                      >
                        {drug.bhytCoverage}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100"
                      >
                        <Edit size={12} aria-hidden="true" />
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BHYT Hospital Codes */}
      {activeSubTab === "BHYT" && (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-card">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xs font-bold text-slate-700">Mã Bệnh viện Ban đầu (BHYT)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-3 font-semibold text-slate-600">Mã BV</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">Tên Bệnh viện</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">Tỷ lệ đồng chi trả</th>
                    <th className="px-4 py-3 font-semibold text-slate-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hospitals.map((h) => (
                    <tr key={h.code} className="transition-colors hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-mono font-semibold text-slate-800">
                        {h.code}
                      </td>
                      <td className="px-4 py-3 text-slate-700">{h.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            h.copayPercent <= 20
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          Đúng tuyến: {100 - h.copayPercent}% | Trái tuyến: {h.copayPercent > 20 ? 100 - h.copayPercent - 20 : 40}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100"
                        >
                          <Edit size={12} aria-hidden="true" />
                          Chỉnh sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-card">
            <h3 className="mb-3 text-xs font-bold text-slate-700">Tỷ lệ Đồng chi trả BHYT</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs font-semibold text-emerald-800">Đúng tuyến</p>
                <p className="mt-1 text-lg font-bold text-emerald-700">80% BHYT chi trả</p>
                <p className="text-[11px] text-emerald-600">Bệnh nhân đồng chi trả 20%</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs font-semibold text-amber-800">Trái tuyến</p>
                <p className="mt-1 text-lg font-bold text-amber-700">40% BHYT chi trả</p>
                <p className="text-[11px] text-amber-600">Bệnh nhân đồng chi trả 60%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Fees */}
      {activeSubTab === "SERVICES" && (
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-slate-600">Mã DV</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Tên Dịch vụ</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Giá (VNĐ)</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">BHYT</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((svc) => (
                  <tr key={svc.id} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-slate-600">{svc.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{svc.name}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {svc.price.toLocaleString("vi-VN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          svc.bhytCovered
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {svc.bhytCovered ? "BHYT chi trả" : "Tự túc"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100"
                      >
                        <Edit size={12} aria-hidden="true" />
                        Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
