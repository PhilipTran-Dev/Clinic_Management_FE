import {
  Activity,
  Brain,
  FileCheck,
  Zap,
  TrendingUp,
  Server,
  CheckCircle2,
} from "lucide-react";
import type { SystemMetrics, TriageDistribution, InfrastructureService } from "../data/adminMockData";
import { MOCK_TRIAGE_DISTRIBUTION, MOCK_INFRA_SERVICES } from "../data/adminMockData";

interface OverviewTabProps {
  metrics: SystemMetrics;
}

export default function OverviewTab({ metrics }: OverviewTabProps) {
  const triageData: TriageDistribution[] = MOCK_TRIAGE_DISTRIBUTION;
  const services: InfrastructureService[] = MOCK_INFRA_SERVICES;
  const totalTriage = triageData.reduce((sum, t) => sum + t.count, 0);

  const kpiCards = [
    {
      label: "Lượt khám hôm nay",
      value: metrics.activeEncounters,
      suffix: " ca",
      delta: `+${metrics.encountersDeltaPercent}% so với hôm qua`,
      icon: Activity,
      iconColor: "text-clinical-600",
      iconBg: "bg-clinical-50",
    },
    {
      label: "Độ chính xác AI Triage",
      value: metrics.triageAccuracyPercent,
      suffix: "%",
      delta: "Bác sĩ đồng thuận chẩn đoán",
      icon: Brain,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },
    {
      label: "Tỷ lệ số hóa OCR",
      value: metrics.ocrSuccessRate,
      suffix: "%",
      delta: "PaddleOCR Processing",
      icon: FileCheck,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },
    {
      label: "Độ trễ AI Gateway",
      value: metrics.avgAiLatencyMs,
      suffix: "ms",
      delta: "Whisper + GPT-4o Average",
      icon: Zap,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-500">{kpi.label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {kpi.value}
                  <span className="text-sm font-semibold text-slate-500">{kpi.suffix}</span>
                </p>
                <p className="mt-1 text-[11px] text-slate-400">{kpi.delta}</p>
              </div>
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${kpi.iconBg}`}
              >
                <kpi.icon size={20} className={kpi.iconColor} aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Triage Distribution */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-slate-600" aria-hidden="true" />
            <h3 className="text-sm font-bold text-slate-900">
              Phân bổ Hàng đợi & Triage
            </h3>
          </div>
          <div className="space-y-3">
            {triageData.map((item) => {
              const pct = totalTriage > 0 ? (item.count / totalTriage) * 100 : 0;
              return (
                <div key={item.level}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{item.level}</span>
                    <span className="font-semibold text-slate-900">
                      {item.count} ca ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.bgColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
            Tổng cộng hàng đợi: <span className="font-semibold text-slate-800">{totalTriage} bệnh nhân</span>
          </div>
        </div>

        {/* Infrastructure Status */}
        <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Server size={18} className="text-slate-600" aria-hidden="true" />
            <h3 className="text-sm font-bold text-slate-900">
              Trạng thái Microservices & Hạ tầng
            </h3>
          </div>
          <div className="space-y-2.5">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      svc.status === "operational"
                        ? "bg-emerald-400"
                        : svc.status === "degraded"
                          ? "bg-amber-400"
                          : "bg-red-400"
                    }`}
                  />
                  <span className="text-xs font-medium text-slate-700">{svc.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {svc.latencyMs !== undefined && (
                    <span className="text-[11px] text-slate-400">{svc.latencyMs}ms</span>
                  )}
                  <CheckCircle2 size={14} className="text-emerald-500" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Tổng doanh thu hôm nay</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {metrics.totalRevenueVnd.toLocaleString("vi-VN")}đ
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-slate-500">Tổng lượt tư vấn</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{metrics.dailyConsultations}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
