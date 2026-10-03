import Link from 'next/link';
import React from 'react';
import Headline from '../_components/headline';
import RegisterForm from './_components/register.form';
import { safeCallbackPath } from '@/lib/utils/auth-callback';

export default function RegisterPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { callbackUrl?: string };
}) {
  const callbackUrl = safeCallbackPath(searchParams.callbackUrl);
  const loginHref = `/${params.locale}/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  return (
    <main className="flex items-center justify-center overflow-auto">
      <div className="sm:w-full  md:w-[28.25rem] space-y-10">
        <Headline> Create Account</Headline>

        {/* Form */}
        <RegisterForm loginHref={loginHref} />

        {/* Link */}
        <p className=" pb-12  md:pb-0">
          Already have an account? &nbsp;
          <Link className="text-blue-500 font-medium" href={loginHref}>
            Login{' '}
          </Link>
        </p>
      </div>
    </main>
  );
}
