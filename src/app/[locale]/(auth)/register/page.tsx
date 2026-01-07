import Link from 'next/link';
import React from 'react';
import Headline from '../_components/headline';
import RegisterForm from './_components/register.form';

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center overflow-auto">
      <div className="sm:w-full  md:w-[28.25rem] space-y-10">
        <Headline> Create Account</Headline>

        {/* Form */}
        <RegisterForm />

        {/* Link */}
        <p className=" pb-12  md:pb-0">
          Already have an account? &nbsp;
          <Link className="text-blue-500 font-medium" href="/login">
            Login{' '}
          </Link>
        </p>
      </div>
    </main>
  );
}
