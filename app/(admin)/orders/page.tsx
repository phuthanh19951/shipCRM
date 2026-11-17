"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { ORDERS, STATUS, STATUS_COUNTS, formatVND, maskPhone, type StatusKey } from "@/lib/data";

type Tab = StatusKey | "all";
const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Tất cả" },
  ...(Object.keys(STATUS) as StatusKey[]).map((k) => ({ id: k, label: STATUS[k].label })),
];

export default function OrdersPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [hub, setHub] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const hubs = useMemo(() => Array.from(new Set(ORDERS.map((o) => o.hub))), []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s/g, "");
    return ORDERS.filter((o) => {
      if (tab !== "all" && o.status !== tab) return false;
      if (hub !== "all" && o.hub !== hub) return false;
      if (!q) return true;
      return (
        o.code.toLowerCase().includes(q) ||
        o.receiver.toLowerCase().replace(/\s/g, "").includes(q) ||
        o.phone.replace(/\s/g, "").includes(q)
      );
    });
  }, [tab, query, hub]);

  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.code));
  const toggleAll = () =>
    setSelected(allChecked ? new Set() : new Set(rows.map((r) => r.code)));
  const toggleOne = (code: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold">Đơn hàng</h1>
          <p className="mt-1 text-sm text-muted">Quản lý toàn bộ vận đơn theo trạng thái</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn-outline">Nhập đơn từ Excel</button>
          <Link href="/orders/new" className="btn-primary">+ Tạo đơn mới</Link>
        </div>
      </header>

      <div role="tablist" aria-label="Lọc theo trạng thái" className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const on = t.id === tab;
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
              {t.label} · {STATUS_COUNTS[t.id].toLocaleString("vi-VN")}
            </button>
          );
        })}
      </div>

      <section className="card">
        <div className="flex flex-wrap items-end gap-3 border-b border-line-soft px-5 py-4">
          <div className="flex flex-[2_1_260px] flex-col gap-1.5">
            <label htmlFor="q" className="text-xs font-semibold text-muted">Tìm kiếm</label>
            <input id="q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Mã vận đơn, tên hoặc SĐT người nhận" className="input h-10" />
          </div>
          <div className="flex flex-[1_1_160px] flex-col gap-1.5">
            <label htmlFor="hub" className="text-xs font-semibold text-muted">Bưu cục</label>
            <select id="hub" value={hub} onChange={(e) => setHub(e.target.value)} className="input h-10">
              <option value="all">Tất cả bưu cục</option>
              {hubs.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div className="flex flex-[1_1_160px] flex-col gap-1.5">
            <label htmlFor="date" className="text-xs font-semibold text-muted">Ngày tạo</label>
            <select id="date" className="input h-10" defaultValue="7d">
              <option value="7d">7 ngày gần đây</option>
              <option value="today">Hôm nay</option>
              <option value="30d">30 ngày gần đây</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="button" className="btn-outline h-10 text-[13px]" disabled={selected.size === 0}>
              In vận đơn{selected.size > 0 ? ` (${selected.size})` : ""}
            </button>
            <button type="button" className="btn-outline h-10 text-[13px]">Xuất Excel</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#F9FAFB] text-left text-muted">
                <th className="w-5 px-5 py-2.5">
                  <input type="checkbox" aria-label="Chọn tất cả" checked={allChecked} onChange={toggleAll} />
                </th>
                <th className="px-3 py-2.5 font-semibold">Mã vận đơn</th>
                <th className="px-3 py-2.5 font-semibold">Người nhận</th>
                <th className="px-3 py-2.5 font-semibold">Địa chỉ giao</th>
                <th className="px-3 py-2.5 text-right font-semibold">COD</th>
                <th className="px-3 py-2.5 font-semibold">Trạng thái</th>
                <th className="px-3 py-2.5 font-semibold">Bưu cục</th>
                <th className="px-5 py-2.5 font-semibold">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code} className="border-t border-line-soft hover:bg-[#FAFAFB]">
                  <td className="px-5 py-3">
                    <input type="checkbox" aria-label={`Chọn đơn ${r.code}`} checked={selected.has(r.code)} onChange={() => toggleOne(r.code)} />
                  </td>
                  <td className="px-3 py-3 font-semibold">
                    <Link href={`/orders/${r.code}`} className="text-brand hover:text-brand-dark">{r.code}</Link>
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium">{r.receiver}</div>
                    <div className="text-xs text-muted">{maskPhone(r.phone)}</div>
                  </td>
                  <td className="max-w-[280px] px-3 py-3 text-ink-body">{r.address}</td>
                  <td className="px-3 py-3 text-right font-semibold">{formatVND(r.cod)}</td>
                  <td className="px-3 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-3 py-3 text-ink-body">{r.hub}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted">{r.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="p-10 text-center text-sm text-muted">Không có đơn nào phù hợp.</div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft px-5 py-3.5 text-[13px] text-muted">
          <span>Hiển thị {rows.length} / {STATUS_COUNTS.all.toLocaleString("vi-VN")} đơn</span>
          <div className="flex gap-1.5">
            <button type="button" aria-label="Trang trước" className="h-9 w-9 rounded-lg border border-line-input bg-white">‹</button>
            <button type="button" aria-current="page" className="h-9 w-9 rounded-lg border border-ink bg-ink font-semibold text-white">1</button>
            <button type="button" className="h-9 w-9 rounded-lg border border-line-input bg-white">2</button>
            <button type="button" className="h-9 w-9 rounded-lg border border-line-input bg-white">3</button>
            <button type="button" aria-label="Trang sau" className="h-9 w-9 rounded-lg border border-line-input bg-white">›</button>
          </div>
        </div>
      </section>
    </>
  );
}
