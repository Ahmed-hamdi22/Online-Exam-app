import Link from "next/link";
import React from "react";
import ForgotPasswordLayout from "./_components/forgot-password-layout";

export default function page() {
  return (
    <main className="flex items-center justify-center overflow-auto">
      <div className="sm:w-full  md:w-[28.25rem] space-y-6">
        {/* Form */}
        <ForgotPasswordLayout />
        {/* Link */}
        <p className=" pb-12  md:pb-0 text-center">
          Don&apos;t have an account? &nbsp;
          <Link className="text-blue-500 font-medium" href="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
