import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-wrap">
      <Sidebar />
      <main className="flex min-w-0 flex-[999_1_560px] flex-col">
        <Topbar />
        <div className="flex flex-col gap-6 px-8 pb-10 pt-2">{children}</div>
      </main>
    </div>
  );
}
