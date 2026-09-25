import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { LOCALES, routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const authPages = ['/login', '/register', '/forgot-password'];
const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const locale = LOCALES.find(
    (value) => pathname === `/${value}` || pathname.startsWith(`/${value}/`)
  );
  const localPath = locale ? pathname.slice(locale.length + 1) || '/' : pathname;
  const localePrefix = locale ? `/${locale}` : '';

  if (localPath === '/') {
    return NextResponse.redirect(
      new URL(`${localePrefix}/dashboard/subjects`, req.url)
    );
  }

  const isAuthPage = authPages.some(
    (page) => localPath === page || localPath === `${page}/`
  );
  const isQuizPage = /^\/dashboard\/component\/quiz\/[^/]+\/?$/.test(localPath);

  if (isAuthPage || isQuizPage) {
    const token = await getToken({ req });

    if (isQuizPage && !token?.token) {
      const loginUrl = new URL(`${localePrefix}/login`, req.url);
      loginUrl.searchParams.set('callbackUrl', pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }

    if (isAuthPage && token?.token) {
      return NextResponse.redirect(
        new URL(`${localePrefix}/dashboard/subjects`, req.url)
      );
    }
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
