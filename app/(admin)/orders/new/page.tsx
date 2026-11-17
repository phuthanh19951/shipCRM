"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SERVICES, formatVND } from "@/lib/data";

type ServiceId = (typeof SERVICES)[number]["id"];
type Payer = "nhan" | "gui";

export default function CreateOrderPage() {
  const router = useRouter();
  const [service, setService] = useState<ServiceId>("nhanh");
  const [payer, setPayer] = useState<Payer>("nhan");
  const [cod, setCod] = useState("450000");

  const cur = SERVICES.find((s) => s.id === service)!;
  const codNum = Number(cod.replace(/\D/g, "")) || 0;
  const total = payer === "nhan" ? codNum + cur.fee : codNum;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: gọi API tạo đơn, sau đó chuyển tới trang chi tiết đơn vừa tạo
    router.push("/orders/SC2611170001");
  };

  return (
    <>
      <header>
        <h1 className="text-[26px] font-bold">Tạo đơn mới</h1>
        <p className="mt-1 text-sm text-muted">Nhập thông tin người nhận, hàng hóa và chọn dịch vụ</p>
      </header>

      <form onSubmit={onSubmit} className="flex flex-wrap items-start gap-4">
        <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-4">
          <Section title="Người gửi">
            <Field id="kho" label="Kho lấy hàng">
              <select id="kho" className="input">
                <option>Kho 1 — 210 Cộng Hòa, P.12, Tân Bình, TP.HCM</option>
                <option>Kho 2 — 15 Phạm Văn Đồng, Thủ Đức, TP.HCM</option>
              </select>
            </Field>
          </Section>

          <Section title="Người nhận">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
              <Field id="sdt" label="Số điện thoại *" hint="Tự điền nếu khách đã từng nhận hàng">
                <input id="sdt" type="tel" required placeholder="VD: 0912 345 678" className="input" />
              </Field>
              <Field id="ten" label="Họ tên *">
                <input id="ten" type="text" required placeholder="Họ và tên người nhận" className="input" />
              </Field>
            </div>
            <Field id="dc" label="Địa chỉ chi tiết *">
              <input id="dc" type="text" required placeholder="Số nhà, tên đường" className="input" />
            </Field>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
              <Field id="tinh" label="Tỉnh / Thành phố">
                <select id="tinh" className="input"><option>Chọn tỉnh/thành</option></select>
              </Field>
              <Field id="quan" label="Quận / Huyện">
                <select id="quan" className="input"><option>Chọn quận/huyện</option></select>
              </Field>
              <Field id="phuong" label="Phường / Xã">
                <select id="phuong" className="input"><option>Chọn phường/xã</option></select>
              </Field>
            </div>
          </Section>

          <Section title="Hàng hóa">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5">
              <Field id="nd" label="Nội dung hàng">
                <input id="nd" type="text" placeholder="VD: Quần áo" className="input" />
              </Field>
              <Field id="kg" label="Khối lượng (gram)">
                <input id="kg" type="number" min={1} placeholder="500" className="input" />
              </Field>
              <Field id="kt" label="Dài × Rộng × Cao (cm)">
                <input id="kt" type="text" placeholder="30 × 20 × 10" className="input" />
              </Field>
              <Field id="cod" label="Tiền thu hộ COD (₫)">
                <input id="cod" inputMode="numeric" value={cod} onChange={(e) => setCod(e.target.value)} className="input" />
              </Field>
            </div>
            <Field id="yc" label="Yêu cầu khi giao">
              <select id="yc" className="input">
                <option>Cho xem hàng, không cho thử</option>
                <option>Cho thử hàng</option>
                <option>Không cho xem hàng</option>
              </select>
            </Field>
          </Section>

          <Section title="Dịch vụ vận chuyển">
            <div role="radiogroup" aria-label="Dịch vụ" className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
              {SERVICES.map((s) => {
                const on = s.id === service;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setService(s.id)}
                    className={`flex flex-col gap-1 rounded-[10px] border-2 px-4 py-3.5 text-left transition-colors ${
                      on ? "border-brand bg-brand-soft" : "border-line bg-white hover:border-line-input"
                    }`}
                  >
                    <span className="text-[15px] font-semibold">{s.name}</span>
                    <span className="text-[13px] text-muted">{s.eta}</span>
                    <span className="mt-1 text-sm font-bold">{formatVND(s.fee)}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              <span className="label">Người trả phí vận chuyển</span>
              <div role="radiogroup" aria-label="Người trả phí" className="flex flex-wrap gap-2">
                {([
                  ["nhan", "Người nhận trả"],
                  ["gui", "Người gửi trả"],
                ] as const).map(([id, label]) => {
                  const on = payer === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setPayer(id)}
                      className={`h-10 rounded-full border px-4 text-[13px] font-semibold ${
                        on ? "border-ink bg-ink text-white" : "border-line-input bg-white text-ink-body"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Section>
        </div>

        <aside className="card flex min-w-0 flex-[2_1_300px] flex-col gap-3 px-6 py-5">
          <h2 className="mb-1 text-base font-semibold">Tóm tắt đơn</h2>
          <SumRow label="Dịch vụ" value={cur.name} />
          <SumRow label="Phí vận chuyển" value={formatVND(cur.fee)} />
          <SumRow label="Tiền thu hộ (COD)" value={formatVND(codNum)} />
          <SumRow label="Người trả phí" value={payer === "nhan" ? "Người nhận" : "Người gửi"} />
          <div className="flex justify-between border-t border-line-soft pt-3 text-base">
            <span className="font-semibold">Thu người nhận</span>
            <span className="font-bold text-brand">{formatVND(total)}</span>
          </div>
          <p className="text-xs leading-relaxed text-muted">
            Phí là ước tính theo bảng giá [BẢNG GIÁ CỦA BẠN], tính lại theo cân nặng thực tế khi nhập kho.
          </p>
          <button type="submit" className="btn-primary mt-2 h-12 text-[15px]">Tạo đơn</button>
          <button type="button" className="btn-outline">Lưu nháp</button>
        </aside>
      </form>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card flex flex-col gap-3.5 px-6 py-5">
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ id, label, hint, children }: { id: string; label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="label">{label}</label>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink-body">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
