import Link from "next/link";

const STOPS = [
  { no: 19, code: "SC2611170001", name: "Nguyễn Văn An", addr: "12 Lê Lợi, P. Bến Nghé, Q.1", cod: "482.000 ₫", tag: "Hẹn sau 21h", tone: "bg-blue-100 text-blue-800" },
  { no: 20, code: "SC2611170233", name: "Lý Thanh Trúc", addr: "64 Nguyễn Huệ, P. Bến Nghé, Q.1", cod: "0 ₫", tag: "Đã thanh toán", tone: "bg-green-100 text-green-800" },
  { no: 21, code: "SC2611160590", name: "Đỗ Hải Nam", addr: "5 Tôn Đức Thắng, P. Bến Nghé, Q.1", cod: "1.150.000 ₫", tag: "Giao lần 2", tone: "bg-amber-100 text-amber-800" },
];

export const metadata = { title: "ShipCRM — App shipper" };

export default function ShipperPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col bg-ground">
      <header className="flex flex-col gap-3.5 bg-ink px-5 pb-5 pt-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] text-[#C9CCD3]">Xin chào,</div>
            <div className="text-lg font-bold">Huỳnh Phát</div>
          </div>
          <div className="rounded-full bg-ink-2 px-2.5 py-1.5 text-xs font-semibold text-[#C9CCD3]">BC Quận 1</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#C9CCD3]">Tiến độ hôm nay</span>
            <span className="font-semibold">18 / 32 đơn</span>
          </div>
          <div className="h-2 rounded bg-ink-2">
            <div className="h-2 w-[56%] rounded bg-orange-500" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-[10px] bg-ink-2 px-3 py-2.5">
            <div className="text-xs text-[#C9CCD3]">COD đã thu</div>
            <div className="text-base font-bold">6.840.000 ₫</div>
          </div>
          <div className="rounded-[10px] bg-ink-2 px-3 py-2.5">
            <div className="text-xs text-[#C9CCD3]">Giao thất bại</div>
            <div className="text-base font-bold">2 đơn</div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between px-4 pb-2 pt-4">
        <h1 className="text-base font-bold">Đơn cần giao (14)</h1>
        <button type="button" className="h-9 rounded-lg border border-line-input bg-white px-3 text-[13px] font-semibold">Quét mã</button>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
        {STOPS.map((s) => (
          <article key={s.code} className="card flex flex-col gap-2.5 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-muted">#{s.no} · {s.code}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${s.tone}`}>{s.tag}</span>
            </div>
            <div>
              <div className="text-[15px] font-semibold">{s.name}</div>
              <div className="mt-0.5 text-[13px] leading-snug text-ink-body">{s.addr}</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted">Thu hộ</span>
              <span className="text-base font-bold">{s.cod}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" className="h-11 rounded-lg border border-line-input bg-white text-[13px] font-semibold">Gọi</button>
              <button type="button" className="h-11 rounded-lg border border-line-input bg-white text-[13px] font-semibold text-red-700">Báo lỗi</button>
              <button type="button" className="h-11 rounded-lg bg-brand text-[13px] font-semibold text-white">Đã giao</button>
            </div>
          </article>
        ))}
      </div>

      <nav aria-label="Thanh điều hướng" className="sticky bottom-0 grid grid-cols-4 border-t border-line bg-white px-2 pb-[18px] pt-1.5">
        {["Giao hàng", "Lấy hàng", "Nộp COD", "Tài khoản"].map((t, i) => (
          <Link key={t} href="#" className={`flex h-12 items-center justify-center text-xs ${i === 0 ? "font-bold text-brand" : "font-medium text-muted"}`}>
            {t}
          </Link>
        ))}
      </nav>
    </div>
  );
}
