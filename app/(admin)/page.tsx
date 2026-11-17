import Link from "next/link";
import { STATUS, type StatusKey } from "@/lib/data";

const KPIS = [
  { label: "Đơn tạo hôm nay", value: "1.284", delta: "▲ 8,4% so với hôm qua", tone: "text-green-700" },
  { label: "Đang giao", value: "642", delta: "128 shipper đang chạy", tone: "text-muted" },
  { label: "Giao thành công", value: "1.017", delta: "Tỷ lệ 94,2%", tone: "text-green-700" },
  { label: "Chuyển hoàn", value: "38", delta: "▲ 5 đơn so với hôm qua", tone: "text-red-700" },
  { label: "COD chờ đối soát", value: "286,4 tr ₫", delta: "412 đơn · hạn 19/11", tone: "text-muted" },
];

const WEEK = [
  { day: "T4 11/11", v: 1120 },
  { day: "T5 12/11", v: 1240 },
  { day: "T6 13/11", v: 1180 },
  { day: "T7 14/11", v: 1310 },
  { day: "CN 15/11", v: 1450 },
  { day: "T2 16/11", v: 1620 },
  { day: "Hôm nay", v: 1284 },
];

const STATUS_ROWS: { key: StatusKey | "nhap_kho"; count: number }[] = [
  { key: "cho_lay", count: 214 },
  { key: "nhap_kho", count: 186 },
  { key: "trung_chuyen", count: 318 },
  { key: "dang_giao", count: 642 },
  { key: "chuyen_hoan", count: 38 },
];

const ISSUES = [
  { code: "SC2611170001", issue: "Giao thất bại lần 2", tone: "bg-red-100 text-red-800", receiver: "Nguyễn Văn An", hub: "BC Quận 1" },
  { code: "SC2611150310", issue: "Quá hạn lấy hàng", tone: "bg-amber-100 text-amber-800", receiver: "Shop Hoa Linh", hub: "BC Thủ Đức" },
  { code: "SC2611160913", issue: "Khách hẹn giao lại", tone: "bg-blue-100 text-blue-800", receiver: "Lê Minh Khoa", hub: "BC Cầu Giấy" },
  { code: "SC2611160877", issue: "Sai địa chỉ", tone: "bg-red-100 text-red-800", receiver: "Phạm Quốc Huy", hub: "BC Hải Châu" },
  { code: "SC2611160702", issue: "Khiếu nại hư hỏng", tone: "bg-violet-100 text-violet-800", receiver: "Võ Ngọc Anh", hub: "BC Quận 7" },
];

const HUBS = [
  { name: "BC Quận 7 — TP.HCM", meta: "214 đơn · 18 shipper", rate: "97,1%", tone: "text-green-700" },
  { name: "BC Cầu Giấy — Hà Nội", meta: "188 đơn · 15 shipper", rate: "95,6%", tone: "text-green-700" },
  { name: "BC Hải Châu — Đà Nẵng", meta: "96 đơn · 8 shipper", rate: "93,8%", tone: "text-ink" },
  { name: "BC Gò Vấp — TP.HCM", meta: "172 đơn · 14 shipper", rate: "89,5%", tone: "text-red-700" },
];

export default function DashboardPage() {
  const maxWeek = Math.max(...WEEK.map((d) => d.v));
  const maxStatus = Math.max(...STATUS_ROWS.map((s) => s.count));

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold">Tổng quan vận hành</h1>
          <p className="mt-1 text-sm text-muted">Hôm nay, 17/11/2026 · Cập nhật lúc 21:30</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="track" className="sr-only">Tra mã vận đơn</label>
          <input id="track" type="search" placeholder="Tra mã vận đơn, SĐT người nhận…" className="input w-[300px] max-w-full" />
          <Link href="/orders/new" className="btn-primary">+ Tạo đơn mới</Link>
        </div>
      </header>

      <section aria-label="Chỉ số chính" className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
        {KPIS.map((k) => (
          <div key={k.label} className="card flex flex-col gap-1.5 px-5 py-[18px]">
            <div className="text-[13px] font-medium text-muted">{k.label}</div>
            <div className="text-[26px] font-bold tracking-tight">{k.value}</div>
            <div className={`text-xs font-medium ${k.tone}`}>{k.delta}</div>
          </div>
        ))}
      </section>

      <div className="flex flex-wrap gap-4">
        <section className="card min-w-0 flex-[3_1_480px] px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-base font-semibold">Sản lượng đơn 7 ngày</h2>
            <span className="text-[13px] text-muted">Tổng 9.204 đơn</span>
          </div>
          <div className="mt-5 flex h-[220px] items-end gap-4 border-b border-line px-1">
            {WEEK.map((d, i) => (
              <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-xs text-muted">{d.v.toLocaleString("vi-VN")}</span>
                <div
                  className={`w-full max-w-[44px] rounded-t-md ${i === WEEK.length - 1 ? "bg-brand" : "bg-[#C9CDD6]"}`}
                  style={{ height: Math.round((d.v / maxWeek) * 170) }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 px-1 pt-2">
            {WEEK.map((d) => (
              <div key={d.day} className="flex-1 text-center text-xs text-muted">{d.day}</div>
            ))}
          </div>
        </section>

        <section className="card flex min-w-0 flex-[2_1_320px] flex-col gap-3.5 px-6 py-5">
          <h2 className="text-base font-semibold">Đơn đang xử lý theo trạng thái</h2>
          {STATUS_ROWS.map((s) => {
            const meta = s.key === "nhap_kho" ? { label: "Đã nhập kho", bar: "bg-slate-500" } : STATUS[s.key];
            return (
              <div key={s.key} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[13px]">
                  <span className="text-ink-body">{meta.label}</span>
                  <span className="font-semibold">{s.count}</span>
                </div>
                <div className="h-2 rounded bg-line-soft">
                  <div className={`h-2 rounded ${meta.bar}`} style={{ width: `${(s.count / maxStatus) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <div className="flex flex-wrap gap-4">
        <section className="card min-w-0 flex-[3_1_520px] pb-2 pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3 px-6 pb-3">
            <h2 className="text-base font-semibold">Đơn cần xử lý</h2>
            <Link href="/orders" className="text-[13px] font-semibold text-brand hover:text-brand-dark">Xem tất cả →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#F9FAFB] text-left text-muted">
                  <th className="px-6 py-2.5 font-semibold">Mã vận đơn</th>
                  <th className="px-3 py-2.5 font-semibold">Vấn đề</th>
                  <th className="px-3 py-2.5 font-semibold">Người nhận</th>
                  <th className="px-3 py-2.5 font-semibold">Bưu cục</th>
                  <th className="px-6 py-2.5"><span className="sr-only">Thao tác</span></th>
                </tr>
              </thead>
              <tbody>
                {ISSUES.map((i) => (
                  <tr key={i.code} className="border-t border-line-soft">
                    <td className="px-6 py-3 font-semibold">
                      <Link href={`/orders/${i.code}`} className="text-brand hover:text-brand-dark">{i.code}</Link>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${i.tone}`}>{i.issue}</span>
                    </td>
                    <td className="px-3 py-3 text-ink-body">{i.receiver}</td>
                    <td className="px-3 py-3 text-ink-body">{i.hub}</td>
                    <td className="px-6 py-3 text-right">
                      <Link href={`/orders/${i.code}`} className="inline-flex h-8 items-center rounded-lg border border-line-input px-3 text-xs font-semibold hover:bg-ground">
                        Xử lý
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card flex min-w-0 flex-[2_1_320px] flex-col gap-1 px-6 py-5">
          <h2 className="mb-2 text-base font-semibold">Tỷ lệ giao thành công theo bưu cục</h2>
          {HUBS.map((h) => (
            <div key={h.name} className="flex items-center justify-between gap-3 border-t border-line-soft py-2.5">
              <div>
                <div className="text-sm font-semibold">{h.name}</div>
                <div className="text-xs text-muted">{h.meta}</div>
              </div>
              <div className={`text-[15px] font-bold ${h.tone}`}>{h.rate}</div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
