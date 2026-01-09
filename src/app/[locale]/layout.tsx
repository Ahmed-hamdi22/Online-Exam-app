import Providers from '@/components/providers';
import { Locale, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster } from 'sonner';
import { Check, Info, X } from 'lucide-react';
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
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased">
        <Providers>
          <Toaster
            className="bg-green-900"
            position="top-center"
            icons={{
              info: <Info size={16} className="text-foreground " />,
              success: (
                <Check size={16} className="text-success text-green-400 " />
              ),
              error: <X size={16} className="text-red-400" />,
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
