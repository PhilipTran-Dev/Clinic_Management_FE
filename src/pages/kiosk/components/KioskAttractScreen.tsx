import { CreditCard, MapPin, QrCode } from "lucide-react";

interface KioskAttractScreenProps {
  onQrCheckIn: () => void;
  onWalkIn: () => void;
  onWayfinding: () => void;
}

export default function KioskAttractScreen({
  onQrCheckIn,
  onWalkIn,
  onWayfinding,
}: KioskAttractScreenProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Xin Chào! Kiosk Đăng Ký Khám Thông Minh
        </h1>
        <p className="mt-2 text-lg text-slate-500">
          Chọn một trong hai hình thức bên dưới để bắt đầu làm thủ tục tiếp đón.
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-2 gap-6">
        {/* QR Check-in */}
        <button
          type="button"
          onClick={onQrCheckIn}
          className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-clinical-200 bg-white p-8 text-center shadow-card transition-transform active:scale-95"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-clinical-50">
            <QrCode className="h-16 w-16 text-clinical-600" aria-hidden="true" />
          </span>
          <p className="text-lg font-bold uppercase tracking-wide text-clinical-700">
            📱 Đã Đặt Lịch Trước - Quét Mã QR
          </p>
          <h2 className="text-2xl font-bold leading-tight text-slate-900">
            Quét Mã Vé Hẹn Khám (5 Giây)
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">
            Dành cho người bệnh đã đặt lịch trên điện thoại. Chạm vào đây để
            quét mã QR và lấy số thứ tự ngay.
          </p>
          <span className="inline-flex h-16 w-full items-center justify-center rounded-xl bg-clinical-600 text-lg font-bold text-white shadow-md transition-colors hover:bg-clinical-700">
            Chạm Để Quét Mã
          </span>
        </button>

        {/* Walk-in OCR */}
        <button
          type="button"
          onClick={onWalkIn}
          className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-teal-200 bg-white p-8 text-center shadow-card transition-transform active:scale-95"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-50">
            <CreditCard
              className="h-16 w-16 text-teal-600"
              aria-hidden="true"
            />
          </span>
          <p className="text-lg font-bold uppercase tracking-wide text-teal-700">
            💳 Chưa Đặt Lịch - Quét Thẻ BHYT / CCCD
          </p>
          <h2 className="text-2xl font-bold leading-tight text-slate-900">
            Đăng Ký Khám Mới / Bệnh Nhân Vãng Lai
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">
            Tự động điền thông tin bằng cách đặt thẻ BHYT hoặc CCCD gắn chip
            vào khe quét.
          </p>
          <span className="inline-flex h-16 w-full items-center justify-center rounded-xl bg-teal-600 text-lg font-bold text-white shadow-md transition-colors hover:bg-teal-700">
            Đăng Ký Khám Mới
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={onWayfinding}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition-transform active:scale-95"
      >
        <MapPin className="h-5 w-5 text-clinical-600" aria-hidden="true" />
        🗺️ Xem Sơ Đồ Chỉ Đường Phòng Khám
      </button>
    </div>
  );
}