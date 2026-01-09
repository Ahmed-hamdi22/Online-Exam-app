'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import useForgotPassword from '../_hooks/use-forgot-password';
import FeedBack from '@/components/shared/feedback';

type EmailStepProps = {
  email: string | null;
  setEmail: (email: string) => void;
  setStep: (step: 'email' | 'otp' | 'password') => void;
};

export default function EmailStep({
  email,
  setEmail,
  setStep,
}: EmailStepProps) {
  // New schema just for email
  const emailSchema = z.object({
    email: z.string().email('Please enter a valid email'),
  });
  type EmailSchema = z.infer<typeof emailSchema>;
  //Mutation

  const { isPending, error, message } = useForgotPassword();

  // Form
  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: email || '',
    },
  });

  const onSubmit: SubmitHandler<EmailSchema> = (values) => {
    message(values.email, {
      onSuccess: () => {
        setEmail(values.email);
        setStep('otp');
      },
    });
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        {/* FeedBack */}
        <FeedBack className="mb-6">{error?.message}</FeedBack>

        {/* Submit */}
        <Button
          disabled={
            isPending || (form.formState.isSubmitted && !form.formState.isValid)
          }
          type="submit"
          className=" text-white w-full bg-blue-600 hover:bg-blue-700"
        >
          Continue
          <MoveRight className="ms-2" />
        </Button>
      </form>
    </Form>
  );
}
