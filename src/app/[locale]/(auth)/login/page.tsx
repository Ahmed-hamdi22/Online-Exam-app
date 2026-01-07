import Link from 'next/link';
import React from 'react';
import Headline from '../_components/headline';
import LoginForm from './_components/login.form';

export default function page() {
  return (
    <main className="flex items-center justify-center">
      <div className="sm:w-full  md:w-[28.25rem] space-y-10">
        {/* Headline */}
        <Headline> Login</Headline>

        {/* Form */}

        <LoginForm />
        {/* Link */}
        <p className=" pb-12  md:pb-0">
          Don&apos;t have an account? &nbsp;
          <Link className="text-blue-500 font-medium" href="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
