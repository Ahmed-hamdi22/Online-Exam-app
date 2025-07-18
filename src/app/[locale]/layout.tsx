import Providers from "@/components/providers";
import { Locale, routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  params: { locale },
  children,
}: LocaleLayoutProps) {
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
