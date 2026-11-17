import Link from "next/link";
import { NOTIFICATION_COUNT } from "@/lib/data";

export default function Topbar() {
  return (
    <div className="flex justify-end px-8 pt-5">
      <Link
        href="/orders"
        aria-label={`Thông báo đơn hàng, ${NOTIFICATION_COUNT} thông báo mới`}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-input bg-white text-ink-body transition-colors hover:bg-ground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        {NOTIFICATION_COUNT > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-semibold text-white">
            {NOTIFICATION_COUNT > 99 ? "99+" : NOTIFICATION_COUNT}
          </span>
        )}
      </Link>
    </div>
  );
}
