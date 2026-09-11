import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  Plus,
  RefreshCw,
  FileText,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Brain,
} from "lucide-react";
import type { KnowledgeDocument } from "../data/adminMockData";
import { CATEGORY_LABELS } from "../data/adminMockData";
import AddKnowledgeDocModal from "./Modals/AddKnowledgeDocModal";

interface RagKnowledgeBaseTabProps {
  documents: KnowledgeDocument[];
  isReindexing: boolean;
  reindexProgress: number;
  onAddDocument: (doc: KnowledgeDocument) => void;
  onDeleteDocument: (docId: string) => void;
  onTriggerReindex: () => void;
}

const CATEGORY_COLORS: Record<KnowledgeDocument["category"], string> = {
  BHYT_POLICY: "bg-blue-100 text-blue-800 border-blue-200",
  PRICING: "bg-amber-100 text-amber-800 border-amber-200",
  DOCTOR_SCHEDULE: "bg-emerald-100 text-emerald-800 border-emerald-200",
  CLINIC_GUIDE: "bg-violet-100 text-violet-800 border-violet-200",
};

const STATUS_COLORS: Record<KnowledgeDocument["status"], string> = {
  INDEXED: "bg-emerald-50 text-emerald-700",
  SYNCING: "bg-amber-50 text-amber-700",
  STALE: "bg-red-50 text-red-700",
};

const STATUS_LABELS: Record<KnowledgeDocument["status"], string> = {
  INDEXED: "Đã nhúng",
  SYNCING: "Đang đồng bộ",
  STALE: "Cần cập nhật",
};

export default function RagKnowledgeBaseTab({
  documents,
  isReindexing,
  reindexProgress,
  onAddDocument,
  onDeleteDocument,
  onTriggerReindex,
}: RagKnowledgeBaseTabProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const completionNotified = useRef(false);

  useEffect(() => {
    if (reindexProgress >= 100 && !completionNotified.current) {
      completionNotified.current = true;
      toast.success("Đã đồng bộ 41 chunks vào pgvector thành công.", { duration: 4000 });
    }
  }, [reindexProgress]);

  function handleReindex() {
    completionNotified.current = false;
    onTriggerReindex();
    toast.info("Bắt đầu quá trình nhúng lại Vector Embeddings...", { duration: 3000 });
  }

  function handleDelete(doc: KnowledgeDocument) {
    onDeleteDocument(doc.id);
    toast.success(`Đã xóa tài liệu "${doc.title}" khỏi RAG Knowledge Store.`);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Cơ Sở Tri Thức Phòng Khám (RAG Knowledge Store)
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Quản lý tài liệu nguồn phục vụ Trợ lý ảo AI trả lời câu hỏi của Bệnh nhân.
            Hỗ trợ tìm kiếm ngữ nghĩa qua pgvector.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReindex}
            disabled={isReindexing}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isReindexing ? (
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            ) : (
              <RefreshCw size={14} aria-hidden="true" />
            )}
            {isReindexing ? "Đang nhúng lại..." : "Kích Hoạt Nhúng Lại Vector"}
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-900"
          >
            <Plus size={16} aria-hidden="true" />
            Tải Lên Tài Liệu Mới
          </button>
        </div>
      </div>

      {/* Reindex Progress */}
      {isReindexing && (
        <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-card">
          <div className="mb-2 flex items-center gap-2">
            <Brain size={16} className="text-violet-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-slate-700">
              Đang phân đoạn (Chunking) &amp; tính toán Vector Embeddings (1536 dims)...
            </span>
            <span className="ml-auto text-xs font-bold text-slate-800">
              {reindexProgress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-clinical-600 transition-all duration-300"
              style={{ width: `${reindexProgress}%` }}
            />
          </div>
          {reindexProgress >= 100 && (
            <p className="mt-2 text-xs text-emerald-600 font-medium">
              Đã đồng bộ 41 chunks vào pgvector thành công.
            </p>
          )}
        </div>
      )}

      {/* Document Cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-card transition-shadow hover:shadow-elevated"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <FileText size={18} className="text-slate-600" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900">{doc.title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_COLORS[doc.category]}`}
                    >
                      {CATEGORY_LABELS[doc.category]}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[doc.status]}`}
                    >
                      {STATUS_LABELS[doc.status]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-slate-500">
              {doc.contentSnippet}
            </p>

            <div className="mb-3 flex items-center gap-4 text-[11px] text-slate-400">
              <span>
                Chunks: <span className="font-semibold text-slate-700">{doc.chunkCount}</span>
              </span>
              <span>
                Model: <span className="font-semibold text-slate-700">{doc.embeddingModel}</span>
              </span>
              <span>
                Cập nhật: <span className="font-semibold text-slate-700">{doc.updatedAt}</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 border-t border-slate-100 pt-3">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                <Edit size={12} aria-hidden="true" />
                Chỉnh sửa
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100"
              >
                <Eye size={12} aria-hidden="true" />
                Xem các đoạn text (Chunks)
              </button>
              <button
                type="button"
                onClick={() => handleDelete(doc)}
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <Trash2 size={12} aria-hidden="true" />
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddKnowledgeDocModal
          onClose={() => setShowAddModal(false)}
          onAdd={onAddDocument}
        />
      )}
    </div>
  );
}
