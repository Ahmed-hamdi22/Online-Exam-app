"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Translations
  const t = useTranslations();

  // State
  const [menuVisible, setMenuVisible] = useState(false);

  // Navgation
  const router = useRouter();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-primary p-4 md:hidden">
        <div className="flex items-center gap-3">
          <button onClick={toggleMenu}>
            <i className="fa-solid fa-bars text-white text-xl"></i>
          </button>
          <i className="fa-solid fa-magnifying-glass text-white text-xl"></i>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-64 h-full p-4">
            <div className="flex justify-between items-center mb-6">
              <img src="/images/Logo2.png" alt="Logo" className="w-32" />
              <button onClick={toggleMenu}>
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/dashboard/subjects"
                  className="flex items-center gap-2 text-lg text-blue-700"
                >
                  <i className="fa-solid fa-house"></i>
                  {t("dashboard")}
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="flex items-center gap-2 text-lg text-blue-700"
                >
                  <i className="fa-regular fa-clock"></i>
                  {t("quiz-history")}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-lg text-blue-700"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  {t("log-out")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col text-white w-64 p-6 min-h-screen">
          <img src="/images/Logo2.png" alt="Logo" className="mb-10" />
          <ul className="space-y-6">
            <li>
              <Link
                href="/dashboard/subjects"
                className="flex items-center gap-2  text-blue-700"
              >
                <i className="fa-solid fa-house"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="flex items-center gap-2  text-blue-700"
              >
                <i className="fa-regular fa-clock"></i> Quiz History
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2  text-blue-700"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out
              </button>
            </li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
