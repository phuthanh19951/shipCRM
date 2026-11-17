"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CUSTOMERS, CUSTOMER_COUNTS, CUSTOMER_STATUS, TIER, formatVND, type CustomerStatus } from "@/lib/data";

type Tab = CustomerStatus | "all";
const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "active", label: "Đang hoạt động" },
  { id: "paused", label: "Tạm ngưng" },
];

export default function CustomersPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState("all");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s/g, "");
    return CUSTOMERS.filter((c) => {
      if (tab !== "all" && c.status !== tab) return false;
      if (tier !== "all" && c.tier !== tier) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().replace(/\s/g, "").includes(q) ||
        c.phone.replace(/\s/g, "").includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    });
  }, [tab, query, tier]);

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold">Khách hàng</h1>
          <p className="mt-1 text-sm text-muted">Quản lý shop/khách hàng đang sử dụng dịch vụ vận chuyển</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-outline">Xuất Excel</button>
          <button type="button" className="btn-primary">+ Thêm khách hàng</button>
        </div>
      </header>

      <div role="tablist" aria-label="Lọc theo trạng thái" className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const on = t.id === tab;
          const count = CUSTOMER_COUNTS[t.id];
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(t.id)}
              className={`h-10 rounded-full border px-3.5 text-[13px] font-semibold transition-colors ${
                on ? "border-ink bg-ink text-white" : "border-line-input bg-white text-ink-body hover:bg-ground"
              }`}
            >
              {t.label} · {count}
            </button>
          );
        })}
      </div>

      <section className="card">
        <div className="flex flex-wrap items-end gap-3 border-b border-line-soft px-5 py-4">
          <div className="flex flex-[2_1_260px] flex-col gap-1.5">
            <label htmlFor="q" className="text-xs font-semibold text-muted">Tìm kiếm</label>
            <input
              id="q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mã KH, tên shop hoặc SĐT"
              className="input h-10"
            />
          </div>
          <div className="flex flex-[1_1_180px] flex-col gap-1.5">
            <label htmlFor="tier" className="text-xs font-semibold text-muted">Hạng khách hàng</label>
            <select id="tier" value={tier} onChange={(e) => setTier(e.target.value)} className="input h-10">
              <option value="all">Tất cả hạng</option>
              {Object.entries(TIER).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F9FAFB] text-left text-muted">
                <th className="px-5 py-2.5 font-semibold">Mã KH</th>
                <th className="px-3 py-2.5 font-semibold">Khách hàng</th>
                <th className="px-3 py-2.5 font-semibold">Hạng</th>
                <th className="px-3 py-2.5 text-right font-semibold">Đơn hàng</th>
                <th className="px-3 py-2.5 text-right font-semibold">Tỷ lệ thành công</th>
                <th className="px-3 py-2.5 text-right font-semibold">COD chờ đối soát</th>
                <th className="px-3 py-2.5 font-semibold">Trạng thái</th>
                <th className="px-5 py-2.5"><span className="sr-only">Thao tác</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-t border-line-soft hover:bg-[#FAFAFB]">
                  <td className="px-5 py-3 font-semibold">
                    <Link href={`/customers/${c.id}`} className="text-brand hover:text-brand-dark">{c.id}</Link>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-xs text-muted">{c.phone}</div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${TIER[c.tier].badge}`}>
                      {TIER[c.tier].label}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold">{c.totalOrders.toLocaleString("vi-VN")}</td>
                  <td className="px-3 py-3 text-right text-ink-body">{c.successRate.toLocaleString("vi-VN")}%</td>
                  <td className="px-3 py-3 text-right font-semibold">{formatVND(c.codBalance)}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${CUSTOMER_STATUS[c.status].badge}`}>
                      {CUSTOMER_STATUS[c.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/customers/${c.id}`} className="inline-flex h-8 items-center rounded-lg border border-line-input px-3 text-xs font-semibold hover:bg-ground">
                      Xem
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="p-10 text-center text-sm text-muted">Không có khách hàng phù hợp.</div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft px-5 py-3.5 text-[13px] text-muted">
          <span>Hiển thị {rows.length} / {CUSTOMER_COUNTS.all} khách hàng</span>
        </div>
      </section>
    </>
  );
}
