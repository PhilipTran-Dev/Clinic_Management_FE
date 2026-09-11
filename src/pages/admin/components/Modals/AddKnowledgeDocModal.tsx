import { useState } from "react";
import { toast } from "sonner";
import { X, UploadCloud, FileUp } from "lucide-react";
import type { KnowledgeDocument } from "../../data/adminMockData";

interface AddKnowledgeDocModalProps {
  onClose: () => void;
  onAdd: (doc: KnowledgeDocument) => void;
}

const CATEGORY_OPTIONS = [
  { value: "BHYT_POLICY", label: "Chính sách BHYT" },
  { value: "PRICING", label: "Bảng giá" },
  { value: "DOCTOR_SCHEDULE", label: "Lịch trực / Lịch công tác" },
  { value: "CLINIC_GUIDE", label: "Quy trình hướng dẫn" },
] as const;

export default function AddKnowledgeDocModal({
  onClose,
  onAdd,
}: AddKnowledgeDocModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<KnowledgeDocument["category"]>("BHYT_POLICY");
  const [fileName, setFileName] = useState("");
  const [content, setContent] = useState("");

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const baseTitle = file.name.replace(/\.(md|txt)$/i, "").replace(/[-_]/g, " ");
      setTitle(baseTitle);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Vui lòng nhập Tiêu đề và Nội dung tài liệu.");
      return;
    }

    const newDoc: KnowledgeDocument = {
      id: `KB-${Date.now().toString().slice(-6)}`,
      title: title.trim(),
      category,
      contentSnippet: content.trim().slice(0, 180) + (content.trim().length > 180 ? "..." : ""),
      chunkCount: Math.max(1, Math.ceil(content.trim().length / 500)),
      embeddingModel: "text-embedding-3-small (1536d)",
      updatedAt: "Hôm nay",
      status: "INDEXED",
    };

    onAdd(newDoc);
    toast.success(
      `Tài liệu "${newDoc.title}" đã được phân đoạn thành ${newDoc.chunkCount} chunks và nhúng vào pgvector.`,
      { duration: 4000 },
    );
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Tải lên tài liệu tri thức"
    >
      <div className="w-full max-w-lg rounded-xl border border-slate-200/80 bg-white shadow-elevated">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <FileUp size={18} className="text-slate-700" aria-hidden="true" />
            <h3 className="text-sm font-bold text-slate-900">Tải Lên Tài Liệu Mới</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Đóng"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Danh mục tài liệu *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setCategory(opt.value)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                    category === opt.value
                      ? "border-slate-800 bg-slate-800 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Tiêu đề tài liệu *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Chính sách BHYT Phòng khám 2026"
              className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Tệp nguồn (Markdown hoặc Text)
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition-colors hover:border-slate-400 hover:bg-slate-100">
              <UploadCloud size={20} className="text-slate-400" aria-hidden="true" />
              <span className="mt-2 text-xs font-semibold text-slate-600">
                {fileName || "Chọn tệp .md / .txt"}
              </span>
              <span className="text-[11px] text-slate-400">
                Tài liệu sẽ được phân đoạn (Chunking) & nhúng Vector (1536 dims)
              </span>
              <input
                type="file"
                accept=".md,.txt,text/markdown,text/plain"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Nội dung tài liệu *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Dán hoặc nhập nội dung Markdown / text..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-900"
            >
              <FileUp size={16} aria-hidden="true" />
              Tải Lên & Chỉ mục RAG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}