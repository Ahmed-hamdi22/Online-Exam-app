import Sidebar from './_components/sidebar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-2">
      {/* SideBar */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      {/* Content */}
      <div className="flex items-center justify-center px-4">{children}</div>
    </div>
  );
}
