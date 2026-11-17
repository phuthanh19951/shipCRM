import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShipCRM — Quản lý đơn hàng",
  description: "CRM quản lý đơn hàng chuyển phát",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ground font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
