// Dữ liệu mẫu — thay bằng API / database thật khi tích hợp.

export type StatusKey = "cho_lay" | "trung_chuyen" | "dang_giao" | "thanh_cong" | "chuyen_hoan";

export const STATUS: Record<StatusKey, { label: string; badge: string; bar: string }> = {
  cho_lay: { label: "Chờ lấy hàng", badge: "bg-amber-100 text-amber-800", bar: "bg-amber-600" },
  trung_chuyen: { label: "Đang trung chuyển", badge: "bg-violet-100 text-violet-800", bar: "bg-violet-600" },
  dang_giao: { label: "Đang giao", badge: "bg-blue-100 text-blue-800", bar: "bg-blue-700" },
  thanh_cong: { label: "Giao thành công", badge: "bg-green-100 text-green-800", bar: "bg-green-700" },
  chuyen_hoan: { label: "Chuyển hoàn", badge: "bg-red-100 text-red-800", bar: "bg-red-700" },
};

export type Order = {
  code: string;
  receiver: string;
  phone: string;
  address: string;
  cod: number;
  shippingFee: number;
  status: StatusKey;
  hub: string;
  createdAt: string;
  shop: string;
};

export const ORDERS: Order[] = [
  { code: "SC2611170001", receiver: "Nguyễn Văn An", phone: "0912 345 678", address: "12 Lê Lợi, P. Bến Nghé, Q.1, TP.HCM", cod: 450000, shippingFee: 32000, status: "dang_giao", hub: "BC Quận 1", createdAt: "17/11 08:12", shop: "Shop Thời Trang Mộc" },
  { code: "SC2611170014", receiver: "Trần Thị Mai", phone: "0988 456 201", address: "45/3 Quang Trung, P.10, Gò Vấp, TP.HCM", cod: 1250000, shippingFee: 32000, status: "cho_lay", hub: "BC Gò Vấp", createdAt: "17/11 09:40", shop: "Shop Thời Trang Mộc" },
  { code: "SC2611160913", receiver: "Lê Minh Khoa", phone: "0903 112 554", address: "88 Trần Duy Hưng, Cầu Giấy, Hà Nội", cod: 0, shippingFee: 38000, status: "trung_chuyen", hub: "BC Cầu Giấy", createdAt: "16/11 16:05", shop: "Gia Dụng Nhà Lam" },
  { code: "SC2611160877", receiver: "Phạm Quốc Huy", phone: "0935 908 112", address: "21 Bạch Đằng, Hải Châu, Đà Nẵng", cod: 320000, shippingFee: 35000, status: "chuyen_hoan", hub: "BC Hải Châu", createdAt: "16/11 14:22", shop: "Phụ Kiện Minh" },
  { code: "SC2611160702", receiver: "Võ Ngọc Anh", phone: "0977 231 390", address: "102 Nguyễn Thị Thập, Q.7, TP.HCM", cod: 780000, shippingFee: 25000, status: "thanh_cong", hub: "BC Quận 7", createdAt: "16/11 10:31", shop: "Shop Thời Trang Mộc" },
  { code: "SC2611150655", receiver: "Đặng Thu Hà", phone: "0868 770 745", address: "7 Hùng Vương, TP. Huế", cod: 215000, shippingFee: 35000, status: "dang_giao", hub: "BC Huế", createdAt: "15/11 18:47", shop: "Gia Dụng Nhà Lam" },
  { code: "SC2611150521", receiver: "Bùi Thanh Tùng", phone: "0919 504 062", address: "56 Lạch Tray, Ngô Quyền, Hải Phòng", cod: 0, shippingFee: 38000, status: "thanh_cong", hub: "BC Ngô Quyền", createdAt: "15/11 11:09", shop: "Phụ Kiện Minh" },
  { code: "SC2611150310", receiver: "Shop Hoa Linh", phone: "0962 341 818", address: "33 Võ Văn Ngân, Thủ Đức, TP.HCM", cod: 560000, shippingFee: 25000, status: "cho_lay", hub: "BC Thủ Đức", createdAt: "15/11 09:15", shop: "Gia Dụng Nhà Lam" },
  { code: "SC2611140298", receiver: "Hoàng Gia Bảo", phone: "0901 689 476", address: "19 Ba Tháng Hai, Ninh Kiều, Cần Thơ", cod: 990000, shippingFee: 38000, status: "trung_chuyen", hub: "BC Ninh Kiều", createdAt: "14/11 15:58", shop: "Shop Thời Trang Mộc" },
];

export const NOTIFICATION_COUNT = 12;

export const STATUS_COUNTS: Record<StatusKey | "all", number> = {
  all: 2412,
  cho_lay: 214,
  trung_chuyen: 318,
  dang_giao: 642,
  thanh_cong: 1200,
  chuyen_hoan: 38,
};

export const formatVND = (n: number) => n.toLocaleString("vi-VN") + " ₫";
export const maskPhone = (p: string) => {
  const d = p.replace(/\s/g, "");
  return d.slice(0, 4) + "***" + d.slice(-3);
};

export const findOrder = (code: string) => ORDERS.find((o) => o.code === code);

// Hành trình mẫu theo trạng thái
export function buildTimeline(o: Order) {
  const steps = [
    { label: "Tạo đơn thành công", meta: `${o.createdAt} · ${o.shop}` },
    { label: "Đã lấy hàng", meta: "10:45 · Shipper Lâm Tuấn — BC Tân Bình" },
    { label: "Nhập kho trung chuyển", meta: "14:20 · Kho HCM Tân Bình" },
    { label: "Đã đến bưu cục giao", meta: `19:05 · ${o.hub}` },
    { label: "Đang giao hàng", meta: "21:10 · Shipper Huỳnh Phát" },
    { label: o.status === "chuyen_hoan" ? "Chuyển hoàn về shop" : "Giao thành công", meta: "Chờ cập nhật" },
  ];
  const currentIndex: Record<StatusKey, number> = {
    cho_lay: 0,
    trung_chuyen: 2,
    dang_giao: 4,
    thanh_cong: 6,
    chuyen_hoan: 5,
  };
  const cur = currentIndex[o.status];
  return steps.map((s, i) => ({
    ...s,
    state: (i < cur ? "done" : i === cur ? "current" : "todo") as "done" | "current" | "todo",
    meta: i > cur ? "Chờ cập nhật" : s.meta,
  }));
}

export const CARE_NOTES = [
  { initials: "TL", who: "Thu Loan (CSKH)", when: "20:15, 17/11", text: "Đã gọi xác nhận, khách hẹn nhận hàng tối nay sau 21h tại nhà." },
  { initials: "HP", who: "Huỳnh Phát (shipper)", when: "19:30, 17/11", text: "Khách không nghe máy lần 1, sẽ gọi lại khi tới khu vực." },
  { initials: "TM", who: "Shop Thời Trang Mộc", when: "08:15, 17/11", text: "Nhờ giao giờ hành chính, cho khách xem hàng trước khi thanh toán." },
];

export const SERVICES = [
  { id: "tieu_chuan", name: "Tiêu chuẩn", eta: "Giao 3–4 ngày", fee: 25000 },
  { id: "nhanh", name: "Nhanh", eta: "Giao 1–2 ngày", fee: 32000 },
  { id: "hoa_toc", name: "Hỏa tốc", eta: "Trong ngày, nội thành", fee: 55000 },
] as const;
