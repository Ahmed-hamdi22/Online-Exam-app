'use client';

import loginSchema, { loginValues } from '@/lib/schemes/authschema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useLogin from '../_hooks/use-login';
import FeedBack from '@/components/shared/feedback';
import { Loader } from 'lucide-react';
export default function LoginForm() {
  const form = useForm<loginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  // Mutation
  const { isPending, error, mutate } = useLogin();

  //
  const onSubmit: SubmitHandler<loginValues> = (data) => {
    mutate(data);
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
        <FeedBack className="mb-6">{error?.message}</FeedBack>

        {/* Submit */}
        <Button
          disabled={
            isPending ||
            (form.formState.isSubmitting && !form.formState.isValid)
          }
          className=" text-white w-full bg-blue-600 hover:bg-blue-700 "
          type="submit"
        >
          {isPending || form.formState.isSubmitting ? <Loader /> : 'Login'}
        </Button>
      </form>
    </Form>
  );
}
