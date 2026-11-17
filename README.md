# ShipCRM — Giao diện CRM quản lý đơn hàng chuyển phát

Giao diện mẫu viết bằng **Next.js 15 (App Router) + TypeScript + Tailwind CSS**. Toàn bộ số liệu là dữ liệu mẫu nằm trong `lib/data.ts`.

## Chạy dự án

Yêu cầu Node.js 18.18 trở lên (khuyên dùng 20+).

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Các màn hình

| Đường dẫn | Màn hình |
|---|---|
| `/` | Tổng quan vận hành (KPI, biểu đồ 7 ngày, đơn cần xử lý, bưu cục) |
| `/orders` | Danh sách đơn — lọc theo trạng thái, tìm kiếm, lọc bưu cục, chọn nhiều đơn |
| `/orders/[mã]` | Chi tiết vận đơn — người gửi/nhận, phí & COD, hành trình, lịch sử CSKH |
| `/orders/new` | Tạo đơn — tự tính tiền thu người nhận theo dịch vụ & người trả phí |
| `/shipper` | App shipper (giao diện mobile) |

## Cấu trúc thư mục

```
app/
  layout.tsx               # layout gốc, font Inter
  globals.css              # Tailwind + class dùng chung (card, input, btn…)
  (admin)/layout.tsx       # layout có sidebar cho trang quản trị
  (admin)/page.tsx         # Tổng quan
  (admin)/orders/...       # Đơn hàng, chi tiết, tạo đơn
  shipper/page.tsx         # App shipper
components/
  Sidebar.tsx, StatusBadge.tsx
lib/
  data.ts                  # dữ liệu mẫu, trạng thái, hàm định dạng tiền
```

## Bước tiếp theo gợi ý

- Thay `lib/data.ts` bằng API thật (Route Handlers trong `app/api/` hoặc backend riêng).
- Database gợi ý: PostgreSQL + Prisma (bảng `orders`, `order_events`, `customers`, `hubs`, `shippers`, `cod_settlements`).
- Thêm đăng nhập & phân quyền (admin, CSKH, bưu cục, shipper, shop).
- Danh sách tỉnh/quận/phường: nạp từ bộ dữ liệu đơn vị hành chính Việt Nam.
- Đổi tên "ShipCRM", màu thương hiệu trong `tailwind.config.ts` (`brand`).
