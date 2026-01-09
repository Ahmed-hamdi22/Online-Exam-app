'use client';

import { useState } from 'react';
import EmailStep from './email-step';
import OtpStep from './layout/otp-step';
import NewPasswordStep from './layout/new-password';
import Headline from '../../_components/headline';
import { Button } from '@/components/ui/button';
import PreviousStep from './layout/previous-step';

// Types
type StepType = 'email' | 'otp' | 'password';

export default function ForgotPasswordLayout() {
  const [email, setEmail] = useState<string | null>(null);
  const [step, setStep] = useState<StepType>('email');

  // Headings
  const Heading = {
    email: {
      previous: null,
      title: 'Forgot Password',
      description: (
        <>
          Don’t worry, we will help you recover your <br /> account.
        </>
      ),
    },
    otp: {
      previous: 'email',
      title: 'OTP Verification',
      description: (
        <>
          Please enter the 6-digits code we have sent to: <br />
          <span className="font-bold text-gray-600">
            {email}
            <Button
              onClick={() => setStep('email')}
              variant="link"
              className="text-blue-500 underline p-1 h-fit"
            >
              Edit
            </Button>
          </span>
        </>
      ),
    },
    password: {
      previous: null,
      title: 'Set New Password',
      description: (
        <>
          Create a strong new password to secure <br /> your account.
        </>
      ),
    },
  };

  const steps = {
    email: <EmailStep email={email} setEmail={setEmail} setStep={setStep} />,
    otp: email && <OtpStep email={email} setStep={setStep} />,
    password: email && <NewPasswordStep email={email} />,
  };

  return (
    <div className="space-y-6">
      {Heading[step].previous && (
        <PreviousStep
          onClick={() => setStep(Heading[step].previous! as StepType)}
        />
      )}

      <Headline description={Heading[step].description}>
        {Heading[step].title}
      </Headline>

      {steps[step]}
    </div>
  );
}
