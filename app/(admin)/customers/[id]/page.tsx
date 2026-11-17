import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { CARE_NOTES, CUSTOMERS, CUSTOMER_STATUS, TIER, customerOrders, findCustomer, formatVND, maskPhone } from "@/lib/data";

export function generateStaticParams() {
  return CUSTOMERS.map((c) => ({ id: c.id }));
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = findCustomer(id);
  if (!customer) notFound();

  const orders = customerOrders(customer.name);
  const avgOrderValue = orders.length
    ? Math.round(orders.reduce((sum, o) => sum + o.cod + o.shippingFee, 0) / orders.length)
    : 0;
  const initials = customer.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Link href="/customers" className="text-[13px] font-semibold text-brand hover:text-brand-dark">← Danh sách khách hàng</Link>

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#FFF1E8] text-lg font-bold text-brand-dark">
            {initials}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-[26px] font-bold">{customer.name}</h1>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${TIER[customer.tier].badge}`}>
                {TIER[customer.tier].label}
              </span>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${CUSTOMER_STATUS[customer.status].badge}`}>
                {CUSTOMER_STATUS[customer.status].label}
              </span>
            </div>
            <p className="text-sm text-muted">{customer.id} · Tham gia từ {customer.joinedAt}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" className="btn-outline">Chỉnh sửa</button>
          <Link href="/orders/new" className="btn-primary">+ Tạo đơn cho khách</Link>
        </div>
      </header>

      <section aria-label="Chỉ số khách hàng" className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-4">
        <div className="card flex flex-col gap-1.5 px-5 py-[18px]">
          <div className="text-[13px] font-medium text-muted">Tổng đơn hàng</div>
          <div className="text-[26px] font-bold tracking-tight">{customer.totalOrders.toLocaleString("vi-VN")}</div>
        </div>
        <div className="card flex flex-col gap-1.5 px-5 py-[18px]">
          <div className="text-[13px] font-medium text-muted">Tỷ lệ giao thành công</div>
          <div className="text-[26px] font-bold tracking-tight">{customer.successRate.toLocaleString("vi-VN")}%</div>
        </div>
        <div className="card flex flex-col gap-1.5 px-5 py-[18px]">
          <div className="text-[13px] font-medium text-muted">COD chờ đối soát</div>
          <div className="text-[26px] font-bold tracking-tight">{formatVND(customer.codBalance)}</div>
        </div>
        <div className="card flex flex-col gap-1.5 px-5 py-[18px]">
          <div className="text-[13px] font-medium text-muted">Giá trị đơn trung bình</div>
          <div className="text-[26px] font-bold tracking-tight">{formatVND(avgOrderValue)}</div>
        </div>
      </section>

      <div className="flex flex-wrap items-start gap-4">
        <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-4">
          <section className="card pb-2 pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3 px-6 pb-3">
              <h2 className="text-base font-semibold">Đơn hàng gần đây</h2>
              <Link href="/orders" className="text-[13px] font-semibold text-brand hover:text-brand-dark">Xem tất cả →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#F9FAFB] text-left text-muted">
                    <th className="px-6 py-2.5 font-semibold">Mã vận đơn</th>
                    <th className="px-3 py-2.5 font-semibold">Người nhận</th>
                    <th className="px-3 py-2.5 text-right font-semibold">COD</th>
                    <th className="px-3 py-2.5 font-semibold">Trạng thái</th>
                    <th className="px-6 py-2.5 font-semibold">Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.code} className="border-t border-line-soft">
                      <td className="px-6 py-3 font-semibold">
                        <Link href={`/orders/${o.code}`} className="text-brand hover:text-brand-dark">{o.code}</Link>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium">{o.receiver}</div>
                        <div className="text-xs text-muted">{maskPhone(o.phone)}</div>
                      </td>
                      <td className="px-3 py-3 text-right font-semibold">{formatVND(o.cod)}</td>
                      <td className="px-3 py-3"><StatusBadge status={o.status} /></td>
                      <td className="whitespace-nowrap px-6 py-3 text-muted">{o.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {orders.length === 0 && (
              <div className="p-10 text-center text-sm text-muted">Chưa có đơn hàng nào.</div>
            )}
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
          <section className="card flex flex-col gap-2.5 px-6 py-5">
            <h2 className="mb-1 text-base font-semibold">Thông tin liên hệ</h2>
            <Info label="Điện thoại" value={customer.phone} />
            <Info label="Email" value={customer.email} />
            <Info label="Địa chỉ" value={customer.address} />
            <Info label="Ngày tham gia" value={customer.joinedAt} />
          </section>
        </aside>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line-soft pt-2.5 first:border-t-0 first:pt-0">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-ink-body">{value}</div>
    </div>
  );
}
