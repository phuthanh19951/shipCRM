import { STATUS, type StatusKey } from "@/lib/data";

export default function StatusBadge({ status, className = "" }: { status: StatusKey; className?: string }) {
  const s = STATUS[status];
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.badge} ${className}`}>
      {s.label}
    </span>
  );
}
