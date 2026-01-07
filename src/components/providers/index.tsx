import { NextIntlClientProvider, useMessages } from 'next-intl';
import NextAuthProvider from './components/next-auth-provider';
import QueryProviders from './components/react-query.provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  // Translation
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuthProvider>
        <QueryProviders>
          <ReactQueryDevtools initialIsOpen={false} />

          {children}
        </QueryProviders>
      </NextAuthProvider>
    </NextIntlClientProvider>
  );
}
