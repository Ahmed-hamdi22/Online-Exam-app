import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { LOCALES, routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const authPages = [
  "/login",
  "/register",
  "/forget-password",
  "/verifyCode",
  "/setNewPassword",
];
const publicPages = [...authPages];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const publicPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );
  const authPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${authPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  const isAuthPage = authPathnameRegex.test(req.nextUrl.pathname);

  if (req.nextUrl.pathname === "/") {
    if (token) {
      const redirectUrl = new URL("/dashboard/subjects", req.nextUrl.origin);
      return handleI18nRouting(new NextRequest(redirectUrl, req));
    } else {
      const redirectUrl = new URL("/login", req.nextUrl.origin);
      return handleI18nRouting(new NextRequest(redirectUrl, req));
    }
  }

  if (isPublicPage) {
    if (token && isAuthPage) {
      const redirectUrl = new URL("/dashboard/subjects", req.nextUrl.origin);
      return handleI18nRouting(new NextRequest(redirectUrl, req));
    }
    return handleI18nRouting(req);
  }

  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
