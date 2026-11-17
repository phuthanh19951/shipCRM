"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  {
    title: "VẬN HÀNH",
    items: [
      { href: "/", label: "Tổng quan" },
      { href: "/orders", label: "Đơn hàng" },
      { href: "/orders/new", label: "Tạo đơn" },
      { href: "#", label: "Đối soát COD" },
      { href: "#", label: "Bưu cục & shipper" },
    ],
  },
  {
    title: "KHÁCH HÀNG",
    items: [
      { href: "/customers", label: "Khách hàng (shop)" },
      { href: "#", label: "Khiếu nại & ticket" },
      { href: "#", label: "Báo cáo" },
      { href: "#", label: "Cài đặt" },
    ],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "#") return false;
  if (href === "/") return pathname === "/";
  if (href === "/orders") return pathname.startsWith("/orders") && pathname !== "/orders/new";
  if (href === "/customers") return pathname.startsWith("/customers");
  return pathname === href;
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng chính"
      className="flex flex-[1_1_232px] flex-col gap-0.5 bg-ink px-4 py-6 text-[#C9CCD3]"
    >
      <div className="flex items-center gap-2.5 px-2 pb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-[15px] font-bold text-white">
          S
        </div>
        <span className="text-[17px] font-bold text-white">ShipCRM</span>
      </div>

      {SECTIONS.map((section, si) => (
        <div key={section.title} className="flex flex-col gap-0.5">
          <div className={`px-3 pb-2 text-[11px] font-semibold tracking-[0.08em] text-[#8A8F9C] ${si === 0 ? "pt-2" : "pt-5"}`}>
            {section.title}
          </div>
          {section.items.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-ink-2 font-semibold text-white" : "font-medium hover:bg-ink-2/60 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
