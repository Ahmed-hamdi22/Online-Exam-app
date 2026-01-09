'use client';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import useForgotPassword from '../../_hooks/use-forgot-password';

type ResendOtpProps = {
  email: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

export default function ResendOtp({
  email,
  className,
  ...props
}: ResendOtpProps) {
  // State
  const [expireTime, setExpireTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  // Mutation
  const { isPending, message } = useForgotPassword();

  const resendOtp = () => {
    message(email, {
      onSuccess: () => {
        toast.success('OTP sent successfully');

        // Set expire time
        const expireAt = Date.now() + 60 * 1000;

        // Store expire time in local storage
        localStorage.setItem('otp_expire', expireAt.toString());
        setExpireTime(expireAt);
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    });
  };

  // UseEffect to set countdown
  useEffect(() => {
    if (!expireTime) return;

    const updateCountdown = () => {
      const remaining = Math.max(
        0,
        Math.ceil((expireTime - Date.now()) / 1000)
      );
      setCountdown(remaining);

      if (remaining === 0) {
        localStorage.removeItem('otp_expire');
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expireTime]);

  // UseEffect to set expireTime
  useEffect(() => {
    const storedExpire = localStorage.getItem('otp_expire');
    if (storedExpire) {
      setExpireTime(Number(storedExpire));
    }
  }, []);

  return (
    <p
      className={cn(
        'flex items-center gap-1 text-sm justify-center',
        className
      )}
      {...props}
    >
      {countdown > 0 ? (
        <>
          Resend available in
          <span className="font-semibold  text-blue-600">{countdown}s</span>
        </>
      ) : (
        'Didn’t receive the code?'
      )}

      <Button
        className="p-0 text-blue-600 underline"
        type="button"
        variant="link"
        disabled={isPending || countdown > 0}
        onClick={resendOtp}
      >
        {isPending ? <Loader className="animate-spin" /> : 'Resend OTP'}
      </Button>
    </p>
  );
}
