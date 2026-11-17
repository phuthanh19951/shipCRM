import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { CARE_NOTES, ORDERS, buildTimeline, findOrder, formatVND } from "@/lib/data";

export function generateStaticParams() {
  return ORDERS.map((o) => ({ code: o.code }));
}

export default async function OrderDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const order = findOrder(code);
  if (!order) notFound();

  const timeline = buildTimeline(order);
  const total = order.cod + order.shippingFee;

  return (
    <>
      <Link href="/orders" className="text-[13px] font-semibold text-brand hover:text-brand-dark">← Danh sách đơn hàng</Link>

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[26px] font-bold">{order.code}</h1>
            <StatusBadge status={order.status} className="px-3 py-1 text-[13px]" />
          </div>
          <p className="text-sm text-muted">Tạo lúc {order.createdAt}/2026 · {order.shop} · Dịch vụ Nhanh</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" className="btn-outline">In vận đơn</button>
          <button type="button" className="btn-outline">Sửa thông tin</button>
          <button type="button" className="btn border border-red-200 bg-white text-red-700 hover:bg-red-50">Hủy đơn</button>
        </div>
      </header>

      <div className="flex flex-wrap items-start gap-4">
        <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            <section className="card flex flex-col gap-2 px-6 py-5">
              <h2 className="mb-1 text-[13px] font-semibold tracking-wide text-muted">NGƯỜI GỬI</h2>
              <div className="text-[15px] font-semibold">{order.shop}</div>
              <div className="text-sm text-ink-body">0909 123 456</div>
              <div className="text-sm leading-relaxed text-ink-body">Kho 1: 210 Cộng Hòa, P.12, Tân Bình, TP.HCM</div>
            </section>
            <section className="card flex flex-col gap-2 px-6 py-5">
              <h2 className="mb-1 text-[13px] font-semibold tracking-wide text-muted">NGƯỜI NHẬN</h2>
              <div className="text-[15px] font-semibold">{order.receiver}</div>
              <div className="text-sm text-ink-body">
                {order.phone} · <a href={`tel:${order.phone.replace(/\s/g, "")}`} className="font-semibold text-brand">Gọi</a>
              </div>
              <div className="text-sm leading-relaxed text-ink-body">{order.address}</div>
            </section>
          </div>

          <section className="card px-6 py-5">
            <h2 className="mb-4 text-base font-semibold">Hàng hóa &amp; chi phí</h2>
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 border-b border-line-soft pb-4">
              {[
                ["Nội dung", "Quần áo (2 món)"],
                ["Khối lượng", "1,2 kg"],
                ["Kích thước", "30 × 20 × 10 cm"],
                ["Yêu cầu giao", "Cho xem, không thử"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="mt-1 text-sm font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-2.5 pt-4 text-sm">
              <Row label="Tiền thu hộ (COD)" value={formatVND(order.cod)} />
              <Row label="Phí vận chuyển" value={formatVND(order.shippingFee)} />
              <Row label="Phí bảo hiểm" value={formatVND(0)} />
              <Row label="Người trả phí" value="Người nhận" />
              <div className="flex justify-between border-t border-line-soft pt-3 text-base">
                <span className="font-semibold">Tổng thu người nhận</span>
                <span className="font-bold text-brand">{formatVND(total)}</span>
              </div>
            </div>
          </section>

          <section className="card flex flex-col gap-3.5 px-6 py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-base font-semibold">Lịch sử chăm sóc khách hàng</h2>
              <button type="button" className="btn-outline h-9 px-3 text-[13px]">+ Thêm ghi chú</button>
            </div>
            {CARE_NOTES.map((n) => (
              <div key={n.when} className="flex gap-3 border-t border-line-soft pt-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#F1F2F5] text-[13px] font-bold text-ink-body">{n.initials}</div>
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]"><span className="font-semibold">{n.who}</span> <span className="text-muted">· {n.when}</span></div>
                  <p className="text-sm leading-relaxed text-ink-body">{n.text}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="flex min-w-0 flex-[2_1_320px] flex-col gap-4">
          <section className="card px-6 py-5">
            <h2 className="mb-[18px] text-base font-semibold">Hành trình đơn hàng</h2>
            <ol className="flex flex-col">
              {timeline.map((s, i) => (
                <li key={s.label} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`mt-[3px] h-3.5 w-3.5 rounded-full border-[3px] ${
                        s.state === "done" ? "border-green-700 bg-green-700" : s.state === "current" ? "border-blue-700 bg-white" : "border-[#C9CDD6] bg-white"
                      }`}
                    />
                    {i < timeline.length - 1 && (
                      <div className={`min-h-7 w-0.5 flex-1 ${s.state === "done" ? "bg-green-700" : "bg-line"}`} />
                    )}
                  </div>
                  <div className="pb-[18px]">
                    <div className={`text-sm font-semibold ${s.state === "todo" ? "text-muted" : "text-ink"}`}>{s.label}</div>
                    <div className="mt-0.5 text-[13px] text-muted">{s.meta}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="card flex flex-col gap-2.5 px-6 py-5">
            <h2 className="mb-1 text-base font-semibold">Shipper phụ trách</h2>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF1E8] font-bold text-brand-dark">HP</div>
              <div>
                <div className="text-[15px] font-semibold">Huỳnh Phát</div>
                <div className="text-[13px] text-muted">{order.hub} · 0938 *** 220</div>
              </div>
            </div>
            <div className="text-[13px] text-ink-body">Dự kiến giao: trước 12:00, 18/11/2026</div>
          </section>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-body">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
