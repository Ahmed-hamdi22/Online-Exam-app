"use client";

import { useState } from "react";
import ForgetPasswordForm from "./_components/forget-password";
import VerifyCodeForm from "./_components/verify-code-form";
import SetNewPasswordForm from "./_components/set-password-form";

export default function ForgetPasswordFlow() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      {currentStep === 1 && (
        <ForgetPasswordForm
          onSuccess={(userEmail) => {
            setEmail(userEmail);
            setCurrentStep(2);
          }}
        />
      )}

      {currentStep === 2 && (
        <VerifyCodeForm
          email={email}
          onSuccess={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <SetNewPasswordForm email={email} onSuccess={() => setCurrentStep(1)} />
      )}
    </div>
  );
}
