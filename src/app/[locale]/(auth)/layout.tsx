"use client";

import { useTranslations } from "next-intl";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Section */}
      <div className="hidden md:flex bg-[#F0F4FC] flex-col justify-center pl-20 pr-10 rounded-tr-[100px] rounded-br-[100px]">
        <div>
          <h1 className="text-4xl md:text-[50px] leading-[75px] font-bold text-black mb-4">
            Welcome to <br />
            <span className="text-[#122D9C]">Elevate</span>
          </h1>
          <p className="text-[16px] text-gray-600 mb-10 leading-relaxed">
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
          </p>
        </div>
        <Image
          width={400}
          height={400}
          src="/images/bro.png"
          alt="Elevate Illustration"
          className="self-center"
        />
      </div>

      {/* Right Section */}
      <div className="relative flex flex-col justify-center px-6 md:px-20">
        {/* Top Navbar */}
        <div className="absolute top-6 right-6 flex items-center gap-4 text-sm">
          <Select onValueChange={handleChange} defaultValue={currentLocale}>
            <SelectTrigger className="w-24 h-8 text-sm">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>

          <Link href="/login" className="text-[#122D9C] hover:underline">
            {t("sign-in")}
          </Link>
          <Link
            href="/register"
            className="border border-[#E0E0E0] px-3 py-1 rounded-full text-[#122D9C] hover:bg-gray-50 transition"
          >
            {t("register")}
          </Link>
        </div>

        {/* Form Section */}
        <div className="mt-20 md:mt-0">{children}</div>
      </div>
    </div>
  );
}
