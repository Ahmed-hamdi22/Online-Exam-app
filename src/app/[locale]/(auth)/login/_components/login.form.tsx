'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/routing';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import FeedBack from '@/components/shared/feedback';

export default function LoginForm() {
  // Translation
  const t = useTranslations();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const Schema = z.object({
    email: z.string().min(1, t('email-required')).email(t('email-invalid')),
    password: z
      .string()
      .nonempty(t('password-required'))
      .min(8, { message: t('password-is-too-short') })
      .regex(/[A-Z]/, t('password-uppercase'))
      .regex(/[a-z]/, t('password-must-contain-at-least-one-lowercase-letter'))
      .regex(/[0-9]/, t('password-must-contain-at-least-one-number')),
  });

  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setError(null);
    setLoading(true);

    const response = await signIn('credentials', {
      ...values,
      redirect: false,
    });

    setLoading(false);

    if (response?.ok) {
      const checkSession = async () => {
        const res = await fetch('/api/auth/session');
        const session = await res.json();
        if (session?.user) {
          router.push('/dashboard/subjects');
        } else {
          setTimeout(checkSession, 100);
        }
      };
      checkSession();
      return;
    }

    setError(response?.error || t('incorrect-email-or-password'));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4 autofill">
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* PassWord */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot Password */}
        <Link
          href="/forgot-password"
          className="font-medium text-sm text-blue-600 text-end mb-16 mt-6"
        >
          Forgot your Password ?
        </Link>

        {/* FeedBack */}
        {/* <FeedBack className="mb-6">{error?.message}</FeedBack> */}
        <FeedBack className="mb-6">{error}</FeedBack>

        {/* Submit */}
        <Button
          className=" text-white w-full bg-blue-600 hover:bg-blue-700 "
          type="submit"
          disabled={
            loading || (form.formState.isSubmitted && !form.formState.isValid)
          }
        >
          {loading ? <Loader /> : t('login')}
        </Button>
      </form>
    </Form>
  );
}
