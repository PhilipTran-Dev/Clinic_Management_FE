import { toast } from "sonner";
import { PackageCheck, Printer, X, QrCode, MessageCircle } from "lucide-react";
import PharmacyHeader from "./components/PharmacyHeader";
import PrescriptionQueueList from "./components/PrescriptionQueueList";
import PrescriptionDetailCard from "./components/PrescriptionDetailCard";
import MedicationPackingTray from "./components/MedicationPackingTray";
import QrVerificationModal from "./components/QrVerificationModal";
import BillingSummaryCard from "./components/BillingSummaryCard";
import { usePharmacyQueue } from "./hooks/usePharmacyQueue";

export default function PharmacyPage() {
  const queue = usePharmacyQueue();
  const { selectedOrder } = queue;

  const pendingCount =
    queue.orders.filter(
      (o) =>
        o.status === "PENDING_PREPARATION" || o.status === "PREPARING",
    ).length;
  const readyCount = queue.orders.filter(
    (o) => o.status === "READY_FOR_PICKUP",
  ).length;

  const allPacked =
    selectedOrder.items.length > 0 &&
    selectedOrder.items.every((i) => i.isPacked);
  const settled =
    selectedOrder.paymentStatus === "PAID_ONLINE" ||
    selectedOrder.paymentStatus === "SETTLED_AT_COUNTER";
  const canHandover = allPacked && settled;

  function handleToggleItem(itemId: string) {
    queue.toggleItemPacked(selectedOrder.orderId, itemId);
  }

  function handleVerified() {
    queue.toggleQrScanner();
  }

  function handleMarkCashSettled() {
    queue.updatePaymentStatus(selectedOrder.orderId, "SETTLED_AT_COUNTER");
    toast.success("Đã thu tiền mặt tại quầy.", { duration: 3000 });
  }

  function handleConfirmHandover() {
    if (!canHandover) return;
    const patientName = selectedOrder.patientName;
    queue.updateOrderStatus(selectedOrder.orderId, "DISPENSED");
    toast.success(
      `Đã bàn giao thuốc cho bệnh nhân ${patientName}. Bản ghi FHIR MedicationDispense đã được đồng bộ thành công.`,
      { duration: 4000 },
    );
    queue.advanceToNext();
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface-light text-slate-900">
      <PharmacyHeader
        pendingCount={pendingCount}
        readyCount={readyCount}
        onOpenScanner={queue.toggleQrScanner}
      />

      <div className="flex min-h-0 flex-1">
        <PrescriptionQueueList
          orders={queue.orders}
          selectedOrderId={queue.selectedOrderId}
          onSelect={queue.selectOrder}
        />

        {/* Inspection workspace */}
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
            <PrescriptionDetailCard order={selectedOrder} />
            <MedicationPackingTray
              order={selectedOrder}
              onToggleItem={handleToggleItem}
            />
            <BillingSummaryCard
              order={selectedOrder}
              onGenerateVietQr={queue.toggleBillingQr}
              onMarkCashSettled={handleMarkCashSettled}
            />
          </div>

          {/* FHIR handover dock */}
          <footer className="flex h-14 shrink-0 items-center justify-between gap-3 border-t border-slate-200/80 bg-white px-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  toast.info(
                    `Đã in phiếu hướng dẫn sử dụng thuốc #${selectedOrder.orderId}.`,
                  )
                }
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Printer className="h-4 w-4" aria-hidden="true" />
                In Phiếu Hướng Dẫn Sử Dụng Thuốc
              </button>
              <button
                type="button"
                onClick={() =>
                  toast.info(
                    `Đã mở hội thoại tư vấn cách dùng thuốc cho ${selectedOrder.patientName}.`,
                  )
                }
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Tư Vấn Cách Dùng
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                {!allPacked
                  ? "Chưa đối soát đủ khay thuốc"
                  : !settled
                    ? "Chưa tất toán thanh toán"
                    : "Sẵn sàng bàn giao"}
              </span>
              <button
                type="button"
                onClick={handleConfirmHandover}
                disabled={!canHandover}
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                <PackageCheck className="h-5 w-5" aria-hidden="true" />
                📦 Xác Nhận Bàn Giao Thuốc Cho Người Bệnh
              </button>
            </div>
          </footer>
        </main>
      </div>

      <QrVerificationModal
        open={queue.qrOpen}
        order={selectedOrder}
        onClose={queue.toggleQrScanner}
        onVerified={handleVerified}
      />

      {/* VietQR popup */}
      {queue.billingQrOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="VietQR thu tiền"
        >
          <button
            type="button"
            aria-label="Đóng VietQR"
            onClick={queue.toggleBillingQr}
            className="absolute inset-0 bg-slate-900/40"
          />
          <div className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-sm -translate-y-1/2 rounded-2xl border border-slate-200 bg-surface-light p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <p className="text-sm font-bold text-slate-900">
                VietQR - Thu Tiền Tại Quầy
              </p>
              <button
                type="button"
                onClick={queue.toggleBillingQr}
                aria-label="Đóng cửa sổ"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="py-4 text-center">
              <span className="mx-auto flex h-48 w-48 items-center justify-center rounded-xl border border-slate-300 bg-white">
                <QrCode className="h-32 w-32 text-slate-800" />
              </span>
              <p className="mt-3 text-xs text-slate-500">
                Quét mã để thanh toán cho{" "}
                <span className="font-semibold text-slate-700">
                  {selectedOrder.patientName}
                </span>
              </p>
              <p className="mt-0.5 text-sm font-bold text-emerald-700">
                33.600 đ
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}